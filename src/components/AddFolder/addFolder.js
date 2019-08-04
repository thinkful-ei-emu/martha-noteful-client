import React from 'react'
import NotefulContext from '../../NotefulContext'

export default class AddFolder extends React.Component{
  constructor(){
    super();
  this.state={
    title: ''
  }
}
  static contextType = NotefulContext

  onNameChange = (title) => {
    this.setState({
      title: {value: title}
    });
  } 

  handleAddForm = (e) => {
    e.preventDefault()
    const { title } = this.state
    const folder = {
      title: title.value,
    }
    fetch('http://localhost:8000/api/folders', {
      method: 'POST',
      body: JSON.stringify(folder),
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
      this.context.addFolder(data)
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({ error })
    })
  }
  
  render(){
  return (
    <div>
    <form onSubmit={this.handleAddForm}>
    <h4>Add a Folder Form</h4>
      <input placeholder="Folder name" title="title" type="text"  id="title" onChange={e => this.onNameChange(e.target.value)}></input> 
      <button>Submit</button>
    </form>
    </div>
  )}
}
