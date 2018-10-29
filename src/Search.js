import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Search...' };
  }

  clear = () => {
    this.setState({ value: '' })
  }

  search = (event) => {
    this.setState({ value : event.target.value })
  }

  render() {


    return (
    <input type="text"
      value={this.state.value}
      onChange={this.search}
      onClick={this.clear}
      />

  );
  }

};


ReactDOM.render(
  <Search />,
  document.getElementById('root')
);
export default Search
