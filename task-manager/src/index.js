//modules
require('./db/mongoose');
const express = require('express');

//routes
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//app settings
const app = express();
const port = process.env.PORT //grab production port if found else frun on local

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is up on port  " + port)
    
});


