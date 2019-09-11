// const square = function(x) {
//     return x * x;
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x * x

// console.log(square(3));

const event = {
    name: "Birthday Party",
    guestList: ["Eduard", "gen", "Mike"],
    printGuestList() {
        console.log("Guest list for " + this.name)
        this.guestList.forEach(x => console.log(x + " " +this.name))
    }
}

event.printGuestList()
