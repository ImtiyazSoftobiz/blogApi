const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const PORT = process.env.PORT || 7878;

mongoose.connect('mongodb+srv://m001-student:moo1-mongodb-basi@cluster0.ze29opd.mongodb.net/blog?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
   useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT)
console.log("listen port 7878");
