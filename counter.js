        var calorieContainer = document.querySelector("#calorie-container");
        var foodList = document.querySelector("#food-list");
        var foodInput = document.getElementsByClassName("input-field");
        var addRow = document.querySelector("#add-row");
        var deleteButton = document.getElementsByClassName("delete");
        var clearButton = document.querySelector("#clear");

        var calorieTotal = 0;

        var foods = [];

        // retrieves food items in local storage and sets them in an array
        function pullLocalFoods() {
            var foodList = localStorage.getItem("foods");
                if (localStorage.getItem("foods") === null) {
                    return;
                } else {
                    foods = foodList.split(",");
                }
                for (var k = 0; k < foods.length; k++) {
                    addContainer();
                }
                setFoods(foods);
        }

       
        //function to add new input container
        function addContainer() {

            //Create the div where all the elements will go. 
            var calorieDiv = document.createElement("div");
            calorieDiv.classList.add("food-input", "ui", "input", "focus", "row");

            //Create the delete button. 
            var calorieDelete = document.createElement("button");
            calorieDelete.classList.add("ui", "button", "delete");
            calorieDelete.textContent = "X"; 
            calorieDelete.addEventListener("click",deleteRow);

            //Create the input for the food item. 
            var calorieInput = document.createElement("input");
            calorieInput.setAttribute("type", "text");
            calorieInput.addEventListener("keypress",saveOne);
            calorieInput.classList.add("input-field");

            //Create the output that will show the calories 
            var calorieOutput = document.createElement("p");

            calorieDiv.appendChild(calorieDelete);
            calorieDiv.appendChild(calorieInput); 
            calorieDiv.appendChild(calorieOutput); 

            foodList.appendChild(calorieDiv); 
            

        }

        //function to clear one row
        function deleteRow(event) {
            event.target.parentElement.remove();
            var clearInput = event.currentTarget.nextElementSibling.value
            for(var l = 0; l < foods.length; l++) {
                if(clearInput == foods[l])
                foods.splice(foods.indexOf(clearInput), 1);
            }
            localStorage.setItem("foods", foods);
        }

        // stores all input fields into local storage
        function saveAll(event) {
            foodInput = document.querySelectorAll(".input-field");
            localStorage.removeItem("foods");
            foods= [];

            for(var i = 0; i < foodInput.length; i++) {
                if(foodInput[i].value.length > 0) {
                    var savedFood = foodInput[i].value;
                    foods.push(savedFood);
                }
            }
            localStorage.setItem("foods", foods);
        }

        // stores user input on enter
        function saveOne(event) {
            if(event.which === 13) {
                event.preventDefault();
                saveAll(event);
                setFoods(foods);
            }
        }

        // loop to cycle through local storage
        function setFoods(foods) {
            calorieTotal = 0;
            for (var j = 0; j < foods.length; j++) {
                foodInput[j].value = foods[j]
                // foodInput[j].nextElementSibling.textContent = "x"
                var foodForApi = foods[j]
                nutritionixApi(foodForApi)
            }
            // nutritionixApi(foods, foodInput);
        }


        function nutritionixApi(foodForApi){
            console.log(foodForApi)

                // calorieTotal = 0;
                // var nutriQuery = 'https://api.nutritionix.com/v1_1/search/'+ foodForApi +'?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=a78c3a3d&appKey=23e36dd6dd3f508d048df44067e0d944'
                var nutriQuery = 'https://api.nutritionix.com/v1_1/search/'+ foodForApi +'?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=aa0c257f&appKey=36d2338b2c677899f5ad2f35c9ae1404'

                // API call
                $.ajax({
                    url: nutriQuery,
                    method: "GET"
                }).then(function(res) {
                    // adding the calories of the two inputs

                    calorieTotal = res.hits[1].fields.nf_calories;
                    console.log(calorieTotal)

                    // console.log("Current Calorie Total: " + Math.round(calorieTotal));
                    // foodInput.nextElementSibling.textContent = calorieTotal
                    setCalories(calorieTotal)

                });
        }

        var calorieDisplay = []

        function setCalories(calorieTotal) {
            calorieDisplay.push(calorieTotal)
            for (var m = 0; m < foods.length; m++) {
                foodInput[m].nextElementSibling.textContent = calorieDisplay[m];
            }
            // nutritionixApi(foods, foodInput);
        }

        /*
        function nutritionixApi(foods, foodInput){
            console.log(foods)
            console.log(foodInput)
        
            // for loop to input the values of the foods array into the api
            for (var m = 0; m < foods.length; m++){
                // calorieTotal = 0;
                var nutriQuery = 'https://api.nutritionix.com/v1_1/search/'+ foods[m] +'?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=a78c3a3d&appKey=23e36dd6dd3f508d048df44067e0d944'

                // API call
                $.ajax({
                    url: nutriQuery,
                    method: "GET"
                }).then(function(res) {
                    console.log(input)
                    // adding the calories of the two inputs

                    calorieTotal = res.hits[1].fields.nf_calories;
                    console.log(calorieTotal)

                    // console.log("Current Calorie Total: " + Math.round(calorieTotal));
                    foodInput.nextElementSibling.textContent = calorieTotal

                });
            };
        }
        */

        //event listener on add row button
        addRow.addEventListener("click", function() {
            addContainer();
        })

        //event listener on clear all button
        clearButton.addEventListener("click", function() {
            localStorage.removeItem("foods");
            foodList.innerHTML = "";
            foods = [];
        })

        //event listener on save all button
        document.getElementById("save-all").addEventListener("click", function () {
            saveAll();
            setFoods(foods);
        })


        pullLocalFoods();