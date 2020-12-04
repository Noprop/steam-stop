import './App.css';
import { Component } from 'react';
import firebase from './firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import Qs from 'qs';

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
    const wishlistRef = firebase.database().ref('wishlist');

    // load any items on the wishlist onto state 
    wishlistRef.once('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState({
          wishlist: data
        })
      }
    })


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
