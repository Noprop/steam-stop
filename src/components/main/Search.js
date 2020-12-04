import { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      sortBy: false,
      freeGames: false
    }
  }
  handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleFilterGames(this.state);
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit} >
        <label htmlFor="radioOwners" className="container" >Sort by owners
          <input 
            type="radio" 
            name="sortBy" 
            value="owners" 
            id="radioOwners"
            checked={this.state.sortBy === 'owners'}
            onChange={this.handleInputChange}
          />
          <span className="newRadio"></span>
        </label>
        <label htmlFor="radioPrice" className="container" >Sort by price
          <input 
            type="radio" 
            name="sortBy" 
            value="price" 
            id="radioPrice"
            checked={this.state.sortBy === 'price'}
            onChange={this.handleInputChange}
          />
          <span className="newRadio"></span>
        </label>
        <label htmlFor="freeGames" className="container" >Include free games
          <input 
            type="checkbox" 
            name="freeGames" 
            value="freeGames" 
            id="freeGames"
            checked={this.state.freeGames}
            onChange={this.handleInputChange}
          />
          <span className="checkmark"></span>
        </label>
        <button value="submit">Submit</button>
      </form>
    )
  }
}

export default Search;