import { nanoid } from 'nanoid';
import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes-app-data')));

  const [searchText, setSearchText] = useState('');
  const [darkMode,setDarkMode] = useState(JSON.parse(localStorage.getItem('notes-app-dark-mode')));

  useEffect(() => {
    localStorage.setItem(
      'notes-app-data',
      JSON.stringify(notes)
    );
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(
      'notes-app-dark-mode',
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
    <div className="container">
      <Header handleToggleDarkMode={setDarkMode}/>
      <Search handleSearchNote={setSearchText}/>
      <NotesList 
        notes={notes.filter((note) => 
          note.text.toLowerCase().includes(searchText)
        )}
        handleAddNote={addNote} 
        handleDeleteNote={deleteNote}
      />
    </div>
    </div>
  )
}

export default App;