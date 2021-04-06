"use strict";
class Note {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.date = new Date();
    this.initRenderNote();
  }
  renderNote() {
    const noteBox = document.querySelector(".note-box");
    let content = `
      <div class='left-side'>
      <h2>${this.title}</h2>
      <p>by Mati ${this.date}</p>
      </div>
       <div class='right-side'>
       <h4>${this.description}</h4>
       </div>
      `;
    noteBox.innerHTML = content;
  }
  initRenderNote() {
    const notesList = document.querySelectorAll(".notes-list-item");
    const notesListChildren = document.querySelector(".notes-list");

    console.log(notesListChildren.childNodes[0]);
  }
}

class Notes {
  notes = [];
  constructor() {
    this.readFromLocalStorage();
    this.initCreateNewNote();
    this.initRenderSingleNoteOnList();
  }
  saveNotesInLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }
  readFromLocalStorage() {
    this.notes = [];
    const localStringNotes = localStorage.getItem("notes");
    if (localStringNotes) {
      const notesShapes = JSON.parse(localStorage.getItem("notes"));
      notesShapes.forEach((noteShape) => {
        const note = new Note(noteShape.title, noteShape.description);
        this.notes.push(note);
      });
    }
  }
  createNewNote() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    if (!title) {
      alert("Enter a title!");
      return;
    }
    if (!description) {
      alert("Enter a description!");
      return;
    }
    const note = new Note(title, description);
    this.notes.push(note);
    this.saveNotesInLocalStorage();
    this.renderSingleNoteOnList(note);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  }
  initCreateNewNote() {
    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click", () => {
      this.createNewNote();
    });
  }
  renderSingleNoteOnList(note) {
    const singleNoteBox = document.createElement("li");
    const notesList = document.querySelector(".notes-list");
    singleNoteBox.classList.add("notes-list-item");

    let content = `
      <button class="note-btn">
      <p>Note</p>
      <span class='delete-btn'></span>
      </button>
      `;
    singleNoteBox.innerHTML = content;
    notesList.appendChild(singleNoteBox);
  }
  initRenderSingleNoteOnList() {
    const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"));
    if (notesFromLocalStorage.length > 0) {
      notesFromLocalStorage.forEach((note) => {
        this.renderSingleNoteOnList(note);
      });
    }
  }
}

const notes = new Notes();
