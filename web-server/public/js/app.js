//client side javascript

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const message = document.querySelector('.message');
const emptyMessage  = document.querySelector('.emptyMessage')


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
                var forecast = data.forecast
                console.log(forecast)
                for(var f in forecast) {
                    var li = document.createElement("li")
                    li.setAttribute('id', forecast[f])
                    li.appendChild(document.createTextNode(f +":" + forecast[f]))
                    message.appendChild(li)
                }
                var li = document.createElement("li")
                li.setAttribute('id', data.location)
                li.appendChild(document.createTextNode("Location: " + data.location))
                message.appendChild(li)
                   

               
                // message.textContent= "Forecast:  summary: " +  data.forecast.summary + "\nlocation: " + data.location + "\nweather: " +data.forecast.weather + "\naddress: " + data.address
            }  
        })
    })

})

