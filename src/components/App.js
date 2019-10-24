import React, {Component} from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';


class App extends Component {
  state = {
    players: [
      {
        name: "Team 1",
        score: 0,
        id: 1
      },
      {
        name: "Team 2",
        score: 0,
        id: 2
      },
      {
        name: "Team 3",
        score: 0,
        id: 3
      },
      {
        name: "Team 4",
        score: 0,
        id: 4
      },
    ]
  };

  //player id counter
  prevPlayerId = 4;

  getSortedScores = () => {
  const scores = this.state.players.map( p => p.score );
  const highScore = Math.max(...scores);
  var sortedscores = scores.sort((a,b) => a.timeM - b.timeM);

  if (sortedscores) {
    return sortedscores;
  }
  return null;
};
  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
      score: prevState.players[index].score += delta
    }));
   };

  handleAddPlayer = (name) => {
    this.setState(prevState => {
      return {
        players:[
          ...prevState.players,
        {
          name,
          score: 0,
          id: this.prevPlayerId += 1

        }
      ]}

    })
  }
  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  };

  render() {
    const sortedscores = this.getSortedScores();
    const topthree = sortedscores.slice(0, 3).map(i => {
      return <myview item={i} key={i.id} />
  }

    const highScore = topthree.slice(0, 2);
    const secondScore = topthree.slice(1, 2);
    const thirdScore = topthree.slice(2, 3);;


    return (
      <div className="scoreboard">
        <Header players={this.state.players}/>

        {/* Players list */}
        {this.state.players.map( (player, index) =>
          <Player 
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()}
            index={index}
            changeScore={this.handleScoreChange}
            removePlayer={this.handleRemovePlayer}
            isHighScore={highScore === player.score}  // is a player's 'score' prop equal to the high score?
          />
        )}
        <AddPlayerForm addPlayer={this.handleAddPlayer}/>

      </div>
    )
  }
}

export default App;
