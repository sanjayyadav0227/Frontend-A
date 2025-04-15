// async function fetchGeminiResponse() {
//     try {
//         const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBCYIZIAgWMC5pPtSKYr2UMdU4saqW-gGc", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 contents: [{ role: "user", parts: [{ text: "Hello, how are you?" }] }]
//             })
//         });

//         const data = await response.json(); // Convert response to JSON

//         if (!response.ok) {
//             throw new Error(`API Error: ${data.error?.message || "Unknown error"}`);
//         }

//         console.log("Gemini API Response:", data);
//     } catch (error) {
//         console.error("Error fetching API:", error);
//     }
// }

// fetchGeminiResponse(); // Call function to fetch API response


  
document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("suggest").addEventListener("click", showApiDiv);

function calculate() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById("result").innerHTML = "Please Enter Valid height and weight";
        document.getElementById("result").classList = "text-md font-semibold text-center text-slate-200";
    } else {
        let bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);
        if(bmi < 18.5){
            document.getElementById("chart").innerHTML = "Underweight";
            document.getElementById("chart").classList = "text-md font-semibold text-center text-slate-100";
        }
        else if(bmi >= 18.5 && bmi <= 24.9 ){
            document.getElementById("chart").innerHTML = "Normal Weight";
            document.getElementById("chart").classList = "text-md font-semibold text-center text-green-200";
        }
        else if(bmi >= 25 && bmi <= 29.9 ){
            document.getElementById("chart").innerHTML = "Overweight";
            document.getElementById("chart").classList = "text-md font-semibold text-center text-orange-200";
        }
        else if(bmi >= 30 && bmi <= 39.9){
            document.getElementById("chart").innerHTML = "Obesity";
            document.getElementById("chart").classList = "text-md font-semibold text-center text-red-200";
        }
        else{
            document.getElementById("chart").innerHTML = "Extreme Obesity";
            document.getElementById("chart").classList = "text-md font-semibold text-center text-red-400";
        }

        document.getElementById("result").innerHTML = `Your BMI is ${bmi}`;
        document.getElementById("result").classList = "text-md font-semibold text-center text-slate-200";
    }
}

async function fetchDietPlan(bmi) {
    let category = "";
    
    if (bmi < 18.5) category = "underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) category = "normal";
    else if (bmi >= 25 && bmi <= 29.9) category = "overweight";
    else category = "obesity";

    try {
        let response = await fetch(`fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent${category}`);
        let data = await response.json();
        
        document.getElementById("api").innerHTML = `<h3>Diet Plan:</h3><p>${data.plan}</p>`;
    } catch (error) {
        console.error("Error fetching diet plan:", error);
        document.getElementById("api").innerHTML = "<p>Failed to load diet suggestions.</p>";
    }
}

// Call this function after BMI is calculated
document.getElementById("suggest").addEventListener("click", function() {
    let bmiValue = parseFloat(document.getElementById("result").innerText.split(":")[1]);
    fetchDietPlan(bmiValue);
});



//Function to make the #api div visible when Suggestion button is clicked
function showApiDiv() {
    let apiDiv = document.getElementById("api");

    // Check if the element exists before modifying it
    if (apiDiv) {
        apiDiv.classList.remove("invisible"); // Removes 'invisible' class to make it visible
        apiDiv.classList.add("block"); // Ensure it is displayed (if Tailwind requires it)

        fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBCYIZIAgWMC5pPtSKYr2UMdU4saqW-gGc') // Replace with your API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            // Display the fetched data in the #api div
            apiDiv.innerHTML = `<p>${JSON.stringify(data)}</p>`; // Customize this to display data as needed
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            apiDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}
     else {
        console.log("Element with ID 'api' not found");
    }
}

//         fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBCYIZIAgWMC5pPtSKYr2UMdU4saqW-gGc')
//        .then(data => {
//        // Assuming the API returns an array of suggestions
//        let suggestions = data.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('');
//        apiDiv.innerHTML = `<ul>${suggestions}</ul>`;
// })

// function toggleApiDiv() {
//     let apiDiv = document.getElementById("api");

//     if (apiDiv) {
//         apiDiv.classList.toggle("opacity-0"); // Hides it smoothly
//         apiDiv.classList.toggle("opacity-100"); // Makes it visible
//     } else {
//         console.log("Element with ID 'api' not found");
//     }
// }



//AIzaSyBCYIZIAgWMC5pPtSKYr2UMdU4saqW-gGc API KEY  

// Below 18.5	Underweight
// 18.5 - 24.9	Normal Weight
// 25 - 29.9	Overweight
// 30 - 34.9	Obesity (Class 1)
// 35 - 39.9	Obesity (Class 2)
// 40 and above	Extreme Obesity (Class 3)