import fetch from"node-fetch";
import User from "../../models/User"
import bcrypt from "bcrypt"

export const home = async(req,res)=>{
    const KEY= process.env.API_KEY
    const data = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`,{
        method:"GET",
    })
    const movies = await data.json();
    return res.render("home",{siteTitle: "movie!",pageTitle:"home Page!",movies: movies.results});
}

export const getJoin = (req,res) =>{
    res.render('join.pug',{pageTitle:"Join!",siteTitle:"movie!"})
}

export  const postJoin = async (req,res) =>{
    const { email,
        username,
        password,
        passwordcheck, } = req.body;
  const pageTitle = "Join";
  if (password !== passwordcheck) {
    return res.status(400).render("join.pug", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      username,
      email,
      password,
    });
    return res.redirect("/login");
  } catch(error){
    return res.status(400).res.render("join", { 
      pageTitle: "Upload Video" ,
      errorMessage: error._message,
  });
}
}

export const getLogin = (req,res)=>{
    return res.render("login",{siteTitle:"movie!",pageTitle:"Login!"})
}

export const postLogin = async (req,res) => 
{
    const PAGETITLE = "Login"
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{pageTitle:PAGETITLE,error:"An account with that username is not found"})
    }
    if (user.isO_Auth)
        return res.status(400).render("login",{pageTitle:PAGETITLE,error:"Please login with Github"})
    const ok = await bcrypt.compare(password,user.password);
    if(!ok){
        return res.status(400).render("login",{pageTitle:PAGETITLE,error:"something wrong..."})
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
}

export const startGithubLogin = (req,res) => 
{
    const baseURL = `https://github.com/login/oauth/authorize`
    const config = {
        client_id: process.env.O_Auth_client_id,
        allow_signup:false,
        scope:"read:user user:email"
    }
    const params = new URLSearchParams(config).toString();
    const finalURL = `${baseURL}?${params}`
    return res.redirect(finalURL); 
}

export const finishGithubLogin = async (req,res) =>
{

    const config = {
        client_id: process.env.O_Auth_client_id,
        client_secret : process.env.O_Auth_scret,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const baseURL = `https://github.com/login/oauth/access_token`;
    const finalURL = `${baseURL}?${params}`;
    console.log(finalURL)
    const data = await fetch(finalURL,{
        method:"POST",
        headers:{
            Accept: "application/json",
        }
    });
    const token = await data.json();
    if("access_token" in token)
    {
        const {access_token} = token;
        const apiUrl = "https://api.github.com"
        const userRequest = await (
            await fetch(`${apiUrl}/user`, {
              headers: {
                Authorization: `token ${access_token}`,
              },
            })
          ).json();
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`,{
                method:"GET",
                headers:{
                    Authorization: `token ${access_token}`                    
                }
            })
            ).json();
        const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
        if(!emailObj){
            return res.status(400).redirect('/login');
        }
        let user = await User.findOne({email: emailObj.email});
        if(!user){
            user = await User.create({
                email:emailObj.email,
                username:userRequest.login,
                password:"",
                isO_Auth: true,
            });
        }
        req.session.loggedIn = true,
        req.session.user = user;
        return res.redirect("/");
    }else{
        res.status(400).redirect("/login")
    }
}