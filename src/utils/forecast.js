const request = require('request');

forecast = (latitude, longtitude, callback) =>  {
    const url = 'https://api.darksky.net/forecast/fa1b607ce2cc306adffd9b2882c35649/' + latitude + ',' + longtitude;
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to the internet!', undefined);
        }else if(body.error){
            callback('Could not find any location!');
        }else{
            callback(undefined,body.daily.summary + 'Current temperature is ' + body.currently.temperature + ' and the chances of rain is ' + body.currently.precipProbability)
        }
    })
}

module.exports = forecast;
