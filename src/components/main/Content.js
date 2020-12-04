import { Component } from 'react';
import Search from './Search';
import Item from './Item';
import firebase from '../../firebase';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      outputGamesArray: [], 
      howManyGames: 9,
      filterGames: {}
    }
  }

  componentDidMount() {
    // set db ref to gamesList
    const gameListRef = firebase.database().ref('gameList/');
    this.findGames(gameListRef, false);
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

  handleFilterGames = filter => {
    if (filter.sortBy === "owners") {
      const gameListRef = firebase.database().ref('gameList/').orderByChild('owners');
      this.findGames(gameListRef, filter.freeGames);
    } else if (filter.sortBy === "price") {
      const gameListRef = firebase.database().ref('gameList/').orderByChild('price');
      this.findGames(gameListRef, filter.freeGames);
    }
  }

  findGames = (gameListRef, includeFreeGames) => { 
    gameListRef.once('value', snapshot => {
      let gamesToState = [];
      
      if (includeFreeGames) {
        snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          gamesToState.push([childKey, childData]);   
        })    
      } else {
        snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childData.price > 0) {
            gamesToState.push([childKey, childData]);
          }
        })
      }
      gamesToState.reverse();
      // this.state.games holds all the games that have been retrieved from the database
      // this.state.outputGamesArray only holds the ones that are actually displayed
      this.setState({
        games: gamesToState
      })
      this.setState({
        outputGamesArray: gamesToState.slice(0, 8)
      })
    });
  }

  render() {
    return (
      <main>
        <section className="gamesOutput">
          <Search handleFilterGames={this.handleFilterGames} />
          {
            this.state.outputGamesArray.map(game => {
              return (
                <Item key={game[1].appid} game={game[1]} dbKey={game[0]} addToWishlist={this.props.addToWishlist} />
              ) 
            })
          }
        </section>
        <button className="loadMore" onClick={this.handleShowMoreGames}>Load More</button>
      </main>
    )
  }
}

export default Content;
