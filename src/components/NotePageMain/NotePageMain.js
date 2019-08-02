import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NotefulContext from '../../NotefulContext';
import { findNote } from '../../notes-helpers'
import propTypes from 'prop-types'

export default class NotePageMain extends React.Component {
  static contextType = NotefulContext;
  render() {
    const note = findNote(this.context.notes, this.props.match.params.noteId)
    if (!note) {
      return <div>Loading..</div>
    }

    return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.title}
        modified={note.date_modified}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

NotePageMain.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      noteId: propTypes.string
    })
  })
}

