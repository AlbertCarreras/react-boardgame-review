import React, { Component } from 'react';
import GenreDropdown from './GenreDropdown';

export default class GameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: {
        id: "",
        name: "",
      }
    }
  }

  componentWillReceiveProps(props) {
    // console.log(props);
    if (this.state.genre.id === "") {
      this.setState({
        genre: props.genres[0]
      })
    }
  }

  selectGenre = (event) => {
    const genre = this.props.genres.find(genre => genre.id == event.target.value);
    this.setState({ genre });
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.createGame(this.state);
  }

  render() {
    return (
      <div className="gameform">
        <form className="create" onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Filter board games by name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </label>
          <GenreDropdown
            genres={this.props.genres}
            currentGenre={this.state.genre}
            handleDropdown={this.selectGenre}
          />
          <input type="submit" value="Add Game" />
        </form>
      </div>
    )
  }
}
