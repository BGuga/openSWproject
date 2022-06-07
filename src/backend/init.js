import "dotenv/config"
import "./db"
import "../models/User"
import app from "./server";


const PORT = 3000

app.listen(PORT,() => console.log(`The Server is running on http://localhost:${PORT}`));
