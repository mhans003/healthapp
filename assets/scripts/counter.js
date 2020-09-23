        var calorieContainer = document.querySelector("#calorie-container");
        var foodList = document.querySelector("#food-list");
        var foodInput = document.getElementsByClassName("input-field");
        var addRow = document.querySelector("#add-row");
        var deleteButton = document.getElementsByClassName("delete");
        var clearButton = document.querySelector("#clear");
        var calorieElement = document.getElementsByClassName("calorie-output")

        var calorieTotal = 0;
        var totalCount = 0;

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
            calorieDiv.classList.add("food-input", "ui", "focus", "column");

            //Create div to create a new grid. 
            var calorieGrid = document.createElement("div"); 
            calorieGrid.classList.add("ui","two","column","grid","center","aligned"); 

            //Create the delete button. 
            var calorieDelete = document.createElement("button");
            calorieDelete.classList.add("ui","mini","button","delete");
            //calorieDelete.textContent = "X"; 
            calorieDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
            calorieDelete.addEventListener("click",deleteRow);

            //Create the div for the input. 
            var inputDiv = document.createElement("div"); 
            inputDiv.classList.add("ui","mini","input"); 
            inputDiv.style.maxWidth = "150px";

            //Create the input for the food item. 
            var calorieInput = document.createElement("input");
            calorieInput.setAttribute("type", "text");
            calorieInput.addEventListener("keypress",saveOne);
            calorieInput.classList.add("input-field");

            inputDiv.appendChild(calorieInput); 

            calorieGrid.appendChild(inputDiv); 
            calorieGrid.appendChild(calorieDelete); 

            calorieDiv.appendChild(calorieGrid);
        

            //calorieDiv.appendChild(calorieDelete);
            //calorieDiv.appendChild(calorieInput); 
            //calorieDiv.appendChild(inputDiv); 


            //foodList.appendChild(calorieDiv); 
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
        function saveAll() {
            totalCount = 0;
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
            setFoods(foods)
        }

        // stores user input on enter
        function saveOne(event) {
            if(event.which === 13) {
                event.preventDefault();
                saveAll();
            }
        }

        // loop to cycle through local storage
        function setFoods(foods) {
            for (var j = 0; j < foods.length; j++) {
                if(calorieElement[j] !== undefined) {
                    calorieElement[j].remove();
                    foodInput[j].value = foods[j]
                    var foodForApi = foods[j]
                    nutritionixApi(foodForApi, j)
                } else {
                    foodInput[j].value = foods[j]
                    var foodForApi = foods[j]
                    nutritionixApi(foodForApi, j)
                }
            }
        }

        // api call function for calorie data
        function nutritionixApi(foodForApi, j){
            
            //var calorieOutput = document.createElement("p");
            var calorieOutput = document.createElement("div"); 
            calorieOutput.classList.add("calorie-output","ui","one","column","grid","center","aligned");

            document.querySelectorAll(".food-input")[j].appendChild(calorieOutput); 

            var nutriQuery = 'https://api.nutritionix.com/v1_1/search/'+ foodForApi +'?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=a78c3a3d&appKey=23e36dd6dd3f508d048df44067e0d944'
            //var nutriQuery = 'https://api.nutritionix.com/v1_1/search/'+ foodForApi +'?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=aa0c257f&appKey=36d2338b2c677899f5ad2f35c9ae1404'

            // API call
            $.ajax({
                url: nutriQuery,
                method: "GET"
            }).then(function(res) {

                calorieTotal = res.hits[0].fields.nf_calories;
                totalCount += res.hits[0].fields.nf_calories;

                document.querySelectorAll(".calorie-output")[j].textContent = `${Math.round(calorieTotal)} cal`;

                document.querySelector("#total-count").textContent = `Total: ${Math.round(totalCount)} cal`;

                // console.log("Current Calorie Total: " + Math.round(calorieTotal));
                // foodInput.nextElementSibling.textContent = calorieTotal

            });
            
        }

        

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
        })


        pullLocalFoods();

