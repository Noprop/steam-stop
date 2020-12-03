import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Item from '../main/Item';
import firebase from '../../firebase';

class Carts extends Component {
  constructor() {
    super();
    this.state = {
      display: false,
      games: []
    }
  }

  // check wishlist object on database and add any values to state and then display in render method
  componentDidMount() {
    const wishlistRef = firebase.database().ref('wishlist');

    wishlistRef.on('value', snapshot => {
      // console.log(snapshot.val());
      const dataObj = snapshot.val();
      // console.log(dataObj);
      if (dataObj === null) {
        this.setState({
          games: 0
        })
      }
      const gameList = [];
      for (const gameKey in dataObj) {
        // console.log(dataObj[gameKey]);
        gameList.push(dataObj[gameKey]);
        this.setState({
          games: gameList
        })
      }
    })
  }

  removeFromWishlist = (dbKey) => {
    console.log('remove works', dbKey);
    // might be a more efficient method below
    const gameListRef = firebase.database().ref('gameList/' + dbKey);
    const wishlistRef = firebase.database().ref('wishlist/' + dbKey);
    gameListRef.update({
      onWishlist: false
    })
    wishlistRef.set({});
  }

  displayWishlist = () => {
    this.setState({
      display: !this.state.display
    })
  }

  render() {
    // console.log(this.state);
    return (
      <div className="wishlistContainer">
        <FontAwesomeIcon 
          icon="heart" 
          onClick={() => this.displayWishlist()} 
          className={`${this.state.display ? "hidden" : ""}`}
        />
        <div className={`${this.state.display ? "displayWishlist" : "hidden"}`}>
          <FontAwesomeIcon icon="times" onClick={() => this.displayWishlist()} />
          {
            this.state.games !== 0
              ? this.state.games.map(game => {
                return (
                  <div className="gameContainer">
                    <div className="game" key={game[0]}>
                      <div className="logoContainer">
                        <img src={game[3]} alt={`Logo of ${game[1]}`} />
                      </div>
                      <p>Price: {game[2]}</p>
                      {/* <h4>{game[1]}</h4> */}
                    </div>
                    <FontAwesomeIcon icon="trash" onClick={() => this.removeFromWishlist(game[0])} />
                  </div>
                )
              })
              : null
          }
        </div>
      </div>
    )
  }
}

export default Carts;