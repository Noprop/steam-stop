const Item = (props) => {
  const { name, owners, price, header_img } = props.game;
  const game = props.game;
  return (
    <div className="item">
      <img src={header_img} alt="testing"/>
      <p>{name}</p>
      <p>{owners} owners</p>
      <p>{price / 100} in US dollars</p>
      <button onClick={props.addToWishlist}>Click MEEE</button>
    </div>
  )
}

export default Item;