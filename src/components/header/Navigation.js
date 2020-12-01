import { Component } from 'react';

class Navigation extends Component {
  render() {
    return (
      <ul className="navigation">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Shop</a></li>
      </ul>
    )
  }
}

export default Navigation;