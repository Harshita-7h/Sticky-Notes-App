import './App.css';
import { NoteList } from './Components/NoteList';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { MdSearch } from 'react-icons/md';


function App() {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString());
    }, 86400000); // Update once every 24 hours (in milliseconds)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "Many oranges are actually green.",
      date: currentDate
    },
    {
      id: nanoid(),
      text: "There are now giant pigs as heavy as polar bears.",
      date: currentDate
    }
  ]);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
      // class: "notesApp",
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((notes) => notes.id !== id);
    setNotes(newNotes);
  }



  return (
    <div className="mode">
      <div className="container">

        {/*  Header  */}
        <div className="Header" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <h1>Harshita's Mini Sticky Notes App</h1>
        </div>
        {/* End of Header */}

        {/*  Search  */}
        <div className="Search">
          <MdSearch className='searchIcon' size='1.3em' />
          <input
            type="text"
            placeholder="Search Here"
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        {/*  End of Search  */}

        <NoteList notes={notes.filter((note) =>
          note.text.toLowerCase().includes(searchText))}

          handleAddNote={addNote}
          handleDeleteNote={deleteNote} />
      </div>
    </div>
  );
}

export default App;