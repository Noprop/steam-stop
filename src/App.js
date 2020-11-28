import './App.css';
import { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faList, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

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
