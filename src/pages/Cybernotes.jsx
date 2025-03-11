// CyberNotes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CyberNotes.css';

const CyberNotes = () => {
  const sections = ['Android', 'Windows', 'Linux', 'Other Hacks'];
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [noteText, setNoteText] = useState('');
  const [noteFile, setNoteFile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFile, setModalFile] = useState(null);

  // Fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cybernotes');
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleFileChange = (e) => {
    setNoteFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('section', activeSection);
    formData.append('noteText', noteText);
    if (noteFile) {
      formData.append('noteFile', noteFile);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cybernotes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Note saved:', response.data);
      // Reset the form fields after submission
      setNoteText('');
      setNoteFile(null);
      // Refresh the list of notes
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:5000/api/cybernotes', { data: { id } });
      console.log(`Note with id ${id} deleted successfully`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleFileOpen = (fileUrl) => {
    setModalFile(fileUrl);
    setModalOpen(true);
  };

  // Filter notes based on the selected section
  const filteredNotes = notes.filter((note) => note.section === activeSection);

  return (
    <div className="cybernotes-container">
      <header className="cybernotes-header">
        <h1>CyberNotes</h1>
        <nav>
          <ul className="section-tabs">
            {sections.map((section) => (
              <li
                key={section}
                className={activeSection === section ? 'active' : ''}
                onClick={() => handleSectionChange(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="cybernotes-main">
        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-group">
            <label>Note Text:</label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter your note here"
            />
          </div>
          <div className="form-group">
            <label>Attach File/Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit" className="submit-btn">Save Note</button>
        </form>

        <section className="notes-list">
          <h2>{activeSection} Notes</h2>
          {filteredNotes.length === 0 ? (
            <p>No notes found in this section.</p>
          ) : (
            filteredNotes.map((note) => (
              <div className="note-card" key={note.id}>
                <div className="note-header" style={{ position: 'relative' }}>
                  <h3>{note.section}</h3>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(note.id)}
                    style={{
                      color: 'red',
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <p>{note.noteText}</p>
                {note.file && (
                  <div className="note-file">
                    {/\.(jpg|jpeg|png|gif)$/i.test(note.file) ? (
                      // Make the image clickable to open in modal
                      <img
                        src={`http://localhost:5000/uploads/${note.file}`}
                        alt="Uploaded"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleFileOpen(`http://localhost:5000/uploads/${note.file}`)}
                      />
                    ) : (
                      // For non-image files, use a clickable element to open modal
                      <button
                        className="open-file-btn"
                        onClick={() => handleFileOpen(`http://localhost:5000/uploads/${note.file}`)}
                        style={{ cursor: 'pointer', textDecoration: 'underline', background: 'none', border: 'none', padding: 0 }}
                      >
                        Open File
                      </button>
                    )}
                  </div>
                )}
                <p className="timestamp">{new Date(note.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Modal for displaying file content */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="back-btn" onClick={() => setModalOpen(false)} style={{ marginBottom: '1rem' }}>
              Back
            </button>
            {/\.(jpg|jpeg|png|gif)$/i.test(modalFile) ? (
              <img src={modalFile} alt="Modal Content" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
            ) : (
              <iframe src={modalFile} title="File Content" style={{ width: '100%', height: '80vh' }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CyberNotes;
