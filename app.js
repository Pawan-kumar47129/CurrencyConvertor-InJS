const dropdown = document.querySelectorAll(".select-container select");
for (let select of dropdown) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.value = code;
    newOption.innerHTML = code;
    if (select.name == "from" && code === "USD") {
      newOption.selected = "selected";
    }
    if (select.name == "To" && code === "INR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}
const updateFlag = (element) => {
  let img = element.parentElement.querySelector("img");
  console.log(element);
  let currCode = element.value;
  let imgCode = countryList[currCode];
  img.src = `https://flagsapi.com/${imgCode}/flat/64.png`;
};

let form = document.querySelector("#money");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let select = document.getElementsByTagName("select");
  let From = select[0].value;
  let To = select[1].value;
  let amount = document.getElementById("input").value;
  //let url = `https://api.frankfurter.app/latest?amount=${amount}&from=${From}&to=${To}`;
  let URL=`https://v6.exchangerate-api.com/v6/9d39da9032d89e5616b11f50/latest/${From}`
  fetch(URL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let calcAmount = data.conversion_rates[To];
      let totalAmount=calcAmount * amount;
      let outPutAmount=parseFloat(totalAmount.toFixed(4));
      let msg = document.querySelector(".msg");
      msg.innerHTML = `${amount} ${From} = ${outPutAmount} ${To}`;
    })
    .catch((err) => {
      let para = document.getElementById("err");
      para.innerHTML = "There is a sever error try later";
      console.log(err);
    });
});
