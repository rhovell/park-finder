import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Search from './Search'
import * as Parks from './parks'


class Menu extends Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.state = { hidden: true };
  }

    showMenu = () => {
        this.setState({ hidden: false })
    };

    hideMenu = () => {
        this.setState({ hidden: true })
    };

    showData = () => {

    }

  render() {
    const menuHidden = this.state.hidden;
    let menu;
    let button;

    if (menuHidden) {
      button = <ShowButton onClick={this.showMenu} >Menu</ShowButton>;
      menu;
    } else {
      button = <HideButton onClick={this.hideMenu} >Menu</HideButton>;
      menu =
      <div className="menu open">
      <div className="search-container">
        <Search
        parks={this.props.parks}/>
      </div>
      </div>;
    };

    return (
      <div className="menu-container">
      <div className="menu-button">{button}</div>
      {menu}
    </div>
  )
}
}

function ShowButton(props) {
return (
  <button onClick={props.onClick}>
    Show Menu
  </button>
);
};

function HideButton(props) {
return (
  <button onClick={props.onClick}>
    Hide Menu
  </button>
);
};
export default Menu
