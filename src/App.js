import './App.css';
import { Component } from 'react';
import firebase from './firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faList, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import Qs from 'qs';

// Components
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/Footer';

library.add(fab, faShoppingCart, faList);

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: null,
      wishlist: []
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    // const wishlistRef = firebase.database().ref('wishlist');
    // const rere = "reeeeee"
    // const test = {
    //   [rere]: "test"
    // }
    // wishlistRef.update(test);


    // dbRef.update({
    //   wishlist: {}
    // })
    // const gameListRef = dbRef.child('gameList/');
    // let test = gameListRef.child("-MNMI5bz8mUYuEkGpSRS");


    // code for converting strings into numbers where needed
    // and converting owners string into a number
    // gameListRef.once('value', snapshot => {
    //   const dataObj = snapshot.val();
    //   for (const dataKey in dataObj) {
    //     // console.log(dataObj[dataKey]);
    //     const gameRef = gameListRef.child(dataKey);
    //     const game = dataObj[dataKey];

    //     // changes discount value from string to number 
    //     if (typeof game.discount === 'string') {
    //       const gameDiscount = parseInt(game.discount);
    //       gameRef.update({
    //         discount: gameDiscount
    //       })
    //     }

    //     // changes price from string to number
    //     if (typeof game.price === 'string') {
    //       const gamePrice = parseInt(game.price);
    //       gameRef.update({
    //         price: gamePrice
    //       })
    //     }

    //     // averages owner value and converts to number
    //     if (typeof game.owners === 'string') {
    //       const oldOwners = (game.owners).split(" .. ");
    //       const owners1 = oldOwners[0].replace(/,/g, '');
    //       const owners2 = oldOwners[1].replace(/,/g, '');
    //       const newOwners = (parseInt(owners1) + parseInt(owners2)) / 2;

    //       gameRef.update({
    //         owners: newOwners
    //       })
    //     }
    //   }
    // }) 
    
    // testing to convert owners string to numbers
    // test.once('value', snapshot => {
    //   const dataTest = snapshot.val();
    //   const oldOwners = (dataTest.owners).split(" .. ");
    //   const owners1 = oldOwners[0].replace(/,/g, '');
    //   const owners2 = oldOwners[1].replace(/,/g, '');
    //   const newOwners = (parseInt(owners1) + parseInt(owners2)) / 2;
    //   console.log(newOwners);

    //   test.update({
    //     owners: newOwners
    //   })
    // })
    
    // testing to add wishlist for one game
    // test.once('value', snapshot => {
    //   const dataTest = snapshot.val();
    //   if(dataTest.onWishlist === undefined) {
    //     test.update({
    //       "onWishlist": false
    //     })
    //   }
    // })
    // testing to add header image for one game
    // test.once('value', snapshot => {
    //   const dataForTest = snapshot.val();
    //   // console.log(dataForTest);
    //   if (!dataForTest.header_img) {
    //     console.log("we're in");
    //     const appId = dataForTest.appid;
    //     axios({
    //       method: 'GET',
    //       url: 'https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails/',
    //       responseType: 'JSON',
    //       params: {
    //         appids: appId
    //       }
    //     }).then(res => {
    //       console.log(res.data[appId].data.header_image);
    //       test.update({
    //         "header_img": res.data[appId].data.header_image
    //       })
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   }
      
    // })
    // this is the code to get all of the header images and put them into the database,
    // only if they don't already have one!
    // gameListRef.once('value', snapshot => {
    //   const data = snapshot.val();
    //   for (const dbKey in data) {
    //     // console.log(data[dbKey]);
    //     if (!data[dbKey].header_img) {
    //       console.log("we're in");
    //       // const appId = data[dbKey].appid;
    //       // const gameRef = gameListRef.child(dbKey);
    //       // axios({
    //       //   method: 'GET',
    //       //   url: 'https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails/',
    //       //   responseType: 'JSON',
    //       //   params: {
    //       //     appids: appId
    //       //   }
    //       // }).then(res => {
    //       //   console.log(res.data[appId].data.header_image);
    //       //   gameRef.update({
    //       //     "header_img": res.data[appId].data.header_image
    //       //   })
    //       // }).catch(err => {
    //       //   console.log(err);
    //       // })
    //     }
    //   }
    // })

    // giving all games in the database a logo!!
    // gameListRef.once('value', snapshot => {
    //   const data = snapshot.val();
    //   for (const dbKey in data) {
    //     // console.log(data[dbKey]);
    //     if (!data[dbKey].logo_img) {
    //       console.log("we're in");
    //       const appId = data[dbKey].appid;
    //       const gameRef = gameListRef.child(dbKey);
          
    //       gameRef.update({
    //         "logo_img": `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/logo.png`
    //       })
    //     }
    //   }
    // })


    // this is the code to init all games with onWishlist: false
    // gameListRef.once('value', snapshot => {
    //   const data = snapshot.val();
    //   for (const dbKey in data) {
    //     // console.log(data[dbKey]);
    //     if (data[dbKey].onWishlist === undefined) {
    //       console.log("we're in");
    //       const gameRef = gameListRef.child(dbKey);
    //       gameRef.update({
    //         "onWishlist": false
    //       })
    //     }
    //   }
    // })
    
    // console.log(test);
    // const gameListRef = firebase.database().ref('gameList/').limitToFirst(10);

    // axios({
    //   method: 'get',
    //   url: 'https://steamcdn-a.akamaihd.net/steam/apps/230410/header.jpg?t=1605833758',
    //   responseType: 'json'
    // }).then(res => {
    //   console.log(res.config.url);
    //   this.setState({
    //     imageTest: res.config.url
    //   })
    // }).catch(err => {
    //   console.log(err);
    // })

    const timeNow = Date.now();

    // used to display all games in the db
    // gameListRef.on('value', data => {
    //   const dataValue = data.val();
    //   // console.log('data value: ', dataValue);
    //   this.setState({
    //     games: dataValue
    //   })
    //   // console.log('state value:', this.state.games);
    // })

    dbRef.once('value', (data) => {
      const firebaseDataObj = data.val();

      if (timeNow > (firebaseDataObj.time + 3000000)) { // this is 24 hours: 84 000 000
        dbRef.update({
          time: timeNow
        })
        console.log('updated');

        // this clears the database of games please be careful
        // gameListRef.set({ 
        //   gameList: 0
        // }) 

        
        


        // for (const item in dataObject) {
        //   gameListRef.push(dataObject[item]);
        //   // console.log(dataObject[item]);
        // }

        // axios request to get most popular games of the last two weeks, on a rolling 24hrs basis
        // axios({
        //   method: 'GET',
        //   url: 'https://cors-anywhere.herokuapp.com/https://steamspy.com/api.php?request=top100in2weeks',
        //   responseType: 'json'
        // }).then(res => {
        //   console.log(res);
        //   const dataObject = res.data;
        //   gameListRef.set({
        //     gameList: 0
        //   })

        // axios request to get updated images for each game
        // const appId = '230410'
        // axios({
        //   method: 'GET',
        //   url: 'https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/appdetails/',
        //   responseType: 'JSON',
        //   params: {
        //     appids: appId
        //   }
        // }).then(res => {
        //   console.log(res.data[appId].data.header_image);
        // }).catch(err => {
        //   console.log(err);
        // })

        //   for (const item in dataObject) {
        //     gameListRef.push(dataObject[item]);
        //   }
        // }).catch(err => {
        //   console.log(err);
        // })
      }
    })
  }

  addToWishlist = (dbKey, game) => {
    const wishlistRef = firebase.database().ref('wishlist');
    const gameRef = firebase.database().ref('gameList/').child(dbKey); // find the game
    // gameRef.once('value', snapshot => {
      // const dataVal = snapshot.val(); // find the data object for the game
      // const onWishlist = dataVal.onWishlist; // find the onWishlist value
      // console.log(onWishlist);

      const { name, price, onWishlist } = game;

      if (onWishlist === false) {
        // const wishlistDisplay = [];
        // wishlistDisplay.push(dataVal.name);
        // wishlistDisplay.push(dataVal.logo_img);
        // wishlistDisplay.push([
        //   dataVal.initialprice,
        //   dataVal.price,
        //   dataVal.discount
        // ]);

        const wishlistObj = {
          [dbKey]: [
            dbKey,
            name,
            price
          ]
        }
        wishlistRef.update(wishlistObj);
        
        // const wishlistState = this.state.wishlist;
        // wishlistState.push(dbKey);
        // this.setState({
        //   wishlist: wishlistState
        // })
        gameRef.update({
          onWishlist: true
        })
        // console.log();
      } else {
        console.log('yo homie u already clicked it')
      }
    // })
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

  render() {
    // console.log(this.state.wishlist); wishlist={this.state.wishlist}
    // console.log('state value:', this.state.games);
    return (
      <div className="App">
        <Header removeFromWishlist={this.removeFromWishlist} /> 
        {/* {
          this.state.wishlist.length === 0
            ? null
            : <Header wishlist={this.state.wishlist} />
        } */}
        <Main addToWishlist={this.addToWishlist} />
        <Footer />
      </div>
    );
  }
}

export default App;
