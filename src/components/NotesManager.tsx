import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Note {
  id: number;
  text: string;
}

function NotesManager() {
  const [draft, setDraft] = useLocalStorage<string>(
    "note_draft",
    ""
  );

  const [notes, setNotes] = useLocalStorage<Note[]>(
    "saved_notes",
    []
  );

  const [nextId, setNextId] = useState(1);

  function addNote() {
    const text = draft.trim();

    if (!text) {
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      text: text,
    };

    setNotes((prev) => [...prev, newNote]);
    setDraft("");
  }

  function deleteNote(id: number) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  return (
    <div className="notes-manager">
      <h1>Менеджер заметок</h1>

      <section className="draft-section">
        <h2>Черновик</h2>

        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Напишите свою заметку..."
          rows={5}
        />

        <button onClick={addNote}>
          Добавить заметку
        </button>

        <p className="hint">
          Черновик сохраняется автоматически
        </p>
      </section>

      <section className="notes-section">
        <h2>Сохранённые заметки ({notes.length})</h2>

        {notes.length === 0 ? (
          <p className="empty">Пока нет заметок</p>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <div className="note-card" key={note.id}>
                <p>{note.text}</p>

                <button
                  className="delete-button"
                  onClick={() => deleteNote(note.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default NotesManager;