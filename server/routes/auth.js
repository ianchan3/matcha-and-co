import express from 'express';
import passport from 'passport';
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

router.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: FRONTEND_URL,
  successRedirect: FRONTEND_URL
}))

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(FRONTEND_URL)
  })
})

router.get('/me', (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(401).json({ error: 'Not logged in' })
  }
})

export default router