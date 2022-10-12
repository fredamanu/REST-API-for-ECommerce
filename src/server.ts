import errorHandler from 'errorhandler'
import mongoose from 'mongoose'

import app from './app'
import { MONGODB_URI } from './util/secrets'
import logger from './util/logger'

const mongoUrl = MONGODB_URI

mongoose
  .connect(mongoUrl, {
    dbName: 'database',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

/**
 * Error Handler. Provides error handing middleware
   only use in development
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

// Start Express server
app.listen(process.env.PORT || 5000, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})


// "scripts": {
//   "start:prod": "node dist/src/server.js",
//   "start:dev": "nodemon src/server.ts",
//   "build": "tsc",
//   "watch-ts": "tsc -w",
//   "test": "jest --forceExit --detectOpenHandles --coverage --verbose false",
//   "watch-test": "npm run test -- --watchAll",
//   "lint": "tsc --noEmit && eslint \"**/*.{js,ts}\" --quiet --fix"
// },