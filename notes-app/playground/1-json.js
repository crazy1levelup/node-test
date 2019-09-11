const fs = require('fs')

// const book = {
//     title: 'Eho is the enemy',
//     author: 'Ryan holiday'
// }

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer =  fs.readFileSync("1-json.json").toString()
// const data = JSON.parse(dataBuffer);
// console.log(data.title)

const data = fs.readFileSync("./1-json.json").toString();
const parsedData = JSON.parse(data)
parsedData.name ="Eduard"
parsedData.age = "25"

const userJson = JSON.stringify(parsedData)
fs.writeFileSync('1-json.json', userJson)