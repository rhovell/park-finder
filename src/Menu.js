import React from 'react'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    // binding this to event-handler functions
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      hidden: true,
    };
  }

    // show menu
    showMenu = () => {
        this.setState({ hidden: false })
    };
    // hide menu
    hideMenu = () => {
        this.setState({ hidden: true })
    };

    // on list item click, find the matching park and pass it to props.setPark
    handleSelect = (event) => {
      for(var park of this.props.parks){
        if(event.target.innerHTML === park.title){
          console.log(park)
          this.props.setPark(park);
        }
      }
      // this.hideMenu()
    }

    render() {
    const menuHidden = this.state.hidden;
    let menu;
    let button;
    if (menuHidden) {
      button = <ShowButton onClick={this.showMenu} >List View</ShowButton>;
    } else {
      button = <HideButton onClick={this.hideMenu} >Hide List</HideButton>;
      menu = <div className="menu open">
              <div className="park-container">
                <ul className="park-list" id="listView">
                  {this.props.parks.map(park => (
                      <li
                        key={park.id}
                        park={park}
                        onClick={this.handleSelect}
                        value={park.title}
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
