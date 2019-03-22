import React from 'react';

export default class NoteForm extends React.PureComponent {
  state = {
    title: '',
    body: ''
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { title, body } = this.state;
    return (
      <form onSubmit={this.props.handleSubmit.bind(null, title, body)}>
        <input type="text" name="title" value={title} onChange={this.handleChange}/>
        <br/>
        <textarea name="body" value={body} onChange={this.handleChange}/>
        <br/>
        <button>Create Note</button>
      </form>
    )
  }
}
