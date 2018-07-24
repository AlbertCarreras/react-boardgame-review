import React from 'react';
import GenreDropdown from '../components/GenreDropdown';
import NameFilter from '../components/NameFilter';

const GameFilters = (props) => {
  return (
    <div className="filterForm">
      <GenreDropdown
        genres={props.genres}
        currentGenre={props.currentGenre}
        handleDropdown={props.handleGenreFilter}
      />
      <NameFilter
        name={props.name}
        handleNameChange={props.handleNameChange}
        handleSubmit={props.handleSubmit}
      />
    </div>
  )
}

export default GameFilters;
