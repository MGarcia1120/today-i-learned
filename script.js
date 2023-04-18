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

const btnOpen = document.querySelector(".btn-open");
let catBtn;
const formSection = document.querySelector(".form-section");
const form = document.querySelector(".fact-form");
const textBox = document.querySelector(".text-box");
const charCount = document.querySelector(".text-count");
const categoryList = document.querySelector(".category-list");
const postButton = document.querySelector(".post");
const maxNumOfChars = 200;
let ul = document.getElementById("list");
const submitMessage = document.querySelector(".submit-msg");

charCount.innerHTML = maxNumOfChars;

btnOpen.addEventListener("click", function () {
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

form.addEventListener("submit", submitForm);

data = JSON.parse(localStorage.getItem("data"));

function showCategories() {
  CATEGORIES.forEach((cat) => {
    categoryList.insertAdjacentHTML(
      "afterbegin",
      `<li class="category">
      <button
        id="cat-btn"
        class="btn-cat btn btn-categories"
        style="background-color: ${cat.color}"
      >
        ${cat.name}
      </button>`
    );
  });
  // need this code within showCategories function to be able to select all the categories
  catBtn = document.querySelectorAll("#cat-btn");
  catBtn.forEach((x) => {
    console.log(catBtn.length);
    x.addEventListener("click", function listFilter() {
      // innerHtml added white space on mac added .trim() to fix
      let category = x.innerHTML.toLowerCase().trim();
      if (category === "all") {
        list(data);
      } else {
        let newList = data.filter((i) => i.category == category);
        if (newList.length) {
          ul.innerHTML = "";
          list(newList);
        } else {
          ul.innerHTML = "";
          ul.insertAdjacentHTML(
            "afterbegin",
            `<h2>No Facts Found</h2>
          `
          );
        }
      }
    });
  });
}

showCategories();

//My way of adding elements after fetching data.
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
