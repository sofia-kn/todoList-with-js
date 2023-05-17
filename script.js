const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const $ = document;
let iconElem = $.querySelector(".icon");
let popupBox = $.querySelector(".popup-box");
let closeBtn = $.querySelector(".uil-times");
let pElem = $.querySelector(".card-title");
let btnElem = $.querySelector(".card-btn");
let inputElem = $.querySelector('input[class="title"]');
let desc = $.querySelector('textarea[class="description"]');
let wrapper = $.querySelector(".wrapper");
let array = [];
let getTitle = null;
let getDesc = null;
let newNote = null;
let flag = true;
let index = null;
let localNote
let date;
let day;
let month;
let year;

iconElem.addEventListener("click", () => {
  flag = true;
  inputElem.value = "";
  desc.value = "";
  //  console.log('click shod');
  popupBox.classList.add("show");
  AddOrUpdate();
});

closeBtn.addEventListener("click", () => {
  popupBox.classList.remove("show");
});

window.addEventListener("keyup", (e) => {
  // console.log(e.key);
  e.key == "Escape" && popupBox.classList.remove("show");
});

btnElem.addEventListener("click", () => {
  // editDate()
  getValue();
  popupBox.classList.remove("show");
  removeDOM();
  creatDomElem();
});

window.addEventListener("load", () => {
  creatDomElem();
});

function creatDomElem() {
  localNote = localStorage.getItem("Note List")
  console.log(localNote);
  array = JSON.parse(localNote) || [];

  array.map((note, index) => {
    console.log(note)
    wrapper.insertAdjacentHTML(
      "beforeend",
      `
      <li class="note">
          <div class="details">
            <p>${note.title}</p>
            <span>${note.desc}</span>
          </div>
          <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings" onClick='menuShow(this)'>
              <i class="uil uil-ellipsis-h"></i>
              <ul class="menu">
                <li onClick='editBtn(${index})'>
                  <i class="uil uil-pen"></i>Edit
                </li>
                <li onClick = "deleteBtn(${index})">
                  <i class="uil uil-trash"></i>Delete
                </li>
              </ul>
            </div>
          </div>
        </li> 
  
  `
    );
  });
}

function getValue() {
  editDate();
  if (flag) {
    getTitle = inputElem.value;
    getDesc = desc.value;

    newNote = {
      id: array.length + 1,
      title: getTitle,
      desc: getDesc,
      date: `${day} ,${month} ,${year}`,
    };
    array.push(newNote);
  } else {
    array[index].title = inputElem.value;
    array[index].desc = desc.value;
    array[index].date = `${day} ,${months[month]} ,${year}`;
  }

  localStorage.setItem("Note List", JSON.stringify(array));
  // console.log(array);
}

function removeDOM() {
  $.querySelectorAll(".note").forEach((liItem) => liItem.remove());
}

function AddOrUpdate() {
  if (flag) {
    pElem.innerHTML = "Add New Note";
    btnElem.innerHTML = "Add New Note";
  } else {
    pElem.innerHTML = "Update New Note";
    btnElem.innerHTML = "Update New Note";
  }
}

function menuShow(e) {
  e.classList.add("show");
}

function editBtn(indexItem) {
  flag = false;
  popupBox.classList.add("show");
  pElem.innerHTML = "Update New Note";
  btnElem.innerHTML = "Update New Note";
  index = indexItem;
  inputElem.value = array[index].title
  desc.value = array[index].desc 
}

function deleteBtn(indexItem) {
  array.splice(indexItem, 1);
  localStorage.setItem("Note List", JSON.stringify(array));
  removeDOM();
  creatDomElem();
}

function editDate() {
  date = new Date();
  day = date.getDate();
  month = months[date.getMonth()]
  year = date.getFullYear();

  // return {day , month , year}
  // console.log(date);
}








// const months = ["January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"];


// const icon = document.querySelector(".icon")
// const popUp = document.querySelector(".popup-box")
// const closeBtn = document.querySelector(".uil-times")
// const titleInput = document.querySelector("input[class = 'title']")
// const desc = document.querySelector("textarea[class = 'description']")
// const CUBtn = document.querySelector("button")
// const wrapper = document.querySelector(".wrapper")


// let notes = []
// let localNotes;
// let date;
// let day;
// let month;
// let year;

// let newNote
// let noteTitle;
// let noteDesc;
// let noteIndex;
// let duplicateChecker;
// let COU;


// function pusher() {

//     noteTitle = titleInput.value

//     noteDesc = desc.value

//     duplicateChecker = notes.some(idx => {

//         if (idx.title == noteTitle) return true

//     })


//     if (!duplicateChecker) {

//         date = new Date()

//         day = date.getDate()

//         month = date.getMonth()

//         year = date.getFullYear()

//         newNote = { title: noteTitle, description: noteDesc, date: `${day} , ${months[month]} , ${date.getFullYear()}` }

//         notes.push(newNote)

//         localStorage.setItem("NoteList", JSON.stringify(notes))

//     } else alert("has duplicate!")
// }




// function updater() {
//     notes.some(index => {

//         if (notes.indexOf(index) == noteIndex) {

//             index.title = titleInput.value

//             index.description = desc.value

//             localStorage.setItem("NoteList", JSON.stringify(notes))

//         }

//     })
// }



// function DOMAllRemover() {

//     document.querySelectorAll(".note").forEach(elem => elem.remove())

// }




// function Creator() {

//     localNotes = localStorage.getItem("NoteList")

//     notes = JSON.parse(localNotes) || []

//     notes.map((note, index) => {
      

//         wrapper.insertAdjacentHTML("beforeend", `<li class="note">

//         <div class="details">
//             <p>${note.title}</p>
//             <span>${note.description}</span>
//         </div>
//         <div class="bottom-content">
//             <span>${note.date}</span>
//             <div class="settings" onClick="showMenu(this)">
//                 <i class="uil uil-ellipsis-h"></i>
//                 <ul class="menu">
//                     <li onClick = "editFunc(${index})">
//                         <i class="uil uil-pen"></i>Edit
//                     </li>
//                     <li onClick = "deleteFunc(${index})">
//                         <i class="uil uil-trash"></i>Delete
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     </li>`)
//     })


//     titleInput.value = ""

//     desc.value = ""
// }





// function showMenu(e) {

//     e.classList.add("show")

// }


// function editFunc(e) {

//     COU = false

//     popUp.classList.add("show")

//     CUBtn.innerHTML = "Update Note"

//     titleInput.value = notes[e].title

//     desc.value = notes[e].description

//     noteIndex = e

// }




// function deleteFunc(index) {

//     notes.splice(index, 1)

//     localStorage.setItem("NoteList", JSON.stringify(notes))

//     DOMAllRemover()

//     Creator()

// }







// icon.addEventListener("click", () => {

//     COU = true

//     popUp.classList.add("show")

//     CUBtn.innerHTML = "Create Note"

// })


// closeBtn.addEventListener("click", () => {

//     popUp.classList.remove("show")

// })


// CUBtn.addEventListener("click", () => {

//     if (COU) {

//         pusher()

//     } else {

//         updater()

//     }

//     DOMAllRemover()

//     Creator()

//     popUp.classList.remove("show")

// })


// window.addEventListener("load", () => {

//     Creator()

// })


// window.addEventListener("keyup", (e) => {

//     e.key == "Escape" && document.querySelectorAll(".show").forEach(elem => elem.classList.remove("show"))

// })

