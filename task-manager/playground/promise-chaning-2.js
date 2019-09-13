require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndRemove("5d7a5912b7bcde39880d34cb").then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false});
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })


const removeTask =async (id) => {
    const checkTask = Task.findById(id).then((task) => {
        if(!task) {
            return console.log("no task found")
        }
    })
      
    const task = await Task.findByIdAndRemove(id);
    const count = await Task.countDocuments({completed:false})
    return count;
}

removeTask("5d7b4c69e49ffc127846874c").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})