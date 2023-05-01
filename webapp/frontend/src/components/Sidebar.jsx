import React, { useState } from 'react'
import { NavLink,useNavigate, useLocation  } from 'react-router-dom';
import { LogOut, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { HomeIcon,TickSquareIcon,UserIcon ,CalendarIcon, DocumentIcon, UsersIcon,AddUserIcon, LocationIcon, ScanIcon, RaportIcon, ActivityIcon, LogoutIcon, LogoIcon, LogoText, ArrowDown } from '../common/icons/icons';
const Sidebar = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    const sidebarStyles = {
        width: props.isSidebarOpen ? '250px' : '50px',
        transition: 'width 0.3s ease'
      };
      const sidebarClass = props.isSidebarOpen ? "" : "sidebar-small";
      


      //drop down
      const [isActive, setIsActive] = useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
      function toggleDropdown() {
        setIsActive(!isActive);
        setIsDropdownOpen(!isDropdownOpen);
      }


    
    return (
        
       

        <aside className={`aside ${sidebarClass}`} style={sidebarStyles}>
            <div className="nav-logo">
                <NavLink className="nav-logo-a" to="/dashboard"><LogoIcon className={"sidebar-logo-icon"} /><LogoText  className={"sidebar-logo-text"}/></NavLink>
            </div>
            <div className="nav-content">
            <ul className="nav-ul">
                <li className={"sidebar-menu-li " + (location.pathname === '/dashboard' ? 'active-side' : null)}  >
                    <NavLink className="nav-a"  to="/dashboard">
                        <HomeIcon  className="nav-icon"/>
                        <span className="nav-text"  > Strona główna</span>
                    </NavLink>
                </li>
             <li  className={"sidebar-menu-li dropdown-btn " + (isActive ? "active" : "") + (location.pathname === '/users' ? 'active-side' : null)}    onClick={toggleDropdown}>
                    <NavLink className="nav-a">
                        <UserIcon  className="nav-icon"/>
                    <span  className="nav-text " >Pracownicy <ArrowDown className="drop-arrow"/> </span>
                    </NavLink>
                    <ul class="sidebar-submenu-ul dropdown-container" style={{ display: isDropdownOpen ? "block" : "none" }}>
                        <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="/users">Pracownicy</NavLink></li>
                        <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="">Usuń pracownika</NavLink></li>
                        <li className='sidebar-submenu-li'><NavLink className="nav-a-dropdown" to="">Dodaj użytkownika</NavLink></li>
                    </ul>
                </li>
            </ul>
            {/* {user && user.role === "admin" && (
                <Div jakis tam menu dostepne dla admina
            )} */}
                <button  onClick={logout}  className="nav-button"><LogoutIcon className="nav-icon"  /><span className="nav-text" >Wyloguj się</span></button>
            </div>
            <div className="nav-footer">

            </div>
        </aside>

      
    )
}

export default Sidebar