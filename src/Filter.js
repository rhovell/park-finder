import React from 'react'

class Filter extends React.Component {
  constructor(props) {
      super(props);
      // this.setPark = this.setPark.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        value: '',
         };
    }
    // on select value change, setState of select 'value : event.target.value'

    handleChange(event) {
      this.setState({ value: event.target.value })
      console.log('selected filter option is ' + this.state.value)

    }

    handleSubmit(event) {
      // console.log(this.props)
      event.preventDefault();
      for(var park of this.props.parks){
      if(this.state.value === park.title){

        this.props.setPark(park);
      }
    }
    }

    componentDidUpdate(nextProps, prevProps){
      // console.log(nextProps, prevProps, this.props)
    }

    render() {
      let parkValue = this.props.choosen;
      return (
        <form className="filter-results" onSubmit={this.handleSubmit}>
          <label>
            Filter Parks
            <select
            onChange={ this.handleChange }
            parks={this.props.parks}
            id={'submit'}
            className={'filter'}
            value = {this.state.value}
            // handleplacechange={this.props.handlePlaceChange}
            // choosen={this.props.choosen}
            // choosenpark={this.state.choosenPark}
            // showinginfowindow={this.props.showingInfoWindow ? this.props.showingInfoWindow : false}
            // activemarker={this.props.activeMarker}
            // animation={this.props.animation}
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
            <input type="submit" value="Submit" />
          </label>
        </form>
      );
    }
  }

export default Filter
