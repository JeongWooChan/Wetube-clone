// Global 
const HOME = "/"; 
const JOIN = "/join"; 
const LOGIN = "/login"; 
const LOGOUT = "/logout"; 
const SEARCH = "/search"; 

// Users 
const USERS = "/users"; 
const USER_DETAIL = "/:id"; 
const EDIT_PROFILE = "/editProfile"; 
const CHANGE_PASSWORD = "/changePassword"; 
const ME = "/me"; 

// Videos 
const VIDEOS = "/videos"; 
const UPLOAD = "/upload"; 
const VIDEO_DETAIL = "/:id"; 
const EDIT_VIDEO = "/:id/edit"; 
const DELETE_VIDEO = "/:id/delete"; 

// API 
const API = "/api"; 
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/delete";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: id => {
        if(id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: id => {
        if(id) {
            return `/videos/${id}`; 
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: id => {
        if(id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: id => {
        if(id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    }, 
    me: ME, 
    api: API, 
    register_view: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    deleteComment : DELETE_COMMENT
}; 

export default routes;