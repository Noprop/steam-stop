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
          <Carts removeFromWishlist={this.props.removeFromWishlist} />
        </nav>
        <Banner />
      </header>
    )
  }
}

export default Header;