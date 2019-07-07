const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const user = require('./models/user_models');
const user_role = require('./models/user_role_models');
const middlewares = require('./middleware/middleware');

const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define routes for "User Entity"

app.use("/user", userRoutes);

app.use(middlewares.sendResponse);

//Error handling
app.use(function(req, res, next) {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

//Send Error Message Response 
app.use(function(error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
        message: error.message
        }
    });
});

//Init function to sync DB and Drop the table if you want
const init = async () => {
    await user.sync({force:true}) // force: true will drop the table if it already exists
    await user_role.sync({force:true})
    console.log('Tables have synced!')
};
init();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))