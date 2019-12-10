require('./db')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoute = require('./routers/user.router')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use('./api/users' ,userRoute)


app.listen(4000)

app.use((req, res, next) => {
    // eslint-disable-next-line no-undef
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
