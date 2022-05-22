export const home = (req,res)=>{
    return res.render("home",{siteTitle: "movie!",pageTitle:"home Page!"});
}

export const join= (req,res) =>{
    return res.send("hello this is joinpage!");
}

export const login = (req,res)=>{
    return res.send("hello this is login!");
}