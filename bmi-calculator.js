const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const path = require('path');
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bmi-calculator.html'));
});

app.post('/calculate', (req, res) => {
    const { weight, height, age, unit } = req.body;

    res.send(calc(weight, height/100, age, unit));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function calc(weight, height, age, unit){
    let res = {}
    let bmi = weight/(height * height)
    if(unit === "lbs"){
        bmi *= 703
    }
    res.bmi = bmi
    if(age < 20){
        if(bmi < 18.5){
            res.result = "Underweight"
        }else if(bmi < 25){
            res.result = "Healthy weight"
        }else if(bmi < 30){
            res.result = "At risk of overweight"
        }else{
            res.result = "Overweight"
        }
    }else{
        if(bmi < 16){
            res.result = "Severe Thinness"
        }else if(bmi < 17){
            res.result = "Moderate Thinness"
        }else if(bmi < 18.5){
            res.result = "Mild Thinness"
        }else if(bmi < 25){
            res.result = "Normal"
        }else if(bmi< 30){
            res.result = "Overweight"
        }else if(bmi < 35){
            res.result = "Obese Class I	"
        }else if(bmi < 40){
            res.result = "Obese Class II"
        }else{
            res.result = "Obese Class III"
        }
    }
    return res
}