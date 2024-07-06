document.addEventListener('DOMContentLoaded', function() {
    const notesTextarea = document.getElementById('notes');

    // Load notes from local storage
    notesTextarea.value = localStorage.getItem('notes') || '';

    // Save notes to local storage
    notesTextarea.addEventListener('input', function() {
        localStorage.setItem('notes', notesTextarea.value);
    });
});
