//Define current coordinates (which will be loaded from navigator object).
var latitude; 
var longitude; 

//Define HTML variables.
var output = document.querySelector("#generated-content"); 

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

    console.log("location retrieved"); 

    //Add a button to the page with an event listener to pass in a request to the API using local coordinates.
    //HERE

    //In the meantime, call the function that makes the reqest once the coordinates load. 
    requestYelp(); 
}

function requestYelp(event) {
    //This function makes a call to the Zomato API to retrieve locations. 

    /*Set up the Zomato API request - Archived
    var APIKEY_Yelp = `3bcad67a3e4d710dc9a409b26169eb5f`
    var yelpQuery = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`; 
    
    */

   var APIKEY_Yelp = 'Qk7R-McIeM66BXlGnkM65vLQmQyOdr4RZV5uND7h_MBnXgfmfi04W5GE_O5FzhRIxuoeKsRq1U33b5J2NtMCfRvFqsQpW0hQSD00CW3NcGauIanNVqgPsxTgGm1eX3Yx';
   var yelpQuery = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10&categories=restaurants&latitude=${latitude}&longitude=${longitude}`;

    //Add code here to see if search input was used. If so, add search keywords to the query string. 

    //Make API call. 
    fetch(yelpQuery, {
        headers: {
            Authorization: `Bearer ${APIKEY_Yelp}`,
        }
    })
    .then(response => response.json())
    .then(res => {
        console.log(res); 
        //Generate the results to output to the user. 
        outputYelpResults(res); 

        //Supported Categories - fitness,restaurants 
        
        //TEST YELP API IN CONSOLE
        //var apiKey = 'Qk7R-McIeM66BXlGnkM65vLQmQyOdr4RZV5uND7h_MBnXgfmfi04W5GE_O5FzhRIxuoeKsRq1U33b5J2NtMCfRvFqsQpW0hQSD00CW3NcGauIanNVqgPsxTgGm1eX3Yx';
        //var requestUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10&categories=restaurants&latitude=${latitude}&longitude=${longitude}`;
        
        /*
        fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        })
        .then(function (yelpResponse) {
            return yelpResponse.json();
        })
        .then(function (data) {
            console.log(data);

            //Output Yelp Results
            outputYelpResults(data); 
        });
        */


    }); 

}

function outputResults(results) {

    //Clear output. 
    output.innerHTML = ""; 

    for(let thisResult = 0; thisResult < 5; thisResult++) {
        //Create the output divs to put this search result into. 
        var searchResult = document.createElement("div"); 
        searchResult.classList.add("column"); 
        var uiSegment = document.createElement("div"); 
        uiSegment.classList.add("ui","segment"); 

        //Put in this search result into the uiSegment to output to the user. 
        var title = document.createElement("h2"); 
        title.innerText = results.nearby_restaurants[thisResult].restaurant.name;

        //Create cuisine/keyword subheading.
        var keywords = document.createElement("h5"); 
        keywords.innerText = results.nearby_restaurants[thisResult].restaurant.cuisines; 
        keywords.style.color = "rgba(130,130,150,1.0)";
        
        //Create price output. 
        var priceOutput = document.createElement("p"); 
        var price = results.nearby_restaurants[thisResult].restaurant.price_range; 
        for(let currencySign = 0; currencySign < price; currencySign++) {
            priceOutput.innerHTML += results.nearby_restaurants[thisResult].restaurant.currency; 
        }

        //Append items 
        uiSegment.append(title); 
        uiSegment.append(keywords); 
        uiSegment.append(priceOutput); 
        searchResult.append(uiSegment); 
        output.append(searchResult);
    }
}

function outputYelpResults(results) {

    //Clear output. 
    output.innerHTML = "";

    for(let thisResult = 0; thisResult < 5; thisResult++) {
        //Create the output divs to put this search result into. 
        var searchResult = document.createElement("div"); 
        searchResult.classList.add("column"); 
        var uiSegment = document.createElement("div"); 
        uiSegment.classList.add("ui","segment"); 

        //Put in this search result into the uiSegment to output to the user. 
        var title = document.createElement("h2"); 
        title.innerText = results.businesses[thisResult].name;

        //Create cuisine/keyword subheading.
        var keywords = document.createElement("h5"); 
        for(let thisCategory = 0; thisCategory < results.businesses[thisResult].categories.length; thisCategory++) {
            keywords.innerHTML += `${results.businesses[thisResult].categories[thisCategory].title}<br>`; 
        }
        keywords.style.color = "rgba(130,130,150,1.0)";
        
        //Create price output. 
        var priceOutput = document.createElement("p"); 
        priceOutput.innerHTML += results.businesses[thisResult].price; 

        //Append items 
        uiSegment.append(title); 
        uiSegment.append(keywords); 
        uiSegment.append(priceOutput); 
        searchResult.append(uiSegment); 
        output.append(searchResult);
    }

}

//Events

//someButton.addEventListener("click", requestYelp); 

