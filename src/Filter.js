import React from 'react'

class Filter extends React.Component {
  constructor(props) {
    super(props);
    // binding this to event-handler functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: '',
       };
    }
    // on select value change, setState of select 'value : event.target.value'
    handleChange(event) {
      this.setState({ value: event.target.value })

    }
    // on select submit, find the matching marker and pass it to props.handlePlaceChange
    handleSubmit(event) {
      event.preventDefault();
      for(var marker of this.props.markers){
        if(this.state.value === marker.marker.props.id){
          this.props.handlePlaceChange(marker.marker.props, marker.marker.marker);
        }
      }
    }

    render() {
      return (
        <form className="filter-results" onSubmit={this.handleSubmit}>
          <label>
            Select Park
            <select
            onChange={ this.handleChange }
            parks={this.props.parks}
            id={'submit'}
            className={'filter'}
            value = {this.state.value}
            >
              {this.props.parks.map(park => (
                <option
                  park={park}
                  key={park.id}
                  value={ park.title }
                  className={'filter option'}
                  >
                  {park.title}
                  </option>
              ))
              }
          </select>
            <input type="submit" value="Select" />
          </label>
        </form>
      );
    }
  }

export default Filter
