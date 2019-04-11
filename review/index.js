import express from "express"; 
import morgan from "morgan"; 
import helmet from "helmet"; 
import bodyParser from "body-parser"; 
import cookieParser from "cookie-parser"; 

const app = express(); 

const PORT = 4001; 

const handleListening = () => {
    console.log(`Listening on : http://localhost:${PORT}`); 
}

const handleHome = (req, res) => {
    res.send("Hi from home"); 
}

const handleProfile = (req, res) => {
    res.send("Here is my profile page");
}

app.use(helmet()); 
app.use(morgan("dev"));
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", handleHome); 

app.get("/profile", handleProfile); 

app.listen(PORT, handleListening); 