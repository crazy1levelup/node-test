const add = (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
                return rej("numbers must be non negative");
            }
            res(a + b)
        },2000)
    })
}


const doWork = async () => {
    const sum = await add(2,3);
    const sum2 = await add(sum,49)
    const sum3 = await add(sum2,-21)

    return sum3;
}

doWork().then((a)=> {
    console.log(a)
}).catch((e) => {
    console.log(e)
})

