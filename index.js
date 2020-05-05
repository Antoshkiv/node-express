const express = require('express');
const exhbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const coursesRouts = require('./routes/courses');
const addRoutes = require('./routes/add');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5eb1a2786c08ac07a860c94d');
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/courses', coursesRouts);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url =
      'mongodb+srv://dima:xuUPrKYAcwX56QQh@cluster0-sgkgi.mongodb.net/shop';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: 'antoshkiv1@gmail.com',
        name: 'Dima',
        cart: { items: [] },
      });
      await user.save();
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
