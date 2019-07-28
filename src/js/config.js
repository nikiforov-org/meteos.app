const Config = {
    locale: (() => {
            let 
                locale = navigator.language.substring(0, 2) 
            
            if (['fr','ru'].includes(locale)) {
                return locale;
            }
            return 'en'
        })(),
    weather: {
        appid: '60d07982515e06556b7e5795a6a27fbd',
        uri: 'https://api.openweathermap.org/data/2.5/',
        units: 'metric',
        lang: navigator.language,
        request: {
            forecast: 'forecast'
        }
    }
}

export default Config;