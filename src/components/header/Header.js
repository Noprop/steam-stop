import { Component } from 'react';
import Navigation from './Navigation';
import Wishlist from './Wishlist';
import Banner from './Banner';

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <Navigation />
          <Wishlist removeFromWishlist={this.props.removeFromWishlist} />
        </nav>
        <Banner />
      </header>
    )
  }
}

export default Header;