const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const methodOverride = require('method-override');

const app = express();

//CONNECT DATABASE
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', pageController.getIndexPage);
app.get('/about', pageController.getAboutPage);
app.get('/posts/edit/:id', pageController.getEditPage);
app.get('/posts/:id', pageController.getPostPage);

app.get('/add_post', pageController.getAddPostPage);
app.delete('/posts/:id', postController.deletePost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
