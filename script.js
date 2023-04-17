import { jsondata } from "./api.js";

let data = jsondata;

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const btn = document.querySelector(".btn-open");
const catBtn = document.querySelectorAll("#test");
const formSection = document.querySelector(".form-section");
const form = document.querySelector(".fact-form");
const textBox = document.querySelector(".text-box");
const charCount = document.querySelector(".text-count");
const postButton = document.querySelector(".post");
const maxNumOfChars = 200;
let ul = document.getElementById("list");
const submitMessage = document.querySelector(".submit-msg");

charCount.innerHTML = maxNumOfChars;

btn.addEventListener("click", function () {
  if (formSection.hasAttribute("hidden")) {
    formSection.removeAttribute("hidden");
    btn.innerHTML = "close";
  } else {
    formSection.setAttribute("hidden", "");
    btn.innerHTML = "share a fact";
  }
});

const submitForm = (event) => {
  event.preventDefault();
  alert("Form Submitted!");
  form.reset();
  charCount.innerHTML = maxNumOfChars;
};

const countCharacters = () => {
  let numOfEnteredChars = textBox.value.length;
  let counter = maxNumOfChars - numOfEnteredChars;
  charCount.textContent = counter;
};

textBox.addEventListener("input", countCharacters);

catBtn.forEach((btn) => {
  btn.addEventListener("click", function listFilter() {
    console.log(btn.innerHTML.toLowerCase());
    let category = btn.innerHTML.toLowerCase();
    if (category === "all") {
      list(data);
    } else {
      let newList = data.filter((i) => i.category === category);
      ul.innerHTML = "";
      list(newList);
    }
  });
});

form.addEventListener("submit", submitForm);

data = JSON.parse(localStorage.getItem("data"));

//adding elements the long/hard way (pause)
// data.forEach((i) => {
//   var ul = document.getElementById("list");
//   var li = document.createElement("li");
//   li.className = "fact";
//   li.innerHTML = i.text;
//   ul.append(li);
// });

//My way of adding elements after fetching data. This is the easiest way to add html code using vanilla javascript
function list(facts) {
  facts.forEach((i) => {
    let category = CATEGORIES.find((x) => x.name === i.category);

    ul.insertAdjacentHTML(
      "afterbegin",
      `<li class="fact">
    <p class="letter">${i.text}<a class="source"
    href="
    ${i.source}"
    target="_blank">(Source)</a></p>
    <span class="tag" style="background-color:${category.color}" >${i.category}</span>
    <div class="btn-group">
        <button>👍 ${i.voteInteresting}</button>
        <button>😧 ${i.voteMindBlowing}</button>
        <button>⛔ ${i.voteFalse}</button>
    </div>
  </li>`
    );
  });
}

list(data);

//The course's way of adding elements after getting data
// const htmlArr = data.map(
//   (i) =>
//     `<li class="fact">
//   <p class="letter">${i.text}</p>
//   <span class="tag">${i.category}</span>
//   <div class="btn-group">
//       <button>👍 ${i.voteInteresting}</button>
//       <button>😧 ${i.voteMindBlowing}</button>
//       <button>⛔ ${i.voteFalse}</button>
//   </div>
// </li>`
// );

// console.log(htmlArr);
// const html = htmlArr.join("");
// let ul = document.getElementById("list");
// ul.insertAdjacentHTML("afterbegin", html);
