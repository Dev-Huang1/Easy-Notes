document.addEventListener('DOMContentLoaded', function() {
    const saveNoteBtn = document.getElementById('save-note-btn');
    const noteContent = document.getElementById('note-content');
    const noteAttachment = document.getElementById('note-attachment');

    // Save note button click event
    saveNoteBtn.addEventListener('click', function() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const newNote = {
            content: noteContent.value,
            attachments: Array.from(noteAttachment.files).map(file => file.name) // Just saving the file names for simplicity
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        window.location.href = 'index.html';
    });
});
