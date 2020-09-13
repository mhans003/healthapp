//Define current coordinates (which will be loaded from navigator object).
var latitude; 
var longitude; 

//Get the user's local coordinates. 
getLocalCoordinates(); 

//Functions 

function getLocalCoordinates() {
    //Access the user's local coordinates from the navigator object. 
    navigator.geolocation.getCurrentPosition(locationRetrieved); 
}

function locationRetrieved(position) {
    //Save latitude and longitude that are retrieved from getCurrentPosition. 
    latitude = position.coords.latitude; 
    longitude = position.coords.longitude; 

    //Add a button to the page with an event listener to pass in a request to the API using local coordinates.
    //HERE

    //In the meantime, call the function that makes the reqest once the coordinates load. 
    requestZomato(); 
}

function requestZomato(event) {
    //This function makes a call to the Zomato API to retrieve locations. 

    //Set up the Zomato API request. 
    var APIKEY_Zomato = `3bcad67a3e4d710dc9a409b26169eb5f`
    var zomatoQuery = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`; 

    //Add code here to see if search input was used. If so, add search keywords to the query string. 

    //Make API call. 
    fetch(zomatoQuery, {
        method: "GET",
        headers: {
            "user-key": APIKEY_Zomato
        }
    })
    .then(response => response.json())
    .then(res => {
        console.log(res); 
    }); 

}

//Events

//someButton.addEventListener("click", requestZomato); 

