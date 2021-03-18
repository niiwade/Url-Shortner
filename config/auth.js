module.exports = {
    ensureAuthentcated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', 'Please login to shorten  your urls');
        res.redirect('/users/login');
    }
};