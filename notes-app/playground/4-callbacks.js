setTimeout(() => {
    console.log("2 seconds are up")
}, 2000)

const names = ["eduard", "Gen", "Jess"]
const shortNames = names.filter((x) =>{
    return x.length <= 4
})

const geoCode = (address, callback) => {
    setTimeout(() => {
        const data = {
            lat: "123",
            long: "22"
        }
       callback(data)
    },2000)
}

geoCode("california", (x)=> {
    console.log(x)
})


const add = (n1, n2, callback) => {
    setTimeout(() => {
        const n3 = n1+ n2;
        callback(n3)
    },2000)
} 

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
   
})
