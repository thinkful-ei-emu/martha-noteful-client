import React from 'react'
import NotefulContext from '../../NotefulContext'

export default class AddFolder extends React.Component{
  constructor(){
    super();
  this.state={
    name: ''
  }
}
  static contextType = NotefulContext

  onNameChange = (name) => {
    this.setState({
      name: {value: name}
    });
  } 

  handleAddForm = (e) => {
    e.preventDefault()
    const { name } = this.state
    const folder = {
      name: name.value,
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
      name.value = ''
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
      <input placeholder="Folder name" name="name" type="text"  id="name" onChange={e => this.onNameChange(e.target.value)}></input> 
      <button>Submit</button>
    </form>
    </div>
  )}
}
