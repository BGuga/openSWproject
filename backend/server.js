import express from "express"
import global from "./routers/globalRouter";
import movies from "./routers/movieRouter";

const PORT = 3000
const app = express();
app.use('/',global);
app.use('/movies',movies);

app.listen(PORT,() => console.log(`The Server is running on http://localhost:${PORT}`));
