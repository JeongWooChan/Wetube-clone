import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({_id:-1}); 
        // id를 -1로 준다는 것은 위 아래 순서를 바꾸겠다는 약속 같은 것이다. 
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
}

export const search = async (req, res) => {
    const { 
        query: { term: searchingBy } 
    } = req;
    let videos = [];
    try{
        videos = await Video.find({title: {$regex: searchingBy, $options: "i" }})
    } catch(err) {
        console.log(err);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
}

export const postUpload = async (req, res) => {
    const {
        body: { title, description }, 
        file : { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title, 
        description,
        creator: req.user.id
    }); 
    req.user.videos.push(newVideo); 
    req.user.save();  
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async (req, res) => {
    const {
        params: {id}
    } = req;
    // req.params.id
    try {
        const video = await Video.findById(id).populate('creator').populate('comments');
        res.render("videoDetail", { pageTitle : video.title, video});
    } catch(err) {
        console.log(err);
        res.redirect(routes.home);
    }
}
export const getEditVideo = async (req, res) => {
    const { 
        params: {id}
    } = req; 
    try {
        const video = await Video.findById(id);
        if(video.creator.toString() !== req.user.id) {
            throw Error(); 
        } else {
            res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
        }
    } catch(err) {
        res.redirect(routes.home);
    }
}
export const postEditVideo = async (req, res) => {
    const {
        params: {id}, 
        body: {title, description}
    } = req; 
    try {
        await Video.findOneAndUpdate({ _id: id }, {title, description});
        res.redirect(routes.videoDetail(id));
    } catch(err) {
        res.redirect(routes.home);
    }
}
export const deleteVideo = async (req, res) => {
    const {
        params: {id}
    } = req; 
    try {
        const video = await Video.findById(id);
        if(video.creator.toString() !== req.user.id) {
            throw Error(); 
        } else {
            await Video.findOneAndRemove({ _id: id }); 
        }
    } catch (err) {
        console.log(err); 
    }
    res.redirect(routes.home);
}

export const registerView = async (req, res) => {
    const {
        params: {id}
    } = req; 
    try {
        const video = await Video.findById(id);
        video.views += 1; 
        video.save(); 
        res.status(200); 
    } catch (error) {
        res.status(400); 
        res.end(); 
    } finally { 
        res.end(); 
    }
}

export const postAddComment = async (req, res) => {
    const { 
      params: { id },
      body: { comment },
      user
    } = req; 
    try {
      const video = await Video.findById(id); 
      const newComment = await Comment.create({
        text: comment, 
        creator: user.id
      });
      video.comments.push(newComment.id); 
      video.save(); 
      res.end(newComment.id);
    } catch (err) {
      res.status(400);
      res.end();
    } 
  }

export const postDeleteComment = async (req, res) => {
    const {
        params : { id }, 
    } = req; 
    try {
        const comment = await Comment.findOneAndRemove({_id : id }); 
        comment.save(); 
        res.status(200); 
    } catch (error) { 
        res.status(400); 
    } finally {
        res.end(); 
    }
}