import React from 'react'
import { HamburgerIcon } from '../common/icons/icons'
function Navbar(props) {
  return (
     <nav className='navbar-top'>
      <button className="hamburger" onClick={props.toggleSidebar}>
        
   <HamburgerIcon />
      </button>
    </nav>
  )
}

export default Navbar