import { Component } from 'react';
import Item from './Item';
import firebase from '../../firebase';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      outputGamesArray: [], 
      howManyGames: 9
    }
  }

  componentDidMount() {
    const gameListRef = firebase.database().ref('gameList');
    // const gameListRef = firebase.database().ref('gameList/').limitToFirst(10);
    gameListRef.orderByChild('price').on('value', snapshot => {
      let usefulGames = []
      snapshot.forEach((child) => {
        const val = child.val();
        if (val.price !== "0") {
          usefulGames.push(child.val());
        } 
      })
      this.setState({
        games: usefulGames
      })
      this.setState({
        outputGamesArray: usefulGames.slice(0, 9)
      })
      // console.log(this.state);
    });
  }

  handleShowMoreGames = () => {
    const { games, howManyGames, outputGamesArray } = this.state;
    const addGames = games.slice(howManyGames, howManyGames + 9);
    this.setState({
      outputGamesArray: [...outputGamesArray, ...addGames]
    })
    this.setState({
      howManyGames: howManyGames + 9
    })
  }

  render() {
    let gamesArray = [];
    for (let gameId in this.props.games) {
      // console.log(this.props.games[gameId].name);
      gamesArray.push(this.props.games[gameId]);
      
    }
    
    return (
      <div className="content">
        <div className="gamesOutput">
          {
            this.state.outputGamesArray.map(game => {
              return (
                <Item game={game} key={game.appid} />
              )
            })
          }
        </div>
        <button onClick={this.handleShowMoreGames}>Load More</button>
      </div>
    )
  }
}

export default Content;
