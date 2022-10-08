import express from 'express';

// need passport
import passport from 'passport';

// need to include the User Model for authentication
import User from '../models/user.js';

//Display Functions
export function DisplayLoginPage(req, res, next){
    if(!req.user){
        //User is not authenticated so render the login page
        return res.render('index', {title: 'Login', page: 'login', messages: req.flash('loginMessage') });
    }

    return res.redirect('/movie-list');
}

export function DisplayRegisterPage(req, res, next){
    if(!req.user){
        return res.render('index', {title: 'Register', page: 'register', messages: req.flash('registerMessage') });
    }
}

// Process Functions
export function ProcessLoginPage(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            console.error(err);
            res.end(err);
        }

        if(!user){
            req.flash('loginMessage', 'Authetication Error');
            return res.redirect('/login');
        }

        req.logIn(user, function(err){
            if(err){
                console.error(err);
                res.end(err);
            }

            return res.redirect('/')
        });


    })(req, res, next);
}

export function ProcessRegisterPage(req, res, next){
    let newUser = new User({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName
    });

    User.register(newUser, req.body.password, function(err){
        if(err){
            if(err.name == "UserExistsError"){
                console.error('Error: User Already Exists');
                req.flash('registerMessage', 'User Already Exits');
            } else {
                console.error(err);
                req.flash('registerMessage', 'Server Error');
            }

            return res.redirect('/register');
        }

        return passport.authenticate('local')(req, res, function(){
            return res.redirect('/');
        });
    })
}

export function ProcessLougoutPage(req, res, next){
    req.logOut(function(err){
        if(err){
            console.error(err);
            res.end(err);
        };

        console.log('user logged out successfully');
    });

    res.redirect('/login');
}

