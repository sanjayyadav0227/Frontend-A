

import './App.css'

function App() {
 
document.getElementById("calculate").addEventListener("click", calculate);


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


  return (
    <>
       <div class="bg-black p-6 rounded-2xl shadow-lg w-80">
        <h2 class="text-xl font-bold text-orange-700 text-center mb-4">BMI Calculator</h2>
        <input
            type="number"
            id="weight"
            name="weight"
            placeholder=" Enter Weight (kg)"
            class="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
            type="number"
            id="height"
            name="height"
            placeholder=" Enter Height (cm)"
            class="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            class="w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-800 transition"
            id="calculate"
            >
            Calculate BMI
        </button>
        <div id="result" class="mt-4 text-center"></div>
        <div id="chart" class="mt-4 text-center"></div>
        <button id="suggest" class="w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-800 transition">Suggestion</button>
    </div>
    </>
  )
}

export default App
