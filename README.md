# penfed_coding_test

## Test Title

Cvent UI Candidate Tech Challenge

I don't think I'm interviewing at Cvent, I interviewed there in the past and was not interested in working for them.

## Internet Explorer 9 Requirement

IE9 end of life was January 12, 2016.

## API

### Supplied API call returns invalid response.

	http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json

    {
        "query": {
            "count": 0,
            "created": "2016-12-10T05:49:49Z",
            "lang": "en-US",
            "results": null
        }
    }


### Modifed URL returns useful set

	http://localhost:8081/yahooWeather?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys

	"http://localhost:8081/yahooWeather?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="nome, ak")&format=json&env=store://datatables.org/alltableswithkeys"

Modified data set is unfortunately generated using the city/state combination rather than zip code.

    {
        "query": {
            "count": 1,
            "created": "2016-12-10T05:56:33Z",
            "lang": "en-US",
            "results": {
                "channel": {
                    "units": {
                        "distance": "mi",
                        "pressure": "in",
                        "speed": "mph",
                        "temperature": "F"
                        ...........
                        "description": "<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/31.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Clear\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Fri - Sunny. High: 1Low: -10\n<BR /> Sat - Sunny. High: 6Low: -3\n<BR /> Sun - Partly Cloudy. High: 15Low: 4\n<BR /> Mon - Cloudy. High: 23Low: 16\n<BR /> Tue - Breezy. High: 29Low: 20\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2460286/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)\n<BR />\n]]>",
                        "guid": {
                            "isPermaLink": "false"
                        }
                    }
                }
            }
        }
    }


### ExpressJS

Instead of going the easy route and just using McLean Virginia in the query string, I decided to write a look-up service grabbing the external IP address using J-Chaniotis's external-ip and then looking up the geo information using bluesmoon's geoip-lite.

This service is setup using villadora's express-http-proxy as a reverse proxy of sorts.

