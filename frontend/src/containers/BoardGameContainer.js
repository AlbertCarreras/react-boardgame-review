import React, { Component } from 'react';
import GameFilters from './GameFilters';
import GenreDropdown from '../components/GenreDropdown';
import GamesTable from '../components/GamesTable';
import GameForm from '../components/GameForm';

export default class BoardGameContainer extends Component {
  state = {
    games: [],
    genres: [],
    currentGenre: {
      id: "",
      name: "",
    },
    name: "",
    query: "",
  }

  componentDidMount() {
    this.loadGames();
    fetch(`http://localhost:3000/genres`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          genres: json,
          // currentGenre: json[0],
        })
      });
  }

  loadGames = () => {
    fetch(`http://localhost:3000/boardgames`)
      .then(res => res.json())
      .then(json => {
        this.setState({ games: json })
      });
  }

  genreFilter = (event) => {
    // Option 1: match by name === value
    // const currentGenre = this.state.genres.find(genre => genre.name === event.target.value);
    // Option 2: change value to id in <option> and for controlled value in <select> and match by id === value
    //           Remember: The content of this attribute represents the value to be submitted with the form.
    //                     There's no rule about it having to match the name displayed.
    const currentGenre = this.state.genres.find(genre => genre.id == event.target.value);
    // Option 3: pull id out using index + data attribute, then match on id
    // const id = event.target.options[event.target.selectedIndex].dataset.value;
    // const currentGenre = this.state.genres.find(genre => genre.id == id);
    // Option 4: same as option 3 but use getAttribute
    // const id = event.target.options[event.target.selectedIndex].getAttribute('data-value');
    // const currentGenre = this.state.genres.find(genre => genre.id == id);

    this.setState({ currentGenre });
  }

  filteredGames = () => {
    console.log(!this.state.currentGenre.id);
    let games = this.state.games.filter(game => game.name.toLowerCase().includes(this.state.query.toLowerCase()));

    if (this.state.currentGenre.id) {
      games = games.filter(game => {
        return game.genre.id === this.state.currentGenre.id;
      });
    }

    return games;
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ query: this.state.name })
  }

  createGame = (game) => {
    // event.preventDefault();

    console.log(this.state);
    fetch(`http://localhost:3000/boardgames`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game)
    })
    .then(res => res.json())
    .then(json => {
      // const games = [...this.state.games, json];
      // this.setState({ games });
      this.loadGames();
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="board-game-container">
        <GameFilters
          genres={this.state.genres}
          currentGenre={this.state.currentGenre}
          handleGenreFilter={this.genreFilter}
          name={this.state.name}
          handleNameChange={this.handleNameChange}
          handleSubmit={this.handleSubmit}
        />
        <GameForm
          genres={this.state.genres}
          handleSubmit={this.handleSubmit}
          createGame={this.createGame}
        />
      <GamesTable games={this.filteredGames()} />
      </div>
    )
  }
}
