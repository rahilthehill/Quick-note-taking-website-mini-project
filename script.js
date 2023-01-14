// Initialize an array to store the saved notes
let emojis = ["📝", "💭", "📓", "📄", "🗒"];
let savedNotes = [];
let fontIndex = 1;
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

  if (savedNote.text === '') {

    document.getElementById("note-text").style.backgroundColor = "red";
    setTimeout(function(){
       document.getElementById("note-text").style.transition = "background-color 2s ease-in-out";
       document.getElementById("note-text").style.backgroundColor = "white";
    }, 1000);

  } else {
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
  console.log(savedNote.text)

}

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

// function generatePDF() {
//     let doc = new window.jsPDF();
//     let y = 20;
//     doc.setFont("Courier");
//     doc.setFontSize(15);
//     doc.text("SAVED NOTES!", 105, y, 'center');
//     y += 20;
//     // loop through the saved notes
//     savedNotes.forEach(function(note,index) {
//         doc.setFont("Courier");
//         doc.setFontSize(16);
//         doc.text(`${index+1}. `, 15, y);
//         doc.text(note.text, 30, y);
//         y += 20;
//         doc.line(15, y, 195, y);
//         y += 10;
//     });
//     doc.save("saved-notes.pdf");
// }

function generatePDF() {
  let doc = new window.jsPDF();
  let y = 20;
  doc.setFont("Courier");
  doc.setFontSize(15);
  doc.text("SAVED NOTES!", 105, y, "center");
  y += 20;
  // loop through the saved notes
  savedNotes.forEach(function (note, index) {
    // check if y value is getting too large
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("Courier");
    doc.setFontSize(16);
    doc.text(`${index + 1}. `, 15, y);
    doc.text(note.text, 30, y);
    y += 20;
    if (note.timestamp) {
      doc.setFontSize(10);
      doc.text(note.timestamp, 15, y);
      y += 20;
      doc.line(15, y, 195, y);
      y += 10;
    } else {
        doc.setFontSize(10);
      doc.text("Showing Timestamp still Underdevelopment!", 15, y);
      y += 20;
    }
    doc.line(15, y, 195, y);
    y += 10;
  });

  doc.save("saved-notes.pdf");
}
  // Get the development button and overlay elements
  const developmentBtn = document.getElementById("development-btn");
  const developmentOverlay = document.getElementById("development-overlay");

  // Add an event listener to the development button to toggle the overlay
  developmentBtn.addEventListener("click", function() {
    developmentOverlay.classList.toggle("show");
  });

  // Get the close button in the overlay
  const closeOverlayBtn = document.getElementById("close-overlay-btn");

  // Add an event listener to the close button to hide the overlay
  closeOverlayBtn.addEventListener("click", function() {
    developmentOverlay.classList.remove("show");
  });

  const updatesList = document.querySelector('.updates-list');

const updates = [
    { date: 'Jan 14, 2022', version: '1.0', notes: 'Initial release of the website' },
    { date: 'Feb 15, 2022', version: '1.1', notes: 'Added PDF export feature' },
    { date: 'Mar 20, 2022', version: '1.2', notes: 'Improved mobile responsiveness' }
];

const updatesBtn = document.getElementById("updates-btn");
const updatesSection = document.getElementById("updates-section");

function toggleUpdates() {
  if (updatesSection.style.display === "block") {
    updatesSection.style.display = "none";
  } else {
    updatesSection.style.display = "block";
  }
}

updatesBtn.addEventListener("click", toggleUpdates);

let emojiArray = ["📑", "📝", "📓", "📄"];
let currentEmojiIndex = 0;
let iconLink = document.querySelector("link[rel='icon']");

// setInterval(() => {
//     currentEmojiIndex++;
//     if (currentEmojiIndex >= emojiArray.length) {
//         currentEmojiIndex = 0;
//     }
//     iconLink.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>" + emojiArray[currentEmojiIndex] + "</text></svg>";
// }, 2500);


document.addEventListener("keydown", changePerType);

function changePerType() {
    currentEmojiIndex++;
    if (currentEmojiIndex >= emojiArray.length) {
        currentEmojiIndex = 0;
    }
    iconLink.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>" + emojiArray[currentEmojiIndex] + "</text></svg>";
}

document.getElementById("export-pdf-button").addEventListener("mouseover", function(){
    this.classList.add("hover");
  });
  document.getElementById("export-pdf-button").addEventListener("mouseout", function(){
    this.classList.remove("hover");
  });
  
  function reverseNotes() {
    
    var savedNotes = document.getElementsByClassName("saved-note");
    
    savedNotes = [].slice.call(savedNotes); // convert HTMLCollection to Array
    savedNotes.reverse(); // reverse the order of the array
    
    var savedNotesContainer = document.getElementsByClassName("saved-notes")[0];
    
    savedNotes.forEach(function(note) {
      savedNotesContainer.appendChild(note);
    });
    
    }

    $(document).ready(function(){
        $("textarea").val("Enter note here...");
        $("textarea").focus(function(){
            if($(this).val() == "Enter note here..."){
                $(this).val("");
            }
        });
        $("textarea").blur(function(){
            if($(this).val() == ""){
                $(this).val("Enter note here...");
            }
        });
    });
    