import React from 'react'

const NotefulContext = React.createContext({
  notes : [],
  folders: [],
  deleteNote: ()=>{},
  addNote: ()=>{},
  addFolder: ()=>{}
})

export default NotefulContext