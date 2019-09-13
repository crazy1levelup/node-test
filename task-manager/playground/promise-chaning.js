require('../src/db/mongoose');
const User = require('../src/models/user');


// User.findByIdAndUpdate("5d7a57766552bd2fb0aeebfc", {age:1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1});
// }).then((count)=> {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age})
    return count;
}   

updateAgeAndCount("5d7a57766552bd2fb0aeebfc", 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e)
})