let newNote = document.getElementById("newBtn")
let editor = document.querySelector(".editor")
let message = document.querySelector(".message")
let saveBtn = document.getElementById("saveBtn")

let titleInput = document.getElementById
("titleInput")

let ul = document.getElementById("notesList")
let li = document.querySelector("li");

let delBtn = document.getElementById("delBtn")

newNote.addEventListener("click", function() {
    message.style.display = "none";
    editor.style.display = "flex";
    titleInput.focus();
});

const textarea = document.getElementById("note-textarea");

let notes = [



];

let savedNotes = localStorage.getItem("notes");

if(savedNotes != null) {
    notes = JSON.parse(savedNotes);
    notes.forEach(function(note, index) {
        createNoteElement(note, index);
    });
}

let selectedIndex = null;

titleInput.addEventListener("keydown", function(event) {

    if(event.key === "Enter"){
        textarea.focus();
    }
});

function createNoteElement(note, index) {
    let li = document.createElement("li");
    li.textContent = note.title;

    li.dataset.index = index;

    li.addEventListener("click", function () {

        selectedIndex = Number(li.dataset.index);

        let note = notes[selectedIndex];

        titleInput.value = note.title;
        textarea.value = note.content;

        message.style.display = "none";
        editor.style.display = "flex";
    });

    ul.appendChild(li);
}

saveBtn.addEventListener("click", function() {
    let title = titleInput.value;
    let content = textarea.value;
    
    let note = {
        title,
        content
    };

    if(titleInput.value.trim() === "" && textarea.value.trim() === ""){
        alert("Please enter a title or content.");
        return;
    }

    if (selectedIndex === null) {

    // New note
    notes.push(note);

    createNoteElement(note, notes.length-1);
    

    } else {

    // Update existing note
    notes[selectedIndex] = note;

    const existingLi = document.querySelector(
        `[data-index="${selectedIndex}"]`
    );

    existingLi.textContent = title;
    }

    selectedIndex = null;

    localStorage.setItem("notes", JSON.stringify(notes));

    titleInput.value = "";
    textarea.value = "";

    titleInput.focus();

});

delBtn.addEventListener("click", function() {
    if(selectedIndex === null) {
        alert("Please select notes to be deleted")
        return;
    }

    let answer = confirm("Are you sure you want to delete this note?");

    notes.splice(selectedIndex, 1);

    ul.innerHTML = "";

    notes.forEach(function(note, index) {
       createNoteElement(note, index);
    });

    localStorage.setItem("notes", JSON.stringify(notes));

    selectedIndex = null;

    titleInput.value = "";
    textarea.value = "";
        
    editor.style.display = "none";
    message.style.display = "flex";

});

