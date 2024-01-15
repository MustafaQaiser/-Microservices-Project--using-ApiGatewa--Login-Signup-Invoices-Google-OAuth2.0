const bcrypt = require('bcrypt');
const User = require('../Models/User');
const passport = require('../passport');
const googlepassport = require('../passport-google-setup')
const jwt = require('jsonwebtoken');
const authController = {
    signup: async (req, res) => {
        try {
          const { username, email, password } = req.body;
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({ username, email, password: hashedPassword });
          await newUser.save();
          res.status(201).json({ message: 'User created successfully.' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

      login: (req, res) => {
        passport.authenticate('local', (err, user) => {
          if (err || !user) {
            return res.status(401).json({ error: 'Authentication failed' });
          }
          const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1m' });
          res.json({ message: 'Login successful', token });
        })(req, res);
      },
  profile: (req, res) => {
    res.json({ message: 'Welcome to your profile', user: req.user });
  },
  google: (req, res) => {
    googlepassport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
},

googleCallback: (req, res) => {
    googlepassport.authenticate('google', async (err, user) => {
        try {
            if (err || !user) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1m' });
            res.json({ message: 'Google authentication successful', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })(req, res);
}

};

module.exports = authController;
