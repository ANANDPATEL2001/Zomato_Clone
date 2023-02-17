import passport from 'passport';
import googleAuth from 'passport-google-oauth2';

import { UserModel } from '../database/user';

const GoogleStrategy = googleAuth.Strategy;

export default (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8081/auth/google/callback",
            passReqToCallback: true,
        },
            async (request, accessToken, refreshToken, profile, done) => {
                const newUser = {
                    // Here email[0] & photo[0] are taken to be the first value as default which will be taken from the google list of gmails unless choosen by the user
                    // Following details will be taken from respective email so selected
                    fullname: profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value,
                };
                try {
                    const user = await UserModel.findOne({ email: newUser.email });
                    if (user) {
                        const token = await user.generatejwtToken();
                        done(null, { user, token });
                    }
                    else {
                        const user = await UserModel.create(newUser);
                        const token = await generatejwtToken();
                        done(null, { user, token });
                    }
                } catch (error) {
                    done(error, null);
                }
            })
    )
};

// Here serializeUser() function has been used in order to get the user {...userData} information after sign-in or sign-up event
// Also deserializeuser() function is used to make session with the user to identify user with id before sign-out  
passport.serializeUser((userData, done) => done(null, { ...userData }));
passport.deserializeUser((id, done) => done(null, id));
