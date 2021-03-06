const
    uri = new URL('https://api.openweathermap.org/data/2.5/forecast'),
    params = {
        appid: '60d07982515e06556b7e5795a6a27fbd',
        lang: 'ru',
        units: 'metric'
    };

new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(position => {
        params.lat = position.coords.latitude;
        params.lon = position.coords.longitude;
        if (params.lat && params.lon) {
            resolve('Location defined');
        } else {
            reject('Location undefined');
        }
    })
})
    .then((result) => {
        Object.keys(params).map(key => uri.searchParams.append(key, params[key]));
        return result
    })
    .then((result) => fetchData())
    .catch(error => console.error(error))

const fetchData = () => {
    fetch(uri)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Network response Error.')
        })
        .then(json => render(json))
        .catch(error => console.error(error))
}

const render = json => {
    const
        item = func => json.list.map(func),
        forcast = document.querySelector('.forecast');

    item.dt = item(item => item.dt);
    item.clouds = item(item => item.clouds.all);

    forcast.innerHTML += '<div class="clouds">Облачность ' + item.clouds + '%</div>';
}

const hPa2mmHg = value => Math.round(value / 1.33322)