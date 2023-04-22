export let facts;
import { CATEGORIES } from "./data.js";

export async function getFacts() {
  let url = "https://qhsxmcuoqnyhlmfwwkct.supabase.co/rest/v1/facts";
  try {
    await fetch(url, {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoc3htY3VvcW55aGxtZnd3a2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzk0ODYsImV4cCI6MTk5NjYxNTQ4Nn0.pAC7MMzH0CtvgT63TU1iEE8hEdBvVoSt95RWKFuQyEY",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoc3htY3VvcW55aGxtZnd3a2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzk0ODYsImV4cCI6MTk5NjYxNTQ4Nn0.pAC7MMzH0CtvgT63TU1iEE8hEdBvVoSt95RWKFuQyEY",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        facts = data;
        console.log(facts);
      })
      .then(() => {
        let ul = document.getElementById("list");
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
      });
  } catch (error) {
    console.log(error);
  }
}

export async function createFact(obj) {
  let url = "https://qhsxmcuoqnyhlmfwwkct.supabase.co/rest/v1/facts";

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoc3htY3VvcW55aGxtZnd3a2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzk0ODYsImV4cCI6MTk5NjYxNTQ4Nn0.pAC7MMzH0CtvgT63TU1iEE8hEdBvVoSt95RWKFuQyEY",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoc3htY3VvcW55aGxtZnd3a2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzk0ODYsImV4cCI6MTk5NjYxNTQ4Nn0.pAC7MMzH0CtvgT63TU1iEE8hEdBvVoSt95RWKFuQyEY",
      },
      body: JSON.stringify({
        ...obj,
        voteInteresting: 0,
        voteMindBlowing: 0,
        voteFalse: 0,
      }),
    }).then(() => {
      getFacts();
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateVote(id, obj) {
  let url = `https://qhsxmcuoqnyhlmfwwkct.supabase.co/rest/v1/facts?id=eq.${id}`;

  try {
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoc3htY3VvcW55aGxtZnd3a2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzk0ODYsImV4cCI6MTk5NjYxNTQ4Nn0.pAC7MMzH0CtvgT63TU1iEE8hEdBvVoSt95RWKFuQyEY",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoc3htY3VvcW55aGxtZnd3a2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwMzk0ODYsImV4cCI6MTk5NjYxNTQ4Nn0.pAC7MMzH0CtvgT63TU1iEE8hEdBvVoSt95RWKFuQyEY",
      },
      body: JSON.stringify({ ...obj }),
    });
  } catch (error) {
    console.log(error);
  }
}

getFacts();
