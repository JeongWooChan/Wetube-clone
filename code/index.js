import express from "express"; // require는 node module을 가져오는 역할을 함 
import morgan from 'morgan';
import helmet from 'helmet'; // node.js 보안을 위한 미들웨어
import cookieParser from 'cookie-parser'; 
import bodyParser from 'body-parser'; 

const app = express();  

const PORT = 4000;

const handleListening = () => { console.log(`Listening on : http://localhost:${PORT}`); }

const handleHome = (req, res) => res.send('Hello from home!!');

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

const betweenHome = (req, res, next) => {
    console.log('Between'); 
    next();  
};

app.use(betweenHome);

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);