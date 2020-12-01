import './App.css';
import { Component } from 'react';
import firebase from './firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faList, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
      imageTest: 0
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    // const gameListRef = firebase.database().ref('gameList/');
    // const gameListRef = firebase.database().ref('gameList/').limitToFirst(10);

    axios({
      method: 'get',
      url: 'https://steamcdn-a.akamaihd.net/steam/apps/230410/header.jpg?t=1605833758',
      responseType: 'json'
    }).then(res => {
      console.log(res.config.url);
      this.setState({
        imageTest: res.config.url
      })
    }).catch(err => {
      console.log(err);
    })

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

    dbRef.on('value', (data) => {
      const firebaseDataObj = data.val();
      if (timeNow > (firebaseDataObj.time + 1000000)) { // CURRENTLY SET TO 2.4 HOURS: 8400000
        dbRef.update({
          time: timeNow
        })
        console.log('updated');
        // gameListRef.set({
        //   gameList: 0
        // })

        // for (const item in dataObject) {
        //   gameListRef.push(dataObject[item]);
        //   // console.log(dataObject[item]);
        // }

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
          

        //   for (const item in dataObject) {
        //     gameListRef.push(dataObject[item]);
        //   }
        // }).catch(err => {
        //   console.log(err);
        // })
      }
    })
  }

  render() {
    // console.log('state value:', this.state.games);
    return (
      <div className="App">
        <img src={this.state.imageTest} alt=""/>
        {/* <Header /> 
        <Main />
        <Footer /> */}
      </div>
    );
  }
}

export default App;
