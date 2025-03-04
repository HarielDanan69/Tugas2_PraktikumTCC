const apiUrl = "http://localhost:5000/Notes"; 
let editMode = false;
let editId = null;

document.addEventListener("DOMContentLoaded", fetchNotes);

document.getElementById("noteForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const note = {
        
        judul: document.getElementById("judul").value,
        event: document.getElementById("event").value,
        tanggal: document.getElementById("tanggal").value,
        catatan: document.getElementById("catatan").value
    };

    if (editMode) {
        await fetch(`${apiUrl}/${editId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note)
        });
        editMode = false;
        editId = null;
        document.querySelector("button[type='submit']").innerText = "Simpan Catatan";
    } else {
        
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note)
        });
    }

    this.reset();
    fetchNotes();
});

async function fetchNotes() {
    const res = await fetch(apiUrl);
    const notes = await res.json();
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    notes.forEach(note => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${note.id}</td>
            <td>${note.judul}</td>
            <td>${note.event}</td>
            <td>${note.tanggal}</td>
            <td>${note.catatan}</td>
            <td>
                <button class="aksi_list1" onclick="editNote(${note.id}, '${note.judul}', '${note.event}', '${note.tanggal}', '${note.catatan}')">Edit</button>
                <button class="aksi_list2" onclick="deleteNote(${note.id})"><p class="al2">Hapus</p></button>
            </td>
        `;
        noteList.appendChild(row);
    });
}

async function deleteNote(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchNotes();
}

function editNote(id, judul, event, tanggal, catatan) {
    
    document.getElementById("judul").value = judul;
    document.getElementById("event").value = event;
    document.getElementById("tanggal").value = tanggal;
    document.getElementById("catatan").value = catatan;

    editMode = true;
    editId = id;
    document.querySelector("button[type='submit']").innerText = "Perbarui Catatan";

    window.scrollTo({ top: 0, behavior: "smooth" });
}
