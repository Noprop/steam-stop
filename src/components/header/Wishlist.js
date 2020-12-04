import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Item from '../main/Item';
import firebase from '../../firebase';

class Wishlist extends Component {
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
      const dataObj = snapshot.val();
      if (dataObj === null) {
        this.setState({
          games: 0
        })
      }
      const gameList = [];
      for (const gameKey in dataObj) {
        gameList.push(dataObj[gameKey]);
        this.setState({
          games: gameList
        })
      }
    })
  }

  displayWishlist = () => {
    this.setState({
      display: !this.state.display
    })
  }

  render() {
    return (
      <div className="wishlistContainer">
        <FontAwesomeIcon 
          icon="heart" 
          onClick={() => this.displayWishlist()} 
          className={`${this.state.display ? "hidden" : ""}`}
          aria-label="Wishlist"
        />
        <div className={`${this.state.display ? "displayWishlist" : "hidden"}`}>
          <FontAwesomeIcon icon="times" onClick={() => this.displayWishlist()} />
          {
            this.state.games !== 0
              ? this.state.games.map(game => {
                return (
                  <div className="gameContainer" key={game[0]}>
                    <div className="game">
                      <div className="logoContainer">
                        <img src={game[3]} alt={`Logo of ${game[1]}`} />
                      </div>
                      <p>Price: ${game[2] / 100}</p>
                    </div>
                    <FontAwesomeIcon icon="trash" onClick={() => this.props.removeFromWishlist(game[0])} />
                  </div>
                )
              })
              : <h4>Add some games to the wish list!</h4>
          }
        </div>
      </div>
    )
  }
}

export default Wishlist;