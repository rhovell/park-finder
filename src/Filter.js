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
    // on select submit, find the matching park and pass it to props.setPark
    handleSubmit(event) {
      event.preventDefault();
      for(var park of this.props.parks){
        if(this.state.value === park.title){
          this.props.setPark(park);
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
