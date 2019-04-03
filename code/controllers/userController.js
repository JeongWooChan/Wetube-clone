import routes from "../routes";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join"}); 
export const postJoin = (req, res) => {
    const {
        body: {name, email, password, password2}
    } = req;

    if(password != password2) {
        res.status(400); // 잘못된 요청임을 웹사이트가 알아들을 수 있는 status 코드 값으로 전달 
        res.render("join", { pageTitle: "Join"});    
    } else {
        // To Do : Register user 
        // To Do : Log user in 
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In"}); 
export const postLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    // To Do: Process Logout
    res.redirect(routes.home);
}
export const users = (req, res) => res.render("users", { pageTitle: "Search"});
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password"});