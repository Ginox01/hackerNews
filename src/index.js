import "./css/style.css";
import "./css/loader-style.css";
import { endLoader } from "./js/loader.js";
import "./css/waiting_page.css"

// START CODE FOR MOVING THE PAGE++++++++++
let numPage = 0;
let displayNewsForPage = 5;
let pageCreateFromTheUser = 0;

const pages = document.getElementById("pages");
const loadPage = document.getElementById("wrap-load-page")
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
  try {
    const response = await fetch(allTheNewsURL);
    const data = await response.json();

    data.forEach((id) => {
      allTheIDOfTheStories.push(id);
    });
    displayFirstNews();
  } catch {
    displayErrorMessage();
    pages.style.display = "none"
  }
}

async function displayFirstNews() {
  const divTitle = document.createElement("div");
  const divUrl = document.createElement("div");
  const divData = document.createElement("div");

  setTheAttributeOfFatherElements(divTitle, divUrl, divData);

  try {
    for (start; start < limit; start++) {
      const response = await fetch(
        baseURL + `item/${allTheIDOfTheStories[start]}.json`
      );
      const data = await response.json();

      const title = document.createElement("p");
      title.innerHTML = data.title;
      divTitle.appendChild(title);

      const subLinkUrl = document.createElement("div");
      subLinkUrl.setAttribute("class", "sub-url");

      const linkUrl = document.createElement("a");
      setTheAElement(linkUrl, data);

      subLinkUrl.appendChild(linkUrl);
      divUrl.appendChild(subLinkUrl);

      let time = new Date(data.time * 1000);
      time =
        time.toDateString() +
        "//Time :" +
        time.getHours(time) +
        ":" +
        time.getMinutes(time);
      const timeText = document.createElement("p");
      timeText.innerHTML = time;
      divData.appendChild(timeText);
    }
    document
      .querySelectorAll("#pages > div")[0]
      .append(divTitle, divUrl, divData);
    limit += 5;
  } catch {
    pages.style.display = "none";
    displayErrorMessage();
  }
}

btnLoad.addEventListener("click", async function displayOtherNews() {
  const newPage = document.createElement("div");
  newPage.setAttribute("class", "page");
  newPage.setAttribute("id", `${Date.now()}`);

  const wrapperPages = document.getElementById("pages");
  wrapperPages.appendChild(newPage);

  pageCreateFromTheUser++;

  const divTitle = document.createElement("div");
  const divUrl = document.createElement("div");
  const divData = document.createElement("div");

  setTheAttributeOfFatherElements(divTitle, divUrl, divData);
  inLoadPage()

  try {
    for (start; start < limit; start++) {
      const response = await fetch(
        baseURL + `item/${allTheIDOfTheStories[start]}.json`
      );
      const data = await response.json();
  
      const title = document.createElement("p");
      title.innerHTML = data.title;
      divTitle.appendChild(title);
  
      const subLinkUrl = document.createElement("div");
      subLinkUrl.setAttribute("class", "sub-url");
  
      const linkUrl = document.createElement("a");
      setTheAElement(linkUrl, data);
  
      subLinkUrl.appendChild(linkUrl);
      divUrl.appendChild(subLinkUrl);
  
      let time = new Date(data.time * 1000);
      time =
        time.toDateString() +
        "//Time :" +
        time.getHours(time) +
        ":" +
        time.getMinutes(time);
      const timeText = document.createElement("p");
      timeText.innerHTML = time;
      divData.appendChild(timeText);
  
      newPage.append(divTitle, divUrl, divData);
    }
    wrapperPages.appendChild(newPage);
  
    limit += 5;
  
    moveThePage(++numPage);
    displayBtns();
  }catch {
    displayErrorMessage();
    pages.style.display = "none"
  }

  
});

//IT SET THE ATTRIBUTES OF THE FATHER ELEMENTS
function setTheAttributeOfFatherElements(divTitle, divUrl, divData) {
  divTitle.setAttribute("class", "title-wrap");
  divUrl.setAttribute("class", "url-wrap");
  divData.setAttribute("class", "data-wrap");
}

//IT SET THE ATTRIBUTES OF <A> ELEMENT
async function setTheAElement(a, data) {
  a.setAttribute("href", data.url);
  a.setAttribute("class", "btn-url");
  a.textContent = "Go to page!";
}

function displayErrorMessage() {
  document.getElementById("error-page").style.display = "flex";
}


function inLoadPage(){
  loadPage.style.display = "flex"
  setTimeout(()=>{
    loadPage.style.display = "none"
  },1500)
}