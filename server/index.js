const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.static(path.resolve(__dirname, '../client/build')));


const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routes/user_route');
const userController = require('./controllers/user_controller');

app.post('/api/register', userController.register);

app.post('/api/login', userController.login);

app.use('/api/user', authMiddleware, userRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
