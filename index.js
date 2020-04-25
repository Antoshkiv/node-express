const express = require('express');
const exhbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRouts = require('./routes/courses');
const addRoutes = require('./routes/add');

const app = express();

const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/courses', coursesRouts);
app.use('/add', addRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
