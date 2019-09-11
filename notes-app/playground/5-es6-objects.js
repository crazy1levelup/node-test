const name ="eduard"
const userAge = 25

const user = {
    name,
    userAge,
    location: "Deva"
}

// console.log(user)

const product = {
    label: "Red notebook",
    price: 3,
    stock: 201,
    salePrice: undefined,
    raiting: 4.2
}


// const {label: productLabel, stock, raiting = 5} = product
// console.log(productLabel)
// console.log(stock)
// console.log(raiting)

const transaction = (type, {label, stock} = {}) => {
    console.log(type, label, stock)
}

transaction('order', product)