module.exports = (req, res, next) => {
    if (req.user) {
        var backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    } else {
        next();
    }
};