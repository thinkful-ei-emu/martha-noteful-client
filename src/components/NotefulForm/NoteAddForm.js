import React from 'react'
import NotefulContext from '../../NotefulContext'
import cuid from 'cuid'
import ValidationError from '../../ValidationError';

class NoteAddForm extends React.Component {
  state = {
      title : {
      value: '',
        touched: false
      },
      description: '',
      folders: ''
    };

  static contextType = NotefulContext

  updateTitle= (title) => {
    this.setState({
      title: {
        value: title,
        touched: true,
      }
    });
  };

  onDescriptionChange=(e)=>{
    this.setState({
      description: e.target.value
    })
  }
  onFolderSelect=(e)=>{
    this.setState({
      folders: e.target.value
    })
  }
  handleForm=(e)=>{
    e.preventDefault()
    const { title, description, folders } = e.target
    const note = {
      name: title.value,
      content: description.value,
      folderId: folders.value,
      id: cuid(),
      modified: new Date()
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
    .then(data => {
      title.value = ''
      description.value=''
      this.context.addNote(data)
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  validateTitle(){
    const name = this.state.title.value;
    if (name.length === 0 ){
      return 'A title is required'
    }
  }
  
  render(){
    const titleError = this.validateTitle();
    const folderChoice = this.context.folders.map((folder, index) => 
    <>
      <input 
        key={index} 
        name="folders" 
        type="radio" 
        value={folder.id} 
        onChange ={this.onFolderSelect}>
      </input>
    <label>{folder.title}</label><br/></>)

    return (
    <div>
      <form onSubmit = {e => this.handleForm(e)}>
      <h3>Add A Note Form</h3>
      <label>Folder Choice:</label>
        { folderChoice }
      <label htmlFor="title">Title:</label>
      <input 
        placeholder='title' 
        name="title" 
        type="text" 
        onChange={e => this.updateTitle(e.target.value)}>
      </input>
      {this.state.title.touched && (
      <ValidationError message={titleError}/>
      )}
  
      <textarea 
        placeholder='description' 
        name="description" 
        type="text" 
        onChange={this.onDescriptionChange}>
      </textarea><br/>
    
      <button type="submit" disabled={this.validateTitle()}>Add Note</button>
    </form>
  </div>
    );
}}

export default NoteAddForm