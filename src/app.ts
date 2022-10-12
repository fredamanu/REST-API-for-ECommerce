import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import GoogleTokenStrategy from 'passport-google-id-token'

import userRouter from './routers/user'
import movieRouter from './routers/movie'
import productRouter from './routers/product'
import orderRouter from './routers/order'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import paymentRouter from './routers/payment'
import { GOOGLE_CLIENT_ID } from './util/secrets'
import User from './models/User'
import UserServices from './services/user'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 5000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(cors())

//passport middleware config
app.use(
  session({ secret: 'This is a secret', resave: true, saveUninitialized: true })
)
app.use(passport.initialize())
app.use(passport.session())

//Passport
passport.serializeUser((user: any, done: any) => {
  return done(null, user)
})

passport.deserializeUser((user: any, done: any) => {
  return done(null, user)
})

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async function (accessToken: any, googleId: any, done: any) {
      const newUser = new User({
        firstName: accessToken.payload.given_name,
        lastName: accessToken.payload.family_name,
        email: accessToken.payload.email,
        image: accessToken.payload.picture,
      })

      const user = await UserServices.findOrCreate(newUser)
      done(null, user)
    }
  )
)

app.post(
  '/auth/google',
  passport.authenticate('google-id-token'),
  function (req, res) {
    // do something with req.user
    res.json(req.user)
  }
)

//Dummy test

app.get("/", (req, res)=>{
  res.json({message: "Hello World"})
})

// Set up routers
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/stripe', paymentRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
