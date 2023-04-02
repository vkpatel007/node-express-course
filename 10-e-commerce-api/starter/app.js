require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect')
const fileUpload = require('express-fileupload')


const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')


const productRouter = require('./routes/productRoutes')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')



app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))
app.use(fileUpload())

app.get('/', (req, res) => {
  console.log(req.cookies)
  res.send('yo yo yo')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  // console.log(req.cookies)
  res.send('yo yo yo')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)

app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 3000

const start = async () => {

  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {

      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()