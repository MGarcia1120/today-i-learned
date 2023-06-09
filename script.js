import { facts } from "./api.js";
import { createFact } from "./api.js";
import { getFacts } from "./api.js";
import { updateVote } from "./api.js";

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
const maxNumOfChars = 200;
let ul = document.getElementById("list");

charCount.innerHTML = maxNumOfChars;

btnOpen.addEventListener("click", function () {
  if (formSection.hasAttribute("hidden")) {
    formSection.removeAttribute("hidden");
    btnOpen.innerHTML = "close";
  } else {
    formSection.setAttribute("hidden", "");
    btnOpen.innerHTML = "share a fact";
  }
});

const submitForm = (event) => {
  event.preventDefault();
  alert("Added a new Fact!");

  let text = document.querySelector("#text");
  let source = document.querySelector("#source");
  let category = document.querySelector("#category");

  let obj = {
    text: text.value,
    source: source.value,
    category: category.value,
  };

  createFact(obj);

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

// data = JSON.parse(localStorage.getItem("data"));

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
    x.addEventListener("click", function listFilter() {
      // innerHtml added white space on mac added .trim() to fix
      let category = x.innerHTML.toLowerCase().trim();
      console.log(category);
      let newList = facts.filter((i) => i.category == category);
      if (!newList.length && category !== "all") {
        ul.innerHTML = "";
        ul.insertAdjacentHTML(
          "afterbegin",
          `<h2>No Facts Found</h2>
          `
        );
      } else if (category === "all") {
        ul.innerHTML = "";
        getFacts();
      } else {
        ul.innerHTML = "";
        list(newList);
      }
    });
  });
}

showCategories();

//My way of adding elements after fetching data.
function list(facts) {
  facts.forEach((i) => {
    let category = CATEGORIES.find((x) => x.name === i.category);
    let id = i.id;

    ul.insertAdjacentHTML(
      "afterbegin",
      `<li class="fact">
    <p class="letter">${i.text}<a class="source"
    href="
    ${i.source}"
    target="_blank">(Source)</a></p>
    <span class="tag" style="background-color:${category.color}" >${i.category}</span>
    <div class="btn-group">
    <button class="voteInteresting">👍 ${i.voteInteresting}</button>
    <button class="voteMindBlowing">🤯 ${i.voteMindBlowing}</button>
    <button class="voteFalse">⛔ ${i.voteFalse}</button>
    </div>
  </li>`
    );

    let voteBtn1 = document.querySelector(".voteInteresting");
    let voteBtn2 = document.querySelector(".voteMindBlowing");
    let voteBtn3 = document.querySelector(".voteFalse");

    let obj = {};

    voteBtn1.addEventListener("click", () => {
      let count;
      count = Number(voteBtn1.innerHTML.replace("👍", "")) + 1;
      console.log(count);
      obj[`voteInteresting`] = count;
      updateVote(id, obj);
      voteBtn1.innerHTML = `👍 ${count}`;
    });

    voteBtn2.addEventListener("click", () => {
      let count;
      count = Number(voteBtn2.innerHTML.replace("🤯", "")) + 1;
      obj[`voteMindBlowing`] = count;
      updateVote(id, obj);
      voteBtn2.innerHTML = `🤯 ${count}`;
      console.log(count);
    });

    voteBtn3.addEventListener("click", () => {
      let count;
      count = Number(voteBtn3.innerHTML.replace("⛔", "")) + 1;
      obj[`voteFalse`] = count;
      updateVote(id, obj);
      voteBtn3.innerHTML = `⛔ ${count}`;
      console.log(count);
    });
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
