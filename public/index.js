
const submitButton = document.querySelector("#form")

submitButton.addEventListener("submit", submit)

function submit(e){
    e.preventDefault();
    const height = document.querySelectorAll("#height")
    const weight = document.querySelectorAll("#weight")
    const age = document.querySelectorAll("#age")
    const gender = document.querySelector("#gender")
    const units = document.querySelector("#units")
    const result = document.querySelector(".result")

    let isValid = true
    if(!(height[0].value > 0)){
        height[1].style = "display: inline"
        isValid = false
    }else{
        height[1].style = "display: none"

    }
    if(!(weight[0].value > 0)){
        weight[1].style = "display: inline"
        isValid = false
    }else{
        weight[1].style = "display: none"
    }
    if(!(age[0].value > 0)){
        age[1].style = "display: inline"
        isValid = false
    }else{
        age[1].style = "display: none"
    }
    if(isValid){
        const body = {
            height: height[0].value,
            weight: weight[0].value,
            age: age[0].value,
            unit: units.value
        }
        axios.post("/calculate", body).then((res)=>{
            result.style = "display: inline";
            result.innerText = `BMI: ${res.data.bmi.toFixed(2)}. Result: ${res.data.result}`
            console.log(res);
        })
    }
}