export const editLocals  = (req,res,next) =>{
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInUser = req.session.user;
    next();
}