import express from "express"; 
import routes from "../routes"; 
import { postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router(); 

apiRouter.post(routes.register_view, postRegisterView); 

export default apiRouter;