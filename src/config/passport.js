import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserRepository from "../repository/user.repository.js";
import AuthService from "../service/auth.service.js";

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async function(accessToken, refreshToken, profile, cb) {
            try {
                const email = profile.emails[0].value;
                const name = profile.displayName;
                const picture = profile.photos[0].value;

                const user = await authService.findOrCreateGoogleUser({
                    email,
                    name,
                    picture,
                    accessToken
                })

                return cb(null, user);
            } catch (error) {
                return cb(error, null);
            }
        }
    )
)

export default passport;