import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../components/NoteListNav/NoteListNav";
import NotePageNav from "../components/NotePageNav/NotePageNav";
import NoteListMain from "../components/NoteListMain/NoteListMain";
import NotePageMain from "../components/NotePageMain/NotePageMain";
import NotefulContext from "../NotefulContext";
import NoteAddForm  from '../components/NotefulForm/NoteAddForm';
import NotefulError from '../NotefulError';
import AddFolder from '../components/AddFolder/addFolder'
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: false,
    errorMessage: ''
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);

    this.setState({
      notes: newNotes
    });
  };
  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }
  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/folders')
        .then(res=> res.json())
        .then(folders => this.setState({
            folders: folders
        }))

        fetch('http://localhost:8000/api/notes')
        .then(res=> res.json())
        .then(notes => this.setState({
            notes: notes
        }))
  }

  renderNavRoutes() {
    return (
      <>
        {["/", "/folders/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={NoteAddForm} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  render() {
    if (this.state.error) { 
      return ( 
      <>
      <header className="App_header">
      <h1>
        <Link to="/">Noteful</Link>{" "}
        <FontAwesomeIcon icon="check-double" />
      </h1>
      </header>
      <div>{this.state.errorMessage}</div>
      </>
      )
    }
    return (
      <NotefulContext.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote: this.deleteNote,
          addNote: this.addNote, 
          addFolder: this.addFolder
        }}
      >
        <div className="App">
        <NotefulError>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
        </NotefulError>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
        <NotefulError>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </NotefulError>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
