import express from "express"; 
import morgan from "morgan"; 
import helmet from "helmet"; 
import bodyParser from "body-parser"; 
import cookieParser from "cookie-parser"; 
import routes from "./routes"; 
import globalRouter from "./routers/globalRouter"; 
import userRouter from "./routers/userRouter"; 
import videoRouter from "./routers/videoRouter"; 
import { localsMiddleware } from "./middlewares";
import passport from "passport"; 
import session from "express-session"; 
import mongoose from "mongoose"; 
import MongoStore from "connect-mongo";
import "./passport";

const app = express(); 

app.set('view engine', "pug"); 

const CookieStore = MongoStore(session); 

app.use(helmet()); 
app.use(morgan("dev"));
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/uploads", express.static("uploads")); 
app.use("/static", express.static("static"));
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

app.use(localsMiddleware); 
app.use(routes.home, globalRouter); 
app.use(routes.users, userRouter); 
app.use(routes.videos, videoRouter); 

export default app;