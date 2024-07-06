document.addEventListener('DOMContentLoaded', function() {
    const notesContainer = document.getElementById('notes-container');
    const addNoteBtn = document.getElementById('add-note-btn');

    // Load notes from local storage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => addNoteToDOM(note));

    // Add note button click event
    addNoteBtn.addEventListener('click', function() {
        window.location.href = 'write.html';
    });

    // Function to add note to DOM
    function addNoteToDOM(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = note.content;
        notesContainer.appendChild(noteElement);
    }
});
