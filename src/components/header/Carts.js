import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Carts extends Component {
  render() {
    return (
      <div>
        <FontAwesomeIcon icon="list" />
        <FontAwesomeIcon icon="shopping-cart" />
      </div>
    )
  }
}

export default Carts;