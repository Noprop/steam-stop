import './App.css';
import { Component } from 'react';
import firebase from './firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Components
import Header from './components/header/Header';
import Content from './components/main/Content';
import Footer from './components/Footer';

library.add(fab, faHeart, faTimes, faTrash);

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: null,
      wishlist: {}
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    const gameListRef = firebase.database().ref('gameList');
    const wishlistRef = firebase.database().ref('wishlist');

    // load any items on the db wishlist object onto state 
    wishlistRef.once('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState({
          wishlist: data
        })
      }
    })

    const timeNow = Date.now();

    dbRef.once('value', (data) => {
      const firebaseDataObj = data.val();

      if (timeNow > (firebaseDataObj.time + 3000000000)) { // 24 hours is: 84 000 000
        dbRef.update({
          time: timeNow
        })

        // axios request to get most popular games of the last two weeks, on a rolling 24hrs basis
        // if value is modified above, this is currently disabled because api has had issues
        axios({
          method: 'GET',
          url: 'https://cors-anywhere.herokuapp.com/https://steamspy.com/api.php?request=top100in2weeks',
          responseType: 'json'
        }).then(res => { // yes everything is in the .then (the site is not currently using this api but it's fairly straightforward to turn on, as long as the endpoint still works), in the future I would put all of this code somewhere else, possibly in a seperate exclusively js file.
          const dataObject = res.data;
          // this clears the database... be careful! (have had issues with api in past)
          // gameListRef.set({ 
          //   gameList: 0
          // }) 
        
          // giving all games in the database a logo!!
          // I spent about 3 hours trying to find this endpoint... lol. 
          // when I first realized that I didn't have images I thought I was going to have to give up the idea
          gameListRef.once('value', snapshot => {
            const data = snapshot.val();
            for (const dbKey in data) {
              if (!data[dbKey].logo_img) {
                const appId = data[dbKey].appid;
                const gameRef = gameListRef.child(dbKey);

                gameRef.update({
                  "logo_img": `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/logo.png`
                })
              }
            }
          })

          // giving all games in the database a header
          gameListRef.once('value', snapshot => {
            const data = snapshot.val();
            for (const dbKey in data) {
              if (!data[dbKey].header_img) {
                const appId = data[dbKey].appid;
                const gameRef = gameListRef.child(dbKey);

                gameRef.update({
                  "logo_img": `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg`
                })
              }
            }
          })

          // this is to init all games with onWishlist: false
          gameListRef.once('value', snapshot => {
            const data = snapshot.val();
            for (const dbKey in data) {
              // console.log(data[dbKey]);
              if (data[dbKey].onWishlist === undefined) {
                console.log("we're in");
                const gameRef = gameListRef.child(dbKey);
                gameRef.update({
                  "onWishlist": false
                })
              }
            }
          })

          // this is for converting strings into numbers where needed
          // and converting owners string into a number
          gameListRef.once('value', snapshot => {
            const dataObj = snapshot.val();
            for (const dataKey in dataObj) {
              const gameRef = gameListRef.child(dataKey);
              const game = dataObj[dataKey];

              // changes discount value from string to number 
              if (typeof game.discount === 'string') {
                const gameDiscount = parseInt(game.discount);
                gameRef.update({
                  discount: gameDiscount
                })
              }

              // changes price from string to number
              if (typeof game.price === 'string') {
                const gamePrice = parseInt(game.price);
                gameRef.update({
                  price: gamePrice
                })
              }

              // averages owner value and converts to number
              if (typeof game.owners === 'string') {
                const oldOwners = (game.owners).split(" .. ");
                const owners1 = oldOwners[0].replace(/,/g, '');
                const owners2 = oldOwners[1].replace(/,/g, '');
                const newOwners = (parseInt(owners1) + parseInt(owners2)) / 2;

                gameRef.update({
                  owners: newOwners
                })
              }
            }
          }) 

          for (const item in dataObject) {
            gameListRef.push(dataObject[item]);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    })
  }

  addToWishlist = (dbKey, game) => {
    if (this.state.wishlist) { // check state to see if on wishlist
      if (this.state.wishlist[dbKey]) {
        alert('Already on wishlist!');
        return;
      }
    } 
    // find references to update
    const wishlistRef = firebase.database().ref('wishlist');
    const gameRef = firebase.database().ref(`gameList/${dbKey}/onWishlist`);

    const { name, price, logo_img } = game;

    const wishlistObj = {
      [dbKey]: [
        dbKey,
        name,
        price,
        logo_img
      ]
    }
    // update db
    wishlistRef.update(wishlistObj);
    gameRef.update({
      onWishlist: true
    })

    // update state
    const stateWishlist = this.state.wishlist;
    stateWishlist[dbKey] = wishlistObj;
    this.setState({
      wishlist: stateWishlist
    })
  }

  removeFromWishlist = (dbKey) => {
    // get both references and state
    const gameListRef = firebase.database().ref('gameList/' + dbKey);
    const wishlistRef = firebase.database().ref('wishlist/' + dbKey);
    const stateWishlist = this.state.wishlist;
    
    // change, replace, or delete the three locations
    delete stateWishlist[dbKey];
    this.setState({
      wishlist: stateWishlist
    })
    gameListRef.update({
      onWishlist: false
    })
    wishlistRef.set({});
  }

  render() {
    return (
      <div className="App">
        <Header removeFromWishlist={this.removeFromWishlist} /> 
        <Content addToWishlist={this.addToWishlist} />
        <Footer />
      </div>
    );
  }
}

export default App;
