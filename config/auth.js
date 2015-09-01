// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1054938684524639', // your App ID
        'clientSecret'  : 'dda78317d32bc4fbeb877730029a09a2', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : '5NJhSPfy4TY5tbaZ54CaCJce7',
        'consumerSecret'    : '0wL3I3evnYULFGhJJ8XUczFnI60BGUmv3YEBSMOIG1sgTqQ5Gn',
        'callbackURL'       : 'http://127.0.0.1:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '493074027212-7cuobu4liu5bkpv4mi22d3b1jmctr47t.apps.googleusercontent.com',
        'clientSecret'  : 'l7_F-grGNRuq0Xr1ntPvoiNW',
        'callbackURL'   : 'http://127.0.0.1:8080/auth/google/callback'
    }

};