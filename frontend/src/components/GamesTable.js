import React from 'react';
import Game from './Game';

const GamesTable = (props) => {
  return (
    <table className="games">
      <tbody>
        <tr>
          <th>
            <h3 className="">Name</h3>
          </th>
          <th>
            <h3 className="">Genre</h3>
          </th>
        </tr>

        {props.games.map(game => <Game key={game.id} name={game.name} genre={game.genre.name} />)}

      </tbody>
    </table>
  )
}

export default GamesTable;
