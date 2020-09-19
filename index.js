//Define current coordinates (which will be loaded from navigator object).
var latitude;
var longitude;

//Define categories for the drop down menu. 
// categories = [
//{
//main: "fitness",
//sub: [
//{
//main: "gym",
//sub: [
//{
//main: "power lifting",
//sub: [
//{
//main: "Eos"
//},
//{
// main: "Crossfit"
//},
//{
//main: "Golds"
//}
//]
//}, 
//{
//main: "club gym",
//sub: [
//{
// main: "la fitness"
//},
//{
//main: "24 hour fitness"
//},
//{
//main: "Planet Fitness"
//}
//]
//}
//]
//},
//{
//main: "studio",
//sub: [
//{
//main: "yoga",
//sub: [
//{
// main: "heat yoga"
//}
//]
//}
// ]
// }

//]
//},
//{
//main: "grocery",
//sub: [
//{
//main: "natural"
//}
//]
//},
//{
//main: "restaurants",
//sub: [
//{
//main: "vegetarian"
//},
//{
//main: "paleo"
//},
//{
//main: "vegan",
//sub: [
//{
//main: "raw vegan"
//}
//]
//}
//]
// }
//]; 

/*CATEGORIES

fitness
nutrition 

(fitness)
gym
yoga
spin class
crossfit
interval training
rock climbing 
bodybuilding
self defense 
martial arts
swimming
personal training
boot camp


(nutrition)
vegetarian
vitamins and supplements
organic
vegan 
diet
meal prep
market
keto
carnivore
paleo 
juice bar and smoothies


(health and wellness)
massage
chiropractor
physical therapy 
spas
meditation
acupuncture 
holistic





*/


//Define HTML variables.
var output = document.querySelector("#generated-content");
var searchIcon = document.querySelector("#search-icon");
var searchField = document.querySelector("#search-field");

//Generate the main drop down menu.
//generateDropdown(); 

//Get the user's local coordinates. 
getLocalCoordinates();

//Functions 


//function generateDropdown() {
//Generate main drop down items 
//for(let i = 0; i < categories.length; i++) {
// var main = document.createElement("div"); 
// main.classList.add("item"); 
//main.innerText = categories[i].main; 

//document.querySelector("#main-dropdown").append(main); 

//Add event listeners to main categories
//main.addEventListener("click", function(event) {
//console.log(this.parentElement.parentElement); 

//Delete existing element siblings. 
//while(this.parentElement.parentElement.nextElementSibling) {
//this.parentElement.parentElement.nextElementSibling.remove(); 
//}

//Generate sub-categories 
//generateSub(categories[i]); 
//}); 
//}
//}

//function generateSub(category) {

//make new dropdown
//var dropdown = document.createElement("div"); 
//dropdown.classList.add("ui","simple","selection","dropdown"); 
//var input = document.createElement("input");
//input.setAttribute("type","hidden"); 
//input.setAttribute("name", category.main); 

//var icon = document.createElement("i"); 
//icon.classList.add("dropdown","icon"); 

//var categoryHeading = document.createElement("div"); 
//categoryHeading.classList.add("default","text"); 
//categoryHeading.innerText = category.main; 

//var menu = document.createElement("div"); 
//menu.classList.add("menu"); 

//dropdown.appendChild(input); 
//dropdown.appendChild(icon); 
//dropdown.appendChild(categoryHeading); 
//dropdown.appendChild(menu); 

//document.body.appendChild(dropdown);
//document.getElementById("dropdown-container").appendChild(dropdown);  

//Create sub items 

//for(let i = 0; i < category.sub.length; i++) {

//var sub = document.createElement("div"); 
//sub.classList.add("item"); 
//sub.innerText = category.sub[i].main; 

//menu.appendChild(sub); 

//if(category.sub[i].sub) {
//repeat if another sub category. 
//sub.addEventListener("click", function() {
//Delete any other dropdowns that are siblings
//while(this.parentElement.parentElement.nextElementSibling) {
//this.parentElement.parentElement.nextElementSibling.remove(); 
//} 

//Generate the correct sub categories 
//generateSub(category.sub[i]); 
//}); 
//}

//}

//}

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
}

function requestYelp(event) {

    //Create array for all a tags. 
    var aTags = document.getElementsByTagName("a"); 
    //Create array to hold selected search terms.
    var selectTerms = []; 

    //For all a tags selected, see if they are select items with a class of transition, and add its data-value attribute to the select terms array.
    for(var i = 0; i < aTags.length; i++) {
        if(aTags[i].classList.contains("transition")) {
            selectTerms.push(aTags[i].getAttribute("data-value")); 
        }
    }
 
    //This function makes a call to the Zomato API to retrieve locations. 

    //Add code here to see if search input was used. If so, add search keywords to the query string. 
    console.log(searchField.value);

    //Set up Yelp request. 
    var APIKEY_Yelp = 'Qk7R-McIeM66BXlGnkM65vLQmQyOdr4RZV5uND7h_MBnXgfmfi04W5GE_O5FzhRIxuoeKsRq1U33b5J2NtMCfRvFqsQpW0hQSD00CW3NcGauIanNVqgPsxTgGm1eX3Yx';
    var yelpQuery = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=10`;

    //Check if there is any terms selected. Get the query string ready for appending terms. 
    if (searchField.value.length > 0 || selectTerms.length > 0) {
        yelpQuery += "&term="; 
    }

    //See if any search terms were entered in. 
    if (searchField.value.length > 0) {
        var search = searchField.value;
        yelpQuery += search;

        //If there is any selected dropdown items, get the string ready by adding a space. 
        if(selectTerms.length > 0) {
            yelpQuery += " "; 
        }
    }

    //See if dropdown items were selected and add them to the query string. 
    if (selectTerms.length > 0) {
        for(let i = 0; i < selectTerms.length; i++) {
            yelpQuery += selectTerms[i]; 
            if(i !== selectTerms.length - 1) {
                yelpQuery += " "; 
            }
        }
    }

    //If the coordinates have loaded, add to the query string. 
    if (latitude && longitude) {
        yelpQuery += `&latitude=${latitude}&longitude=${longitude}`;
    }

    console.log("Query String:" + yelpQuery);

    //Make API call. 
    fetch(yelpQuery, {
        headers: {
            Authorization: `Bearer ${APIKEY_Yelp}`,
        }
    })
        .then(response => {

            //See if the response is not OK from the Yelp API
            if (!response.ok) {
                throw new Error("Failed to retrieve Yelp results.");
            }

            return response.json();
        })
        .then(res => {
            //Clear any search error that may be present.
            clearError();
            console.log(res);
            //Generate the results to output to the user. 
            outputYelpResults(res);
        })
        .catch(error => {
            //Display the error in the console.
            console.log(error);

            //Output error message. 
            outputError();

            //Make the alternate API call - move this to function later. 
            var APIKEY_Zomato = `3bcad67a3e4d710dc9a409b26169eb5f`
            var zomatoQuery = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`;

            fetch(zomatoQuery, {
                method: "GET",
                headers: {
                    "user-key": APIKEY_Zomato
                }
            })
                .then(zomatoResponse => zomatoResponse.json())
                .then(zomatoRes => {
                    console.log(zomatoRes);

                    //Display the alternative results from Zomato
                    outputZomatoResults(zomatoRes);
                });
        });

}

function outputZomatoResults(results) {

    //Clear output. 
    output.innerHTML = "";

    for (let thisResult = 0; thisResult < 5; thisResult++) {
        //Create the output divs to put this search result into. 
        var searchResult = document.createElement("div");
        searchResult.classList.add("column");
        var uiSegment = document.createElement("div");
        uiSegment.classList.add("ui", "segment");

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
        for (let currencySign = 0; currencySign < price; currencySign++) {
            priceOutput.innerHTML += results.nearby_restaurants[thisResult].restaurant.currency;
        }

        //Create address output
        var addressOutut = document.createElement("div");
        addressOutut.innerText = results.nearby_restaurants[thisResult].restaurant.location.address;

        //Append items 
        uiSegment.append(title);
        uiSegment.append(keywords);
        uiSegment.append(priceOutput);
        uiSegment.append(addressOutut);
        searchResult.append(uiSegment);
        output.append(searchResult);
    }
}

function outputYelpResults(results) {

    //Clear output. 
    output.innerHTML = "";

    for (let thisResult = 0; thisResult < 5; thisResult++) {
        //Create the output divs to put this search result into. 
        var searchResult = document.createElement("div");
        searchResult.classList.add("column");
        var uiSegment = document.createElement("div");
        uiSegment.classList.add("ui", "segment", "two", "column", "stackable", "grid");

        //Column for h2, h5, and p. 
        var contentCol = document.createElement("div");
        contentCol.classList.add("column");

        //Column for image
        var imageCol = document.createElement("div");
        imageCol.classList.add("column");

        //Put in this search result into the uiSegment to output to the user. 
        var title = document.createElement("h2");
        title.innerText = results.businesses[thisResult].name;

        //Create cuisine/keyword subheading.
        var keywords = document.createElement("h5");
        for (let thisCategory = 0; thisCategory < results.businesses[thisResult].categories.length; thisCategory++) {
            keywords.innerHTML += `${results.businesses[thisResult].categories[thisCategory].title}<br>`;
        }
        keywords.style.color = "rgba(130,130,150,1.0)";

        //Create price output. 
        var priceOutput = document.createElement("p");
        priceOutput.innerHTML += results.businesses[thisResult].price;

        //Create address output.
        var addressOutut = document.createElement("div");
        //Go through the display address array; Output one line per array element for the display address array.
        for (let thisAddressLine = 0; thisAddressLine < results.businesses[thisResult].location.display_address.length; thisAddressLine++) {
            var thisLine = document.createElement("div");
            thisLine.innerText = results.businesses[thisResult].location.display_address[thisAddressLine];
            addressOutut.append(thisLine);
        }

        //Create phone number output.
        var phoneOutput = document.createElement("h4");
        phoneOutput.innerText = results.businesses[thisResult].display_phone;

        //Create image.
        var image = document.createElement("img");
        image.classList.add("ui", "centered", "medium", "rounded", "image");
        image.setAttribute("src", results.businesses[thisResult].image_url);

        //Append items 
        contentCol.append(title);
        contentCol.append(keywords);
        contentCol.append(priceOutput);
        contentCol.append(addressOutut);
        contentCol.append(phoneOutput);

        imageCol.append(image);

        uiSegment.append(imageCol);
        uiSegment.append(contentCol);

        searchResult.append(uiSegment);
        output.append(searchResult);
    }

}

function outputError() {
    //Output an error when Yelp request does not work. 
    var errorDiv = document.createElement("div");
    errorDiv.classList.add("ui", "red", "basic", "label");
    errorDiv.innerText = "Error with search results. Use the limited results or try again.";
    document.getElementById("error-container").appendChild(errorDiv);
}

function clearError() {
    //Remove any error that may be present when Yelp request does work.
    document.getElementById("error-container").innerHTML = "";
}

//Events

searchIcon.addEventListener("click", requestYelp);


