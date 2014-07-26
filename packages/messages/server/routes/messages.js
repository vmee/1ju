'use strict';

// The Package is past automatically as first parameter
module.exports = function(Messages, app, auth, database) {

    app.get('/messages/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/messages/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/messages/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/messages/example/render', function(req, res, next) {
        Messages.render('index', {
            package: 'messages'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
