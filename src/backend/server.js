import express from "express"
import global from "./routers/globalRouter";
import movies from "./routers/movieRouter";
import users from "./routers/userRouter";

const PORT = 3000
const app = express();

app.set('view engine',"pug");
app.set("views",process.cwd() +"/src/views");
app.use('/',global);
app.use('/movies',movies);
app.use('/users',users)

app.listen(PORT,() => console.log(`The Server is running on http://localhost:${PORT}`));
