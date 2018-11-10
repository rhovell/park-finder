import React from 'react'

class Filter extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = { value: '' };
    }

    handleChange(event) {
      this.setState({ value : event.target.value });
      console.log('Selected Place is ' + event.target.value);
    }

    handleSubmit(event) {
      this.props.onPlaceChange(this.state.value);
      event.preventDefault();
      // console.log(this.state.value)
    }

    render() {
      const selectedPlace = this.props.selectedPlace;
      return (
        <form className="filter-results" onSubmit={ this.handleSubmit }>
          <label>
            Filter Parks
            <select
            value = {this.state.value}
            onChange={ this.handleChange }
            >
              {this.props.parks.map(park => (
                <option
                key={park.id}
                value={ park.title }>{park.title}</option>
              ))
              }
          </select>
          <input type="submit" value="Submit" />
          </label>
        </form>
      );
    }
  }

export default Filter
