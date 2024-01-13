const title = document.querySelector(".input-title");
const note = document.querySelector(".input-note");
const cardmain = document.querySelector(".card-main");
const addbtn = document.querySelector(".add");
const delmain = document.querySelector(".delmain");
const archmain = document.querySelector(".archmain");

let notearr = [];
let deletearr = [];
let archivearr = [];

window.addEventListener("load", (event) => {
  notearr = localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];
  if (notearr.length) {
  }
  deletearr = localStorage.getItem("delete")
    ? JSON.parse(localStorage.getItem("delete"))
    : [];
  archivearr = localStorage.getItem("archive")
    ? JSON.parse(localStorage.getItem("archive"))
    : [];
});

function addelement() {
  if (title.value !== "" && note.value !== "") {
    noteobj = {
      notetitle: title.value,
      notetext: note.value,
    };

    notearr.push(noteobj);

    title.value = "";
    note.value = "";

    localStorage.setItem("notes", JSON.stringify(notearr));
    makecard();
  } else {
    alert("enter the required field");
    return;
  }
}

function del(key) {
  deletearr.push(notearr[key]);
  localStorage.setItem("delete", JSON.stringify(deletearr));
  if (notearr.length === 1) {
    location.reload();
  }

  notearr.splice(key, 1);
  localStorage.setItem("notes", JSON.stringify(notearr));
  makecard();
}

function archive(key) {
  archivearr.push(notearr[key - 100]);
  localStorage.setItem("archive", JSON.stringify(archivearr));
  let m = key;
  const b = document.getElementById(m);
  b.classList.add("removebtn");
  console.log(b);
}

function makecard() {
  let card = "";
  let footer = `
    <footer class="footer">
    <div class="footer-content">
        <p>@copyright <span class="date"> </span> Aakash Sharma</p>
    </div>
</footer> 
    
    `;
  for (let i = 0; i < notearr.length; i++) {

    card += `
        <div class="card ">
                <h3 class="title"><strong>Title : </strong>${
                  notearr[i].notetitle
                }</h3>
                <br>
                <div class="notecontent "><strong>Note : </strong>
                    ${notearr[i].notetext}
                </div>
                <button class='delete' id=${i}  onclick="del(${i}) " >Delete</button>
                <button class='delete' id=${i + 100}  onclick="archive(${
      i + 100
    }) " >Archive</button>
            </div>
        `;
    cardmain.innerHTML = card + footer;
  }
}

// for delete

function showdelete() {
  if (deletearr.length) {
    let dcard = "";
    for (let k = 0; k < deletearr.length; k++) {
      dcard += `
            <div class="card ">
                    <h3 class="title"><strong>Title : </strong>${deletearr[k].notetitle}</h3>
                    <br>
                    <div class="notecontent "><strong>Note : </strong>
                        ${deletearr[k].notetext}
                    </div>
                </div>
            `;
      delmain.innerHTML = dcard;
    }
  }
}

function showarchive() {
  if (archivearr.length) {
    let acard = "";
    for (let sa = 0; sa < archivearr.length; sa++) {
      acard += `
            <div class="card ">
                    <h3 class="title"><strong>Title : </strong>${archivearr[sa].notetitle}</h3>
                    <br>
                    <div class="notecontent "><strong>Note : </strong>
                        ${archivearr[sa].notetext}
                    </div>
                </div>
            `;
      archmain.innerHTML = acard;
    }
  }
}
