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

getFacts();
