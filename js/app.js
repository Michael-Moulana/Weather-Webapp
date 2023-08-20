const app = document.querySelector('.weather-app')
const temp = document.querySelector('.temp-heading')
const dateOutput = document.querySelector('.date')
const timeOutput = document.querySelector('.time')
const conditionOutput = document.querySelector('.condition')
const nameOutput = document.querySelector('.name')
const icon = document.querySelector('.icon')
const realfeelOutput = document.querySelector('.realfeel')
const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector('.humidity')
const windOutput = document.querySelector('.wind')
const uvindexOutput = document.querySelector('.uvindex')
const form = document.getElementById('locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const searchIcon = document.getElementById('search-icon')
const cities = document.querySelectorAll('.city')

// inside chrome
const accessKey = ""
let cityInput = 'Gorgan'

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML
        fetchWeatherData()
    })
})

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name')
    } else {
        cityInput = search.value
        fetchWeatherData()
        search.value = ''
    }
    e.preventDefault()
})

function dayOfTheWeek(day, month, year) {
    const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    return weekday[new Date(`${day}/${month}/${year}`).getDay()]
}

function fetchWeatherData() {
    fetch(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            temp.innerHTML = data.current.temperature + "&#176;"
            conditionOutput.innerHTML = data.current.weather_descriptions[0]

            const date = data.location.localtime
            const y = parseInt(date.substr(0, 4))
            const m = parseInt(date.substr(5, 2))
            const d = parseInt(date.substr(8, 2))
            const time = date.substr(11)

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`
            timeOutput.innerHTML = time

            nameOutput.innerHTML = data.location.name


            let timeOfDay = "day"
            const code = data.current.weather_code
            if (data.current.is_day === "no") {
                timeOfDay = "night"
            }

            const iconId = code + ".png"
            icon.src = `./icons/${timeOfDay}/${iconId}`

            realfeelOutput.innerHTML = data.current.feelslike + "&#176;"
            cloudOutput.innerHTML = data.current.cloudcover + "%"
            humidityOutput.innerHTML = data.current.humidity + "%"
            windOutput.innerHTML = data.current.wind_speed + "km/h"
            uvindexOutput.innerHTML = data.current.uv_index

            if (code == 113) {
                app.style.backgroundImage = `url(./img/${timeOfDay}/clear.jpg)`
            } else if (
                code == 116 ||
                code == 119 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(./img/${timeOfDay}/cloudy.jpg)`
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(./img/${timeOfDay}/rainy.jpg)`
            } else {
                app.style.backgroundImage = `url(./img/${timeOfDay}/snowy.jpg)`
            }
        })
        .catch(() => {
            alert('City not found, please try again')
        })
}


fetchWeatherData()