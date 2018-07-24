import React, { Component } from 'react';

const NameFilter = (props) => {
  return (
    <div className="filter">
      <form className="search" onSubmit={props.handleSubmit}>
        <label>
          Name Filter:
          <input
            type="text"
            name="name"
            placeholder="Filter board games by name"
            value={props.name}
            onChange={props.handleNameChange}
          />
        </label>
        <input type="submit" value="Filter" />
      </form>
    </div>
  )
}

export default NameFilter;
