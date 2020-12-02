import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Item from '../main/Item';
import firebase from '../../firebase';

class Carts extends Component {
  constructor() {
    super();
    this.state = {
      games: []
    }
  }

  // loop over all games in database and check to see if onWishlist is true
  componentDidMount() {
    // if (this.props.wishlist !== []) {
      
    // }
    // const gameId = "-MNMI5byrhw7-6z6kIk2";
    // const gameId = this.props.wishlist[0];
    const wishlistRef = firebase.database().ref('wishlist');


    wishlistRef.on('value', snapshot => {
      // console.log(snapshot.val());
      const dataObj = snapshot.val();
      const gameList = [];
      for (const gameKey in dataObj) {
        // console.log(dataObj[gameKey]);
        gameList.push(dataObj[gameKey]);
        this.setState({
          games: gameList
        })
      }
    })



    // const gameRef = firebase.database().ref('gameList/' + gameId);

    // gameRef.once('value', snapshot => {
    //   console.log(snapshot.val());
    // })
    // gameRef.once('value', snapshot => {
    //   // console.log(snapshot.val());
    //   const dataVal = snapshot.val();
    //   console.log(dataVal);
    //   // this.setState({
    //   //   data: dataVal
    //   // })
    // })
  }

  render() {
    // console.log(this.props.wishlist);
    return (
      <div>
        {
          this.state.games.map(game => {
            return (
              <div className="game" key={game[0]}>
                <h4>{game[1]}</h4>
                <p>{game[2]}</p>
                <button onClick={() => this.props.removeFromWishlist(game[0])}>Remove</button>
              </div>
            )
          })
        }
        {/* {
          this.props.wishlist[0]
            ? <p>yup works</p>
            : <p>nope doesn't work</p>
        } */}
        {/* {
          this.props.wishlist.map(item => {
            return (
              <p key={item[0]} >{item[0]}</p>
            )
          })
        } */}
        <FontAwesomeIcon icon="list" />
        <FontAwesomeIcon icon="shopping-cart" />
      </div>
    )
  }
}

export default Carts;