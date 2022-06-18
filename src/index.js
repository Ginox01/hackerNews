import "./css/style.css";
import "./css/loader-style.css";
import { endLoader } from "./js/loader.js";

// START CODE FOR MOVING THE PAGE++++++++++
let numPage = 0;
let displayNewsForPage = 5;
let pageCreateFromTheUser = 0;

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnLoad = document.getElementById("btn-load");

//THIS SET THE DISPLAY OF THE BTN-NEXT
const replaceBtnPrev = document.getElementById("replace-btn-prev");
const replaceBtnNext = document.getElementById("replace-btn-next");

btnPrev.addEventListener("click", setThedirectionsOfThePageWithClickButton);
btnNext.addEventListener("click", setThedirectionsOfThePageWithClickButton);

function setThedirectionsOfThePageWithClickButton(e) {
  if (e.target.id == "btn-next") {
    moveThePage(++numPage);
    displayBtns(numPage);
  } else {
    moveThePage(--numPage);
    displayBtns(numPage);
  }
}

function moveThePage(currentPage) {
  const allThePages = document.querySelectorAll("#pages > div");
  allThePages[0].style.marginLeft = `-${currentPage * 100}%`;
  numPage = currentPage;
}

//THIS FUNCTION SETS THE DISPLAY OF THE BUTTONS
function displayBtns() {
  if (numPage > 0) {
    btnPrev.style.display = "block";
    replaceBtnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "none";
    replaceBtnPrev.style.display = "block";
  }

  if (pageCreateFromTheUser > numPage) {
    btnNext.style.display = "block";
    replaceBtnNext.style.display = "none";
  } else {
    btnNext.style.display = "none";
    replaceBtnNext.style.display = "block";
  }
  if (
    pageCreateFromTheUser >
    allTheIDOfTheStories.length / displayNewsForPage
  ) {
    btnLoad.style.display = "none";
  } else {
    btnLoad.style.display = "flex";
  }
}

const allTheIDOfTheStories = [];
const baseURL = "https://hacker-news.firebaseio.com/v0/";
const allTheNewsURL = baseURL + "newstories.json";

let start = 0;
let limit = 5;

getTheElementFromAPI();
async function getTheElementFromAPI() {
  const response = await fetch(allTheNewsURL);
  const data = await response.json();

  data.forEach((id) => {
    allTheIDOfTheStories.push(id);
  });
  displayFirstNews();
}

async function displayFirstNews() {
  let divTitle = document.createElement("div");
  divTitle.setAttribute("class", "title-wrap");

  let divUrl = document.createElement("div");
  divUrl.setAttribute("class", "url-wrap");

  let divData = document.createElement("div");
  divData.setAttribute("class", "data-wrap");

  for (start; start < limit; start++) {
    const response = await fetch(
      baseURL + `item/${allTheIDOfTheStories[start]}.json`
    );
    const data = await response.json();

    let title = document.createElement("p");
    title.innerHTML = data.title;
    divTitle.appendChild(title);

    let subLinkUrl = document.createElement("div");
    subLinkUrl.setAttribute("class", "sub-url");
    let linkUrl = document.createElement("a");
    linkUrl.setAttribute("href", data.url);
    linkUrl.setAttribute("class", "btn-url");
    linkUrl.textContent = "Go to page!";
    subLinkUrl.appendChild(linkUrl);
    divUrl.appendChild(subLinkUrl);

    let time = new Date(data.time * 1000);
    time =
      time.toDateString() +
      "//Time :" +
      time.getHours(time) +
      ":" +
      time.getMinutes(time);
    let timeText = document.createElement("p");
    timeText.innerHTML = time;
    divData.appendChild(timeText);
  }
  document
    .querySelectorAll("#pages > div")[0]
    .append(divTitle, divUrl, divData);
  limit += 5;
}

btnLoad.addEventListener("click", async function displayOtherNews() {
  const newPage = document.createElement("div");
  newPage.setAttribute("class", "page");
  newPage.setAttribute("id", `${Date.now()}`);

  const wrapperPages = document.getElementById("pages");
  wrapperPages.appendChild(newPage);

  pageCreateFromTheUser++;

  let divTitle = document.createElement("div");
  divTitle.setAttribute("class", "title-wrap");

  let divUrl = document.createElement("div");
  divUrl.setAttribute("class", "url-wrap");

  let divData = document.createElement("div");
  divData.setAttribute("class", "data-wrap");

  for (start; start < limit; start++) {
    const response = await fetch(
      baseURL + `item/${allTheIDOfTheStories[start]}.json`
    );
    const data = await response.json();

    let title = document.createElement("p");
    title.innerHTML = data.title;
    divTitle.appendChild(title);

    let subLinkUrl = document.createElement("div");
    subLinkUrl.setAttribute("class", "sub-url");
    let linkUrl = document.createElement("a");
    linkUrl.setAttribute("href", data.url);
    linkUrl.setAttribute("class", "btn-url");
    linkUrl.textContent = "Go to page!";
    subLinkUrl.appendChild(linkUrl);
    divUrl.appendChild(subLinkUrl);

    let time = new Date(data.time * 1000);
    time =
      time.toDateString() +
      "//Time :" +
      time.getHours(time) +
      ":" +
      time.getMinutes(time);
    let timeText = document.createElement("p");
    timeText.innerHTML = time;
    divData.appendChild(timeText);

    newPage.append(divTitle, divUrl, divData);
  }
  wrapperPages.appendChild(newPage);
  console.log(allTheIDOfTheStories.length);

  limit += 5;

  moveThePage(++numPage);
  displayBtns();
});
