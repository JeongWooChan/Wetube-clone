import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); 

export const localMiddleware = (req, res, next) => {
    res.locals.siteName ='WeTube'; 
    res.locals.routes = routes; 
    res.locals.user = {
        isAuthenticated: false, 
        id: 1
    }
    next();
};

export const uploadVideo = multerVideo.single('videoFile'); // single은 오직 하나의 파일만 upload 할 수 있는 것을 의미한다. 