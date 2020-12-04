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
        <label htmlFor="radioOwners">Sort by owners
          <input 
            type="radio" 
            name="sortBy" 
            value="owners" 
            checked={this.state.sortBy === 'owners'}
            onChange={this.handleInputChange}
          />
          <span className="newRadio"></span>
        </label>
        <label htmlFor="radioPrice">Sort by price
          <input 
            type="radio" 
            name="sortBy" 
            value="price" 
            checked={this.state.sortBy === 'price'}
            onChange={this.handleInputChange}
          />
          <span className="newRadio"></span>
        </label>
        <label htmlFor="freeGames">Include free games
          <input 
            type="checkbox" 
            name="freeGames" 
            value="freeGames" 
            checked={this.state.freeGames}
            onChange={this.handleInputChange}
          />
        </label>
        <button value="submit">Submit</button>
      </form>
    )
  }
}

export default Search;