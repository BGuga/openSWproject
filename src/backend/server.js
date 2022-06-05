import express from "express"
import global from "./routers/globalRouter";
import movies from "./routers/movieRouter";
import users from "./routers/userRouter";
import session  from "express-session";
import MongoStore from "connect-mongo";
import { editLocals } from "./middlewares";

const PORT = 3000
const app = express();


app.use(express.json())
app.use(express.urlencoded({extend: true}))
app.use(session({
    secret:process.env.COOKIE_SCRET,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl: process.env.DB_URL})
}))

app.set('view engine',"pug");
app.set("views",process.cwd() +"/src/views");
app.use(editLocals);
app.use('/',global);
app.use('/movies',movies);
app.use('/users',users)

export default  app

