const Item = ({ game, dbKey, addToWishlist }) => {
  const { name, owners, price, header_img } = game;
  // console.log(dbKey);
  return (
    <div className="item">
      <img src={header_img} alt="testing"/>
      <p>{name}</p>
      <p>{owners} owners</p>
      <p>{price / 100} in US dollars</p>
      <button onClick={() => addToWishlist(dbKey, game)}>Click MEEE</button>
    </div>
  )
}

export default Item;