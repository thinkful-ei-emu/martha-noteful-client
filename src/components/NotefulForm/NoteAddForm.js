import React from 'react'
import NotefulContext from '../../NotefulContext'
import cuid from 'cuid'
import ValidationError from '../../ValidationError';

class NoteAddForm extends React.Component {
  state = {
      title : '',
      content: '',
      folders: ''
    };

  static contextType = NotefulContext

  updateTitle= (e) => {
    this.setState({
      title: e
    });
  };

  onDescriptionChange=(e)=>{
    this.setState({
      content: e.target.value
    })
  }
  onFolderSelect=(e)=>{
    this.setState({
      folders: e.target.value
    })
  }
  handleForm=(e)=>{
    e.preventDefault()
    const { title, content, folders } = this.state
    const note = {
      title: title,
      content: content,
      folder_id: folders,
      id: cuid(),
      date_modified: new Date()
    }
    fetch('http://localhost:8000/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json',
      }})
    .then(res => {
      if(!res.ok){
        return res.json().then(error => {throw error})
      }
      return res.json()
    })
    .then(res => 
      {
      this.title= ''
      this.content=''
      this.context.addNote(res)
      this.props.history.push('/')
    }
    )
    .catch(error => {
      this.setState({ error })
    })
  }

  validateTitle(){
    const title = this.state.title;
    if (title.length === 0 ){
      return 'A title is required'
    }
  }
  
  render(){
    const titleError = this.validateTitle();
    const folderChoice = this.context.folders.map((folder, index) => 
    <div key={index}>
      <input 
        name='folder'
        key={index} 
        title="folders" 
        type="radio" 
        value={folder.id} 
        onChange ={this.onFolderSelect}>
      </input>
      <label>{folder.title}</label><br/>
    </div>)

    return (
    <div>
      <form onSubmit = {this.handleForm}>
      <h3>Add A Note Form</h3>
      <label>Folder Choice:</label>
      <br/>
        { folderChoice }
      <label htmlFor="title">Title:</label>
      <input 
        placeholder='title' 
        title="title" 
        type="text" 
        onChange={e => this.updateTitle(e.target.value)}>
      </input>
      {this.state.title.touched && (
      <ValidationError message={titleError}/>
      )}
      Content:
      <textarea 
        placeholder='content' 
        title="content" 
        type="text" 
        onChange={this.onDescriptionChange}>
      </textarea><br/>
    
      <button type="submit" disabled={this.validateTitle()}>Add Note</button>
    </form>
  </div>
    );
}}

export default NoteAddForm