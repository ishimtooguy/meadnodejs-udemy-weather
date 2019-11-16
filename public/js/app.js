console.log('Client side js file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()

    const location = encodeURIComponent(search.value)

    message1.textContent = 'Retrieving your weather forecast...'
    message2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then(
        resp => {
            resp.json().then(data => 
                {
                    console.log(data)
                    if (data.error)
                    {
                        console.log(`*** ERROR: ${data.error}`)
                        message1.textContent = `*** ERROR: ${data.error}`
                    }
                    else
                    {
                        console.log(data.forecast, data.location)
                        message1.textContent = data.location
                        message2.textContent = data.forecast
                    }
                })
        }
    )
})
