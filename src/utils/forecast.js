const request = require('request');

forecast = (latitude, longtitude, callback) =>  {
    const url = 'https://api.darksky.net/forecast/fa1b607ce2cc306adffd9b2882c35649/' + latitude + ',' + longtitude + '?' + 'lang=en&' + 'units=ca';
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to the internet!', undefined);
        }else if(body.error){
            callback('Could not find any location!');
        }else{
            callback(undefined,body.daily.summary + 'Current temperature is ' + Math.ceil(body.currently.temperature) + '℃ and Feels like ' +  Math.floor(body.hourly.data[0].apparentTemperature) + '℃, Temp Low : ' + Math.floor(body.daily.data[0].temperatureLow) + '℃, Temp High: ' + Math.ceil(body.daily.data[0].temperatureHigh) + '℃')
    
        }
    })
}

module.exports = forecast;
