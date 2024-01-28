const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const createPath = require('./helpers/create-path')

// Import routes
const userRoutes = require('./routes/api-user-routes')
const agreementRoutes = require('./routes/api-agreement-routes')
const adRoutes = require('./routes/api-ad-routes')
const apiInternetAdRoutes = require('./routes/api-internetAds-routes');
const outdoorAdRoutes = require('./routes/api-outdoorAd-routes')
const typesOfInternetIdRoutes = require('./routes/api-typesOfInternetId-routes')
const typesOfOutdoorIdRoutes = require('./routes/api-typesOfOutdoorId-routes')
const roleRoutes = require('./routes/api-role-routes')
const userRouter = require('./routes/user-routes')
const adsRouter = require('./routes/ads-routes')

const PORT = 3000;

//db
const URL = 'mongodb://localhost:27017/adFinder';

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'))

app.use(methodOverride('_method'))

app.use(express.json())
app.use(userRoutes)
app.use(agreementRoutes)
app.use(adRoutes)
app.use(apiInternetAdRoutes)
app.use(outdoorAdRoutes)
app.use(typesOfInternetIdRoutes)
app.use(typesOfOutdoorIdRoutes)
app.use(roleRoutes)
app.use(userRouter)
app.use(adsRouter)

app.get('/' , (req, res) => {
    res.render(createPath('index'))
})

//Connect to db
mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`))

//start server
app.listen(PORT, (err) => {
    err ? console.log(err): console.log(`listening pors ${PORT}`)
})
