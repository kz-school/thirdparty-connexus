
// Assuming the existing script is loaded before this code
// ==UserScript==
// @name        Connexus Note-Taking Plugin
// @namespace   http://tampermonkey.net/
// @version     1.6
// @description Adds a note-taking feature to the Connexus lesson viewer
// @author      Google Gemini & Kilgorezer
// @match       https://www.connexus.com/content/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=connexus.com
// @grant        none
// ==/UserScript==

// config
var allowedOnIsResponsive = true; // set to false if you do not want to load on responsive viewer
var allowedOnUnResponsive = true; // set to false if you do not want to load on old viewer, it is recommended to set this to false

// ignore this, this is just semi-obfuscated text
var are=location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx'?allowedOnIsResponsive:false;var aun=location.pathname=='/content/chrome/online/lessonViewer_responsive.aspx'?false:allowedOnUnResponsive;if(are||aun){if(!window.tpitems){window.tpitems=[];}window.tpitems[window.tpitems.length]={

// more config
 name: "Connexus Note-Taking Plugin" // This is your plugin name.
,onclick: function(studentname, connexus) {
  // Create a new note-taking container
  const noteContainer = document.createElement('div');
  noteContainer.id = 'connexus-note-container';
  noteContainer.style.position = 'fixed';
  noteContainer.style.top = '10px';
  noteContainer.style.right = '10px';
  noteContainer.style.backgroundColor = 'white';
  noteContainer.style.border = '1px solid #ccc';
  noteContainer.style.padding = '10px';
  noteContainer.style.zIndex = '9999';
  noteContainer.style.display = 'none';

  // Create a textarea for note input
  const noteTextarea = document.createElement('textarea');
  noteTextarea.id = 'connexus-note-textarea';
  noteTextarea.style.width = '300px';
  noteTextarea.style.height = '200px';

  // Create a "Save" button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', saveNote);

  // Append elements to the container
  noteContainer.appendChild(noteTextarea);
  noteContainer.appendChild(saveButton);

  // Add the container to the document body
  document.body.appendChild(noteContainer);

  // Function to save the note to localStorage
  function saveNote() {
    const noteText = noteTextarea.value;
    localStorage.setItem('connexusNote', noteText);
    alert('Note saved!');
  }

  // Load any previously saved notes
  const savedNote = localStorage.getItem('connexusNote');
  if (savedNote) {
    noteTextarea.value = savedNote;
    noteContainer.style.display = 'block';
  }

  // Add a button to toggle the note-taking container
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Notes';
  toggleButton.style.position = 'fixed';
  toggleButton.style.top = '10px';
  toggleButton.style.left = '10px';
  toggleButton.style.backgroundColor = 'blue';
  toggleButton.style.color = 'white';
  toggleButton.style.padding = '10px';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.addEventListener('click', () => {
    noteContainer.style.display = noteContainer.style.display === 'block' ? 'none' : 'block';
  });
  document.body.appendChild(toggleButton);
}

// ignore this too, this is closing tags for the semi-obfuscated text
};}
