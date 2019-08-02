import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../../CircleButton/CircleButton";
import NotefulContext from "../../NotefulContext";
import "./NoteListMain.css";
import propTypes from 'prop-types'

export default class NoteListMain extends React.Component {
  static contextType = NotefulContext;
  render() {
    return (
      <section className="NoteListMain">
        <ul>
          {this.props.match.path === "/"
            ? this.context.notes.map(note => (
                <li key={note.id}>
                  <Note
                    id={note.id}
                    name={note.title}
                    modified={note.date_modified}
                  />
                </li>
              ))
            : this.context.notes
                .filter(note => note.folderId === this.props.match.params.folderId)
                .map(note => (
                  <li key={note.id}>
                    <Note
                      id={note.id}
                      name={note.title}
                      modified={note.date_modified}
                    />
                  </li>
                ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}

NoteListMain.propTypes = {
  match: propTypes.shape({
    path: propTypes.string, 
    params: propTypes.shape({
      folderId: propTypes.string
    })
  })
}