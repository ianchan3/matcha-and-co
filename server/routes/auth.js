import express from 'express';
import passport from 'passport';
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: '/',
  successRedirect: 'http://localhost:5173'  
}))

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173')
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