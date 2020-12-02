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
    // set db ref to gamesList
    const gameListRef = firebase.database().ref('gameList/').limitToFirst(8);
    // const gameListRef = firebase.database().ref('gameList').orderByChild('price');

    // iterate over database where price does not equal 0 
    gameListRef.once('value', snapshot => {
      let usefulGames = [];
      // console.log(snapshot.val());
      snapshot.forEach(childSnapshot => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if (childData.price >= 0) {
          usefulGames.push([childKey, childData]);
        }
      })
      // "games" hold all games that are retrieved from database currently.
      // outputGamesArray only holds the ones that are actually displayed
      this.setState({
        games: usefulGames
      })
      this.setState({
        outputGamesArray: usefulGames.slice(0, 8)
      })
    });
  }

  // functionality for Load More button
  handleShowMoreGames = () => {
    const { games, howManyGames, outputGamesArray } = this.state; // gets current state values
    const addGames = games.slice(howManyGames, howManyGames + 9); // finds the next 9 games
    this.setState({
      outputGamesArray: [...outputGamesArray, ...addGames] // sets the next 9 games
    })
    this.setState({
      howManyGames: howManyGames + 9 // gets ready for the next load
    })
  }

  addToWishlist = (dbKey) => {
    const gameRef = firebase.database().ref('gameList/').child(dbKey);
    gameRef.once('value', snapshot => {
      const dataVal = snapshot.val();
      const onWishlist = dataVal.onWishlist;
      console.log(onWishlist);
      gameRef.update({
        onWishlist: !onWishlist
      })
    })
  }

  render() {
    return (
      <div className="content">
        <div className="gamesOutput">
          {
            this.state.outputGamesArray.map(game => {
              return (
                <Item key={game[1].appid} game={game[1]} dbKey={game[0]} addToWishlist={this.addToWishlist} />
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
