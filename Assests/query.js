function genOneCallQueryURL(lat, lon) {
    var queryURLAndLat = "https://api.openweathermap.org/data/2.5/onecall?lat=";
    var queryLon = "&lon=";
    var queryUnit = "&units=imperial";
    var queryExclude = "&exclude=minutely,hourly,alerts";
    var queryAppID = "&appid=";
    return queryURLAndLat + lat + queryLon + lon + queryUnit + queryExclude+ queryAppID + appID;
}