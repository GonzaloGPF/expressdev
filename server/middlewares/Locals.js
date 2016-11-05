module.exports = (req, res, next) => {
    // put user into res.locals for easy access from templates
    res.locals.user = req.user || null;
    next();
};