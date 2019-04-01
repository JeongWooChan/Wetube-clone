import express from "express"; // require는 node module을 가져오는 역할을 함 
import morgan from 'morgan';
import helmet from 'helmet'; // node.js 보안을 위한 미들웨어
import cookieParser from 'cookie-parser'; 
import bodyParser from 'body-parser'; 
import { userRouter } from "./router";
const app = express();  

const handleHome = (req, res) => res.send('Hello from home!!');

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter); // 누군가 /user 경로에 접속하면 이 router 전체를 사용하겠다. 

export default app; 