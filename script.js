//Below example api; returns info on mcdonalds food info etc.
//https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=a78c3a3d&appKey=23e36dd6dd3f508d048df44067e0d944

// Calculating Calories necessary to maintain current weight
function calsPerDay() {
    function find(id) { return document.getElementById(id) }

    var age = Number(find("age").value)
    var height = (find("heightFt").value * 30.48) +(find("heightIn").value *2.54);
    var weight = find("weight").value * .45359237
    var bmr=0
    var result = 0

    console.log(height);
    console.log(weight);
    console.log(age);

    if (find("male").checked) {
        console.log("inside check male")
        bmr = (10*weight) + (6.25*height) - (5*age) + 5
    }
        
    else if (find("female").checked) {
        bmr = (10*weight) + (6.25*height) - (5*age) - 161
    }
    find("bmr").innerHTML = Math.round( bmr ) 
    console.log(bmr);

    if (find("sedentary").checked) {
        result=(bmr*1.2);
    }
    
    if (find("light").checked) {
        result=(bmr*1.37);
    }
    
    if (find("moderate").checked) {
        result=(bmr*1.55);
    }
    
    if (find("heavy").checked) {
        result=(bmr*1.72);
    }

    console.log(result);
    find("totalCals").innerHTML='You need '+Math.round(result)+' calories to maintain current weight.'

}

document.getElementById('calBtn').addEventListener('click',calsPerDay)

function nutritionixApi(foods){
    //Set up the nutritionix request
    // var appID='a78c3a3d'
    // var nutriAPI='23e36dd6dd3f508d048df44067e0d944'
    // apple and orange are placeholders for now to see if the loop and ap work properly
    var foods=['apple','orange','ceasar salad'];
    var calorieTotal = 0;
    
    // for loop to input the values of the foods array into the api
    for (let inputs=0;inputs<foods.length; inputs++){
    var nutriQuery= 'https://api.nutritionix.com/v1_1/search/'+foods[inputs]+'?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=a78c3a3d&appKey=23e36dd6dd3f508d048df44067e0d944'
        
    // API call
    $.ajax({
        url: nutriQuery,
        method: "GET"
    }).then(function(res) {
console.log(nutriQuery);
            // adding the calories of the two inputs

            calorieTotal += res.hits[0].fields.nf_calories;
    nutriOutput(res);

    console.log("Current Calorie Total: " + Math.round(calorieTotal));
});
};

// appending
function nutriOutput(res){

    var output = document.querySelector('#generated-content')
        console.log(res.hits[0]);
    
            //Create the output divs to put this search result into. 
            var nutriSearchResult = document.createElement("div"); 
            nutriSearchResult.classList.add("column"); 
            var uiSegment = document.createElement("div"); 
            uiSegment.classList.add("ui","segment"); 
    
            //Put in this search result into the uiSegment to output to the user. 
            var searchTitle = document.createElement("h2"); 
            searchTitle.innerText = res.hits[0].fields.item_name;
    
            //Create calorie amount 
            var calorieAdd = document.createElement("h5");
            calorieAdd.innerText = res.hits[0].fields.nf_calories; 
            calorieAdd.style.color = "rgba(130,130,150,1.0)";
            
            // // appending total calories
            // var totalCaloriesResult = document.createElement(""); 
            // totalCalories.innerText = "Current Calorie Total: " + Math.round(calorieTotal)
            
    
            //Append items 
            uiSegment.append(searchTitle); 
            uiSegment.append(calorieAdd); 
            nutriSearchResult.append(uiSegment);
            nutriSearchResult.append() 
            output.append(nutriSearchResult);
        }
};
nutritionixApi();

