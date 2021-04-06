"use strict";
class Note {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.date = new Date();
  }
  renderNote() {
    const noteBox = document.querySelector(".note-box");
    // Animatioooones
    setTimeout(
      () => {
        let content = `
      <div class='left-side'>
      <textarea  class='title' >${this.title}</textarea>
      <p>by Mati ${this.date}</p>
      </div>
       <div class='right-side'>
       <textarea class='description'>${this.description}</textarea>
       </div>
      `;
        noteBox.classList.add("note-box--active");
        noteBox.innerHTML = content;
      },
      noteBox.classList.contains("note-box--active") ? 500 : 0
    );
    noteBox.classList.remove("note-box--active");
  }
}

class Notes {
  notes = [];
  constructor() {
    this.readFromLocalStorage();
    this.initCreateNewNote();
    this.initRenderSingleNoteOnList();
    this.initDeleteNote();
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
    note.renderNote();
    this.initDeleteNote();

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

    let content = `
      <button class="note-btn">
      <p>Note</p>
      <span class='delete-btn'><img src="assets/close.svg"></span>
      </button>
      `;
    singleNoteBox.innerHTML = content;
    notesList.appendChild(singleNoteBox);
    singleNoteBox.classList.add("notes-list-item");
    singleNoteBox.addEventListener("click", () => {
      note.renderNote();
    });
  }
  initRenderSingleNoteOnList() {
    this.notes.forEach((note) => {
      this.renderSingleNoteOnList(note);
    });
  }
  deleteNote(index) {
    this.notes = [...this.notes.filter((_, i) => i != index)];
    this.saveNotesInLocalStorage();
    this.readFromLocalStorage();
    location.reload();
  }

  initDeleteNote() {
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.deleteNote(index);
      });
    });
  }
}

const notes = new Notes();
