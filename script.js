
// Initialize an array to store the saved notes
let emojis = ["📝", "💭", "📓", "📄", "🗒"];
let savedNotes = [];
let fontIndex = 0;
let fonts = [
  "Arial, sans-serif",
  "Comic Sans MS, cursive, sans-serif",
  "Georgia, serif",
  "Impact, Charcoal, sans-serif",
  "Tahoma, Geneva, sans-serif",
];

function changeFont() {
    let titleWeb = document.querySelector("#titleWeb");
    titleWeb.style.fontFamily = fonts[fontIndex];

    let body = document.querySelector("body");
    let textarea = document.querySelector("textarea");
    body.style.fontFamily = fonts[fontIndex];
    textarea.style.fontFamily = fonts[fontIndex];
    let fontButton = document.querySelector("#font-button");
    fontButton.innerHTML = "Change Font " + (fontIndex + 1);
    
    fontIndex = (fontIndex + 1) % fonts.length;
    
  }

function saveNote() {
    // Get the text from the text area
    let noteText = document.getElementById("note-text").value;
    // Get the current date and time
    let timeStamp = new Date().toLocaleString();
    // Create a new object for the saved note
    let savedNote = {
      text: noteText,
      timeStamp: timeStamp,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };
    // Add the note to the array of saved notes
    savedNotes.push(savedNote);
    // Clear the text area
    document.getElementById("note-text").value = "";
    // Flash the text area as a save indicator
    document.getElementById("note-text").style.animation =
      "flash 0.5s ease-in-out";
    setTimeout(function () {
      document.getElementById("note-text").style.animation = "";
    }, 500);
    // Update the saved notes section
    displayNotes();
  }



function displayNotes() {
  // Get the saved notes container
  let savedContainer = document.getElementById("saved");
  // Clear the container
  savedContainer.innerHTML = "";
  // Loop through the array of saved notes
  for (let i = 0; i < savedNotes.length; i++) {
    // Create a new container for the saved note
    let noteContainer = document.createElement("div");
    noteContainer.classList.add("saved-note");
    // Create an image element for the emoji
    let emoji = document.createElement("span");
    emoji.innerHTML = savedNotes[i].emoji;
    emoji.classList.add("emoji");
    noteContainer.appendChild(emoji);
    // Create a timestamp
    let timeStamp = document.createElement("div");
    timeStamp.classList.add("timestamp");
    timeStamp.innerHTML = savedNotes[i].timeStamp;
    noteContainer.appendChild(timeStamp);
    // Create the text of the note
    let text = document.createElement("div");
    text.innerHTML = savedNotes[i].text;
    noteContainer.appendChild(text);
    // Create the remove button
    let removeBtn = document.createElement("button");
    removeBtn.innerHTML = "❌";
    removeBtn.classList.add("remove-btn");
    // Add the remove button to the note container
    noteContainer.appendChild(removeBtn);
    // Add the note container to the saved notes container
    savedContainer.appendChild(noteContainer);
    // Add an event listener to the remove button
    removeBtn.addEventListener("click", function () {
      // Remove the corresponding saved note from the array
      savedNotes.splice(i, 1);
      // Update the saved notes section
      displayNotes();
    });
  }
}

function generatePDF() {
    let doc = new window.jsPDF();
    let y = 20;
    doc.setFont("Courier");
    doc.setFontSize(15);
    doc.text("SAVED NOTES!", 105, y, 'center');
    y += 20;
    // loop through the saved notes
    savedNotes.forEach(function(note,index) {
        doc.setFont("Courier");
        doc.setFontSize(16);
        doc.text(`${index+1}. `, 15, y);
        doc.text(note.text, 30, y);
        y += 20;
        doc.line(15, y, 195, y);
        y += 10;
    });
    doc.save("saved-notes.pdf");
}











