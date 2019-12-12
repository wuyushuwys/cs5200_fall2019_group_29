require('./db')()
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

// Express Route
const userRoute = require('./routers/user.route')
const photoRoute = require('./routers/photo.route')
const commentRoute = require('./routers/comment.route')
const followRoute = require('./routers/follow.route')
// Connecting mongoDB Database

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/users', userRoute)
app.use('/photos', photoRoute)
app.use('/comments', commentRoute)
app.use('/follows', followRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})


// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
