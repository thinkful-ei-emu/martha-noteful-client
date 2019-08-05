import React from 'react'
import NotefulContext from '../../NotefulContext'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import config from '../../config';
import propTypes from 'prop-types'

 export default class Note extends React.Component {
   constructor(){
     super();
     this.state={}
   }
  static contextType = NotefulContext 

  handleDeleteNote(noteId, callback) {
    fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`,{
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res=> { 
      if(!res.ok){
        return res.json().then(error => {
          throw error
        })
      }
    }
    )
    .then(note => {
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
  }


  render(){
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/notes/${this.props.id}`}>
          {this.props.title}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={() => this.handleDeleteNote(this.props.id, this.context.deleteNote)}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.date_modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )}
}

Note.defaultProps = {
  date_modified: '',
  title: '',
  id: ''
}
Note.propTypes = {
  date_modified: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  id: propTypes.number.isRequired
}