import React from 'react'
import propTypes from 'prop-types'

class NotefulError extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error){
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>An Error has Occured, please try again.</h2>
      )
    }
    return this.props.children;
  }
}

NotefulError.propTypes = {
  children: propTypes.object
}

export default NotefulError;