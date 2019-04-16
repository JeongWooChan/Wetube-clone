import routes from "../routes";
import User from "../models/User"; 
import passport from "passport"; 

export const getJoin = (req, res) => {
    res.render("join", { pageTitle : "Join" });
}

export const postJoin = async (req, res, next) => {
    const {
        body : { name, email, password, password2}
    } = req
    if(password !== password2) {
        res.status(400); 
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User ({
                name, 
                email
            }); 
            await User.register(user, password); 
            next(); 
        } catch (err) {
            console.log(err);
            res.redirect(routes.home); 
        }
    }
}


export const getLogin = (req, res) => {
    res.render("login", { pageTitle : "Login" });
} 

export const postLogin = passport.authenticate('local', {
    successRedirect: routes.home, 
    failureRedirect: routes.login
});


export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle : "User Detail", user: req.user });
}

export const userDetail = async (req, res) => {
    const {
      params: { id }
    } = req;
    try {
      const user = await User.findById(id).populate("videos");
      console.log(user);
      res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
      res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => {
    res.render("editProfile", { pageTitle : "Edit Profile" });
}
export const postEditProfile = async (req, res) => {
    const {
        body : { name, email }, 
        file 
    } = req; 
    try { 
        await User.findByIdAndUpdate(req.user.id, {
            name, 
            email, 
            avatarUrl: file ? file.path : req.user.avatarUrl
        }); 
        res.redirect(routes.me);
    } catch (err) {
        res.redirect(routes.editProfile); 
    }
}

export const getChangePassword = (req, res) => {
    res.render("changePassword", { pageTitle : "Change Password" });
}

export const postChangePassword = async (req, res) => { 
    const {
        body : {oldPassword, newPassword, newPassword1}
    } = req; 
    try { 
        if(newPassword !== newPassword1) {
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
        } else {
            await req.user.changePassword(oldPassword, newPassword);
            res.redirect(routes.me);
        }
    } catch (err) {
        res.status(400); 
        res.redirect(`/users/${routes.changePassword}`);
    }
}