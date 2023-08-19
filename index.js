const express = require('express')
const path = require('path')
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')

 const app = express()
 const PORT = 3000


 mongoose.connect('mongodb://127.0.0.1:27017/blogify').then(e => {console.log('mongoose connected')})

 app.set('view engine', 'ejs')
 app.set('views', path.resolve('./views'))




app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({})
   res.render('home', {
     user: req.user,
     blogs: allBlogs
   })
})


 app.use('/user', userRoute)
 app.use('/blog', blogRoute)
 



 app.listen(PORT, () => console.log(`server started at port: ${PORT}`))