function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

//ADMIN
function isAdmin(req, res, next) {
    if (req.session.role !== "admin") {
        return res.status(403).send("Forbidden");
    }
    next();
}


module.exports = { requireLogin, isAdmin};