import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Search from './Search'
import Park from './parkData'



const Menu = ({ parks }) => {


    return (
    <div className="menu-container">
      <div className="search-container">
        <Search />
      </div>
      <div className="park-container">
        <ul className="park-list">
        {parks.map(park => (
                        <li key={park.id}>
                        <div className="park-title">{park.title}</div>
                        <div className="park-data">
                        <div className="park-address">{park.vicinity}</div>


                        </div>
                        </li>
                        ))
                      }
                    </ul>
      </div>
    </div>
  )
}
Menu.propTypes = {
parks: PropTypes.array.isRequired,
};

export default Menu
