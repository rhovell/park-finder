import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Search from './Search'
import * as Parks from './parks'
import Menu from './Menu'


class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.state = { hidden: true };
  }


  showMenu = () => {
      this.setState({ hidden: false })
  }

  hideMenu = () => {
      this.setState({ hidden: true })
  }

  render() {
    const menuHidden = this.state.hidden;
    let menu;
    let button;

    if (menuHidden) {
      button = <ShowButton onClick={this.showMenu} />;
      menu;
    } else {
      button = <HideButton onClick={this.hideMenu} />;
      menu = <Menu
      parks={this.props.parks}/>;
    };

    return (
    <div className="menu-button">
      {button}
      {menu}
    </div>

  );
  }

};


function ShowButton(props) {
return (
  <button onClick={props.onClick}>
    <img src="./icons/menu.svg" alt="menu"></img>
  </button>
);
};

function HideButton(props) {
return (
  <button onClick={props.onClick}>
    <img src="./icons/menu.svg" alt="menu"></img>
  </button>
);
};

ReactDOM.render(
  <MenuButton />,
  document.getElementById('root')
);
export default MenuButton
