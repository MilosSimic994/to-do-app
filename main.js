const list = document.querySelector(".list ul");
const newToDo = document.getElementById("new-input");
const form = document.querySelector(".new-todo");
const clear = document.querySelector(".clear");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const all = document.getElementById("all");
const changeTheme = document.getElementById("change");

const todos = [];

//update list
function updataDOM() {
  if (newToDo.value.trim() !== "") {
    const element = document.createElement("li");
    element.dataset.id = Math.random() * 100;

    element.innerHTML = `
            <div class="o"></div> 
            ${newToDo.value}
            <img class="del" src="/images/icon-cross.svg">
            `;

    const del = element.querySelector(".del");
    const check = element.querySelector(".o");
    //show delete btn
    element.addEventListener("mouseover", () => {
      del.classList.add("showCross");
    });
    element.addEventListener("mouseout", () => {
      del.classList.remove("showCross");
    });
    //delete item from list
    del.addEventListener("click", deleteItem);
    //mark completed
    check.addEventListener("click", checkCompleted);

    list.appendChild(element);
    //clear input
    newToDo.value = "";
  }

  showItemLeft();
}
//show how many item left
function showItemLeft() {
  const items = document.querySelectorAll(".list ul li");
  const leftItem = (document.querySelector(
    ".list h5"
  ).innerHTML = `${items.length} items left`);
}
//check completed
function checkCompleted(e) {
  const element = e.target.parentElement;
  if (
    element.dataset.completed !== "completed" &&
    form.classList.contains("light-theme")
  ) {
    element.dataset.completed = "completed";
    e.target.classList.toggle("check");
    element.classList.toggle("light-decoration");
  } else if (
    element.dataset.completed !== "completed" &&
    !form.classList.contains("light-theme")
  ) {
    element.dataset.completed = "completed";
    e.target.classList.toggle("check");
    element.classList.toggle("decoration");
  } else if (element.dataset.completed === "completed") {
    element.dataset.completed = "";
    e.target.classList.toggle("check");
    element.classList.remove("decoration");
    element.classList.remove("light-decoration");
  }
}
// delete item
function deleteItem(e) {
  const element = e.target.parentElement;
  element.remove();
  showItemLeft();
}
//show active

function showActiveItems() {
  const items = document.querySelectorAll(".list ul li");
  items.forEach((item) => {
    if (item.dataset.completed === "completed") {
      item.style.display = "none";
    } else if (item.dataset.completed !== "completed") {
      item.style.display = "block";
    }
  });
  active.classList.add("active");
  all.classList.remove("active");
  completed.classList.remove("active");
}
//show completed
function showCompletedItems() {
  const items = document.querySelectorAll(".list ul li");
  items.forEach((item) => {
    if (item.dataset.completed !== "completed") {
      item.style.display = "none";
    } else if (item.dataset.completed === "completed") {
      item.style.display = "block";
    }
  });
  completed.classList.add("active");
  all.classList.remove("active");
  active.classList.remove("active");
}
//show all items
function showAllItems() {
  const items = document.querySelectorAll(".list ul li");
  items.forEach((item) => {
    item.style.display = "block";
  });

  all.classList.add("active");
  completed.classList.remove("active");
  active.classList.remove("active");
}

//updateDOM
form.addEventListener("submit", (e) => {
  e.preventDefault();
  updataDOM();
});
//clear all complited
clear.addEventListener("click", () => {
  const items = document.querySelectorAll(".list ul li");
  items.forEach((item) => {
    if (item.dataset.completed === "completed") {
      item.remove();
    }
  });
  console.log(items);
  showItemLeft();
});

// /light theme
changeTheme.addEventListener("click", () => {
  const main = document.querySelector("main");
  const listContainer = document.querySelector(".list");
  const listLi = listContainer.querySelectorAll("ul li");
  const nav = main.querySelector(".container nav");
  const navUl = nav.querySelector("ul");

  main.classList.toggle("main-light");
  listContainer.classList.toggle("light-theme");
  nav.classList.toggle("light-theme");
  form.classList.toggle("light-theme");
  newToDo.classList.toggle("light-theme");
  navUl.classList.toggle("light-theme");

  //styleing completed item
  listLi.forEach((item) => {
    if (
      item &&
      item.dataset.completed === "completed" &&
      listContainer.classList.contains("light-theme")
    ) {
      item.classList.add("light-decoration");
    } else if (
      item &&
      item.dataset.completed === "completed" &&
      !listContainer.classList.contains("light-theme")
    ) {
      item.classList.remove("light-decoration");
      item.classList.add("decoration");
    } else {
      item.classList.remove("ligh-decoration");
      item.classList.remove("decoration");
    }
  });
  //change switch icon
  if (main.classList.contains("main-light")) {
    changeTheme.src = "/images/icon-moon.svg";
    nav.style.color = "hsl(234, 39%, 85%)";
  } else {
    changeTheme.src = "/images/icon-sun.svg";
  }
});

active.addEventListener("click", showActiveItems);
completed.addEventListener("click", showCompletedItems);
all.addEventListener("click", showAllItems);

//check-completed treba resiti napraviti bolje if uslove
