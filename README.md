# penfed_coding_test

## Stack

Express & JQuery

Basic page was built using Express to provide a proxy for the Yahoo Weather API and simple web server for the app.  Express app looks up users' external IP address then geolocates their City/State to provide to Yahoo's Weather API.  The API link provided was invalid and could not be used to meet the requirements, more information on this issue is below.

JQuery 3.x is used to load the data into the HTML page.  As this is just a prototype it could be significantly improved by using a simple JQuery template or something similar.

## Test Issues

### Test Title

Cvent UI Candidate Tech Challenge

I don't think I'm interviewing at Cvent, I interviewed there in the past and was not interested in working for them.

### Internet Explorer 9 Requirement

IE9 end of life was January 12, 2016.  I don't currently have a working VM, so I can't currently test for IE at all, QA can pick this up for me 😉

### API

Supplied API call returns invalid response.

	http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json

    {
        "query": {
            "count": 0,
            "created": "2016-12-10T05:49:49Z",
            "lang": "en-US",
            "results": null
        }
    }


### Current Yahoo Weather API

I cannot find reference to the API provided in the requirements, Y! does provide a new API to get current and forecast weather data.

https://developer.yahoo.com/weather/

	http://localhost:8081/yahooWeather?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys

	"http://localhost:8081/yahooWeather?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="nome, ak")&format=json&env=store://datatables.org/alltableswithkeys"

Modified data set is unfortunately generated using the city/state combination rather than zip code.

Response example for Sterling, VA:

    {
        "query": {
            "count": 1,
            "created": "2016-12-11T08:01:24Z",
            "lang": "en-US",
            "results": {
                "channel": {
                    "units": {
                        "distance": "mi",
                        "pressure": "in",
                        "speed": "mph",
                        "temperature": "F"
                    },
                    "title": "Yahoo! Weather - Sterling, VA, US",
                    "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2499644/",
                    "description": "Yahoo! Weather for Sterling, VA, US",
                    "language": "en-us",
                    "lastBuildDate": "Sun, 11 Dec 2016 03:01 AM EST",
                    "ttl": "60",
                    "location": {
                        "city": "Sterling",
                        "country": "United States",
                        "region": " VA"
                    },
                    "wind": {
                        "chill": "28",
                        "direction": "225",
                        "speed": "4"
                    },
                    "atmosphere": {
                        "humidity": "68",
                        "pressure": "1021.0",
                        "rising": "0",
                        "visibility": "16.1"
                    },
                    "astronomy": {
                        "sunrise": "7:19 am",
                        "sunset": "4:48 pm"
                    },
                    "image": {
                        "title": "Yahoo! Weather",
                        "width": "142",
                        "height": "18",
                        "link": "http://weather.yahoo.com",
                        "url": "http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"
                    },
                    "item": {
                        "title": "Conditions for Sterling, VA, US at 02:00 AM EST",
                        "lat": "39.005211",
                        "long": "-77.405197",
                        "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2499644/",
                        "pubDate": "Sun, 11 Dec 2016 02:00 AM EST",
                        "condition": {
                            "code": "29",
                            "date": "Sun, 11 Dec 2016 02:00 AM EST",
                            "temp": "28",
                            "text": "Partly Cloudy"
                        },
                        "forecast": [{
                            "code": "28",
                            "date": "11 Dec 2016",
                            "day": "Sun",
                            "high": "39",
                            "low": "26",
                            "text": "Mostly Cloudy"
                        }, {
                            "code": "11",
                            "date": "12 Dec 2016",
                            "day": "Mon",
                            "high": "49",
                            "low": "38",
                            "text": "Showers"
                        }, {
                            "code": "28",
                            "date": "13 Dec 2016",
                            "day": "Tue",
                            "high": "47",
                            "low": "33",
                            "text": "Mostly Cloudy"
                        }, {
                            "code": "28",
                            "date": "14 Dec 2016",
                            "day": "Wed",
                            "high": "38",
                            "low": "30",
                            "text": "Mostly Cloudy"
                        }, {
                            "code": "34",
                            "date": "15 Dec 2016",
                            "day": "Thu",
                            "high": "29",
                            "low": "20",
                            "text": "Mostly Sunny"
                        }, {
                            "code": "28",
                            "date": "16 Dec 2016",
                            "day": "Fri",
                            "high": "31",
                            "low": "18",
                            "text": "Mostly Cloudy"
                        }, {
                            "code": "5",
                            "date": "17 Dec 2016",
                            "day": "Sat",
                            "high": "37",
                            "low": "23",
                            "text": "Rain And Snow"
                        }, {
                            "code": "5",
                            "date": "18 Dec 2016",
                            "day": "Sun",
                            "high": "43",
                            "low": "32",
                            "text": "Rain And Snow"
                        }, {
                            "code": "30",
                            "date": "19 Dec 2016",
                            "day": "Mon",
                            "high": "39",
                            "low": "27",
                            "text": "Partly Cloudy"
                        }, {
                            "code": "30",
                            "date": "20 Dec 2016",
                            "day": "Tue",
                            "high": "37",
                            "low": "24",
                            "text": "Partly Cloudy"
                        }],
                        "description": "<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/29.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Partly Cloudy\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Sun - Mostly Cloudy. High: 39Low: 26\n<BR /> Mon - Showers. High: 49Low: 38\n<BR /> Tue - Mostly Cloudy. High: 47Low: 33\n<BR /> Wed - Mostly Cloudy. High: 38Low: 30\n<BR /> Thu - Mostly Sunny. High: 29Low: 20\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2499644/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)\n<BR />\n]]>",
                        "guid": {
                            "isPermaLink": "false"
                        }
                    }
                }
            }
        }
    }
