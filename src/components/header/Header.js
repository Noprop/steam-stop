import { Component } from 'react';
import Navigation from './Navigation';
import Carts from './Carts';
import Banner from './Banner';

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <Navigation />
          <Carts />
        </nav>
        <Banner />
      </header>
    )
  }
}

export default Header;