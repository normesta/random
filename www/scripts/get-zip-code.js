var _callback;

function getLocation(callback) {
    _callback = callback;
    navigator.geolocation.getCurrentPosition
        (onSuccess, onError, { enableHighAccuracy: true });
}

var onSuccess = function (position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Get zipCode by using latitude and longitude.

    var queryString = "https://query.yahooapis.com/v1/public/yql?q=" +
       "select%20*%20from%20geo.placefinder%20where%20text%3D%22" + latitude +
       "%2C" + longitude + "%22%20and%20gflags%3D%22R%22" + "&format=json";

    $.getJSON(queryString, function (results) {

        if (results.query.count > 0) {

            var zipCode = results.query.results.Result.uzip;
            _callback(zipCode)

        }

    });
}

function onError(error) { callback(error); }