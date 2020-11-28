import { Component } from 'react';
import Navigation from './Navigation';
import Carts from './Carts';
import Banner from './Banner';

class Header extends Component {
  render() {
    return (
      <header>
        <Navigation />
        <Carts />
        <Banner />
      </header>
    )
  }
}

export default Header;