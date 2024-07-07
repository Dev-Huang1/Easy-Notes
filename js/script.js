document.addEventListener('DOMContentLoaded', (event) => {
    const notesList = document.getElementById('notes');
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteEditor = document.getElementById('note-editor');
    const notesListView = document.getElementById('notes-list');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const noteContent = document.getElementById('note-content');
    const fileInput = document.getElementById('file-input');

    // Load notes from cookies
    function loadNotes() {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            if (name.trim().startsWith('note_')) {
                const note = decodeURIComponent(value);
                const li = document.createElement('li');
                li.innerHTML = note;
                notesList.appendChild(li);
            }
        });
    }

    loadNotes();

    // Show note editor
    addNoteBtn.addEventListener('click', () => {
        notesListView.style.display = 'none';
        noteEditor.style.display = 'block';
    });

    // Save note and go back to notes list
    saveNoteBtn.addEventListener('click', () => {
        const note = noteContent.value;
        const noteHtml = note.replace(/\n/g, '<br>');

        // Save note as a cookie
        const date = new Date();
        date.setTime(date.getTime() + (365*24*60*60*1000)); // 1 year expiration
        const expires = "expires=" + date.toUTCString();
        const noteId = 'note_' + new Date().getTime();
        document.cookie = `${noteId}=${encodeURIComponent(noteHtml)};${expires};path=/`;

        const li = document.createElement('li');
        li.innerHTML = noteHtml;
        notesList.appendChild(li);

        noteContent.value = '';
        noteEditor.style.display = 'none';
        notesListView.style.display = 'block';
    });

    // Handle file uploads
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (file.type.startsWith('image/')) {
                    noteContent.value += `<img src="${e.target.result}" alt="${file.name}">`;
                } else if (file.type.startsWith('video/')) {
                    noteContent.value += `<video controls><source src="${e.target.result}" type="${file.type}"></video>`;
                } else if (file.type.startsWith('audio/')) {
                    noteContent.value += `<audio controls><source src="${e.target.result}" type="${file.type}"></audio>`;
                } else if (file.type === 'application/pdf') {
                    noteContent.value += `<embed src="${e.target.result}" type="application/pdf" width="100%" height="600px">`;
                } else {
                    noteContent.value += `<a href="${e.target.result}" download="${file.name}">${file.name}</a>`;
                }
            };
            reader.readAsDataURL(file);
        });
    });

    // Add file input button functionality
    document.querySelector('#editor-toolbar').addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.innerHTML === 'Upload') {
            fileInput.click();
        }
    });
});
