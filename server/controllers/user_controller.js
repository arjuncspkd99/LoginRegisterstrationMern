const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = 'nTHDrGp7yz7PRYyULqGN5HS1Q9DnUZv6'; 
const tokenExpiration = '2h'; // set the token expiration time

const userController = {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      console.log('Data was inserted into MongoDB:', user);
      res.json({ message: 'Data was inserted into MongoDB' });
    } catch (err) {
      console.error('Error inserting data into MongoDB:', err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log('Logged in successfully');
      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: tokenExpiration });
      return res.json({ message: 'Logged in successfully', token });
    } catch (err) {
      console.error('Error finding user in database:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = userController;
