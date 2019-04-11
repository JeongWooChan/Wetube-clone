import express from "express"; // require는 node module을 가져오는 역할을 함 
import morgan from 'morgan';
import helmet from 'helmet'; // node.js 보안을 위한 미들웨어
import cookieParser from 'cookie-parser'; 
import bodyParser from 'body-parser';
import passport from "passport"; 
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";
import "./passport";

const app = express();  

const CookieStore = MongoStore(session); 

app.set('view engine', "pug"); // 템플릿 엔진을 사용하기 위한 세팅 

app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session()); 

app.use(localMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); 
app.use(routes.videos, videoRouter); 
app.use(routes.api, apiRouter); 

export default app; 