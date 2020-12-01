// import { Component } from 'react';

const Item = (props) => {
  const { name, owners, price } = props.game;
  return (
    <div className="item">
      <p>{name}</p>
      <p>{owners} owners</p>
      <p>{price / 100} in US dollars</p>
    </div>
  )
}
// class Item extends Component {
//   render() {
//     return (
//       <div className="item">
//         <p>item</p>
//       </div>
//     )
//   }
// }

export default Item;