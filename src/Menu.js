import React from 'react'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.state = {
      hidden: true,
      selected: {}
    };
  }

    showMenu = () => {
        this.setState({ hidden: false })
    };

    hideMenu = () => {
        this.setState({ hidden: true })
    };


    render() {
    const menuHidden = this.state.hidden;
    let menu;
    let button;

    if (menuHidden) {
      button = <ShowButton onClick={this.showMenu} >List View</ShowButton>;
      menu;
    } else {
      button = <HideButton onClick={this.hideMenu} >Hide List</HideButton>;
      menu = <div className="menu open">
              <div className="park-container">
                <ul className="park-list">
                  {this.props.parks.map(park => (
                      <li
                        key={park.id}
                        park={park}
                        onClick={this.performMarkerClick}
                        className={this.props.selectedPlace === park.title ? "park-title selected" : "park-title"}
                        >{park.title}
                      </li>
                      ))
                    }
                  </ul>
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
    List View
  </button>
);
};

function HideButton(props) {
return (
  <button onClick={props.onClick}>
    Hide List
  </button>
);
};
export default Menu
