import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from "../model/User.js";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4242/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  console.log('Google profile received:', profile.id, profile.displayName)
  try {
    let user = await User.findOne({googleId: profile.id})
        console.log('User found:', user)

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
      })
            console.log('User created:', user)

    } 
        return done(null, user) 
  } catch (err) {
    console.log("Error Message Received", err.message);
    return done(err, null);
  }
}))

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

export default passport