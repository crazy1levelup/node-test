//modules
require('./db/mongoose');
const express = require('express');

//routes
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//app settings
const app = express();
const port = process.env.PORT || 3000; //grab production port if found else on local

app.use(express.json())
app.use(userRouter, taskRouter);

app.listen(port, () => {
    console.log("Server is up on port  " + port)
});


const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = "red1234!"
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare("red1234!", hashedPassword)
    console.log(isMatch)
}

myFunction()