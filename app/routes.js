
var User=require('./models/user');
module.exports=function(app,passport){

    //GOOGLE ROUTES
    //route for google authentication and login
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profgmail',
                    failureRedirect : '/'
            }));
    

    // FACEBOOK ROUTES
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {successRedirect : '/proffacebook',
                                           failureRedirect : '/'
        }));


    //route for processing showing the profile page
    app.get('/profgmail', isLoggedIn, function(req, res) {
        res.send( req.user );// get the user out of session and pass to template
    });

    app.get('/proffacebook', isLoggedIn, function(req, res) {
        res.send( req.user );
    });
   
};


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send('Authentication unsuccessful');

}
