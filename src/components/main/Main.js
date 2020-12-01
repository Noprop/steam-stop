import { Component } from 'react';
import Search from './Search';
import Content from './Content.js';

class Main extends Component {
  render() {
    return (
      <section className="main">
        <Search />
        <Content />
      </section>
    )
  }
}

export default Main;