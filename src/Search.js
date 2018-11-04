import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as Parks from './parks'
import debounce from 'lodash.debounce'


class Search extends Component {
  state = {
      searchResults: []
  }
  componentWillMount = () => {
     this.delayedCallback = debounce(function (event) {
       this.updateResults(event.target.value);
     }, 1000);
  }

  onChange = (event) => {
    event.persist();
    this.delayedCallback(event);
  }
  updateResults = (query) => {
    Parks.get(query).then((searchQuery) => {
      this.setState({ searchResults : searchQuery.results.items })
    }).then(() => {
      for(var result of this.state.searchResults){
        function isPark(result) {
          return result.category.id === 'recreation';
        }
        var filtered = this.state.searchResults.filter(isPark);
      }
        this.setState({ searchResults: filtered })
        console.log(this.state.searchResults)
    }).catch((error) => {
        this.setState({ searchResults : [] })
        console.log('Error on search request')
        })
  }
  render() {
    const searchResults = this.state;
    return (
      <div className="search-parks-container">
      <input
        onChange={(event) => this.onChange(event)}
        placeholder="Search..."
        type="search"
      />

      <div className="search-park-results">
          <ul className="park-list">
          {this.state.searchResults.length > 0  ?
            this.state.searchResults.map((searchResult) => (
              <li key={[searchResult.id, 'Menu-item']}
              title={searchResult.title}
              >
              {searchResult.title}
              </li>
          )) : <li className="no-results">No Results Found.</li>}
          </ul>
        </div>
  </div>

  );
  }

};

export default Search
