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
      games: []
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    const timeNow = Date.now();

    dbRef.on('value', (data) => {
      const firebaseDataObj = data.val();
      if (timeNow > (firebaseDataObj.time + 10000)) { // CURRENTLY SET TO 2.4 HOURS: 8400000
        dbRef.set({
          time: timeNow
        })
        console.log('updated');
        axios({
          method: 'GET',
          url: 'https://cors-anywhere.herokuapp.com/https://steamspy.com/api.php?request=top100in2weeks',
          responseType: 'json'
        }).then(res => {
          // console.log(res.data);
          const dataObject = res.data;
          for (const item in dataObject) {
            console.log(dataObject[item]);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
