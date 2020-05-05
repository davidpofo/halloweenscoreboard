import React, {Component} from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';


class App extends Component {
  state = {
    players: [
      {
        name: "Player 1",
        score: 0,
        id: 1,
        blink: false
      },
      {
        name: "Player 2",
        score: 0,
        id: 2,
        blink: false
      },
      {
        name: "Player 3",
        score: 0,
        id: 3,
        blink: false
      },
      {
        name: "Player 4",
        score: 0,
        id: 4,
        blink: false
      },
    ]
  };

  //player id counter
  prevPlayerId = 4;

  getHighScore = () => {
  const scores = this.state.players.map( p => p.score );
  const highScore = Math.max(...scores);

  if (highScore) {
    return highScore;
  }
  return null;
};
  getSortedScores = () => {
  const scores = this.state.players.map( p => p.score );
  const sortedscores = scores.sort(function(a, b){return b.score-a.score})

  if (sortedscores) {
    return sortedscores;
  }
  return null;
};
  getBlinks = () => {
    const blinks = this.state.players.map( p => p.blink );
    if (blinks) {
      return blinks;
    }
    return false;
  };
  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
      score: prevState.players[index].score += delta,
      blink: !prevState.players[index].blink
    }) );
   };
  handleAddPlayer = (name) => {
    this.setState(prevState => {
      return {
        players:[
          ...prevState.players,
        {
          name,
          score: 0,
          id: this.prevPlayerId += 1,
          blink: false

        }
      ]}

    })
  };
  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  };

  render() {
    const blinks = this.getBlinks();
    const highScore = this.getHighScore();
    const sortedScores = this.getSortedScores();
    const secondThirdScore = sortedScores.slice(1,3);
    return (
      <div className="scoreboard">
        <Header players={this.state.players}/>

        {/* Players list */}
        {this.state.players.sort(function(a, b){return b.score-a.score}).sort(function(a, b){return b.name-a.name}).map( (player, index) =>
          <Player
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()}
            index={index}
            changeScore={this.handleScoreChange}
            blink={player.blink}
            removePlayer={this.handleRemovePlayer}
            isHighScore={highScore === player.score}  // is a player's 'score' prop equal to the high score?
            isSecondHigh = {secondThirdScore[0] === player.score}
            isThirdHigh = {secondThirdScore[1] === player.score}
          />
        )}
        <AddPlayerForm addPlayer={this.handleAddPlayer}/>

      </div>

    )
  }
}

export default App;
