//client side javascript

   


const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const message = document.querySelector('.error');
const emptyMessage  = document.querySelector('.success')


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    emptyMessage.textContent = "Loading..."
    message.textContent = "";
    const location = searchElement.value
    fetch("/weather?address=" + location).then((res) => {
        emptyMessage.textContent = ""
        res.json().then((data)=> {
            if(data.error) {
                console.log(data.error)
                message.textContent = data.error
            }else {
                console.log(data)
                message.textContent= "Forecast: \nsummary: " +  data.forecast.summary + "\nlocation: " + data.location + "\nweather: " +data.forecast.weather + "\naddress: " + data.address
            }  
        })
    })

})


