const Item = ({ game, dbKey, addToWishlist }) => {
  const { name, owners, price, header_img } = game;

  let ownerArray = (owners.toString()).split("");

  for (let i = ownerArray.length - 3; i > 0; i -= 3) {
    ownerArray.splice(i, 0, ",");
  }

  return (
    <div className="item">
      <img src={header_img} alt="testing"/>
      <div className="title">
        <p>{name}</p>
      </div>
      <p>{ownerArray}~ owners</p>
      <p>${price / 100}</p>
      <button onClick={() => addToWishlist(dbKey, game)}>Add to wish list</button>
    </div>
  )
}

export default Item;