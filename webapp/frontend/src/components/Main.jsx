import React, {useState, useEffect} from 'react'
import { NavLink, Link } from 'react-router-dom';
import { ChatIcon, SettingsIcon } from '../common/icons/icons';
import axios from 'axios';

import { useSelector } from 'react-redux';


const Main = () => {
    const {user} = useSelector((state) => state.auth);
    const [product, setProducts] = useState([]);
    const [communique, setCommunique] = useState([]);


    useEffect(()=>{
        getCommunique();
    },[]);

    const getCommunique = async () => {
        const response = await axios.get('http://localhost:5000/communique');
        setCommunique(response.data);
    }


    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
    }


    const [users, setUsers] = useState([]);

    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    };

    

// TIME 
    const dzisiaj = new Date();
    const dzien = dzisiaj.getDate();
    const miesiace = [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec',
      'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];
    const miesiac = miesiace[dzisiaj.getMonth()];
    const rok = dzisiaj.getFullYear();

  return (
    <div className='main-container'>
        <div className="main-left">
            <div className="main-profile">
                <div className="profile-container">
                    <div className="profile-user">
                        <div className='profile-user-left'>
                            {/* <div className='circle-avatar'>{user && `${user.name.charAt(0).toUpperCase()}${user.surname.charAt(0).toUpperCase()}`}</div> */}
                            <span className='user-span'>
                                <b>Witaj {user && `${user.name} ${user.surname}`}</b>
                                Stanowisko: {user && user.position}
                            </span>
                        </div>
                        <div className="profile-user-right">
                            <NavLink className="right-a-settings" to="/settings"><SettingsIcon className="SettingsIcon"/>Ustawienia</NavLink>
                        </div>
                    </div>
                    <div className="main-current">
                        
                    </div>
                    <div className="main-news">
                        <span className="main-news-h">
                            Aktualności
                        </span>
                        {communique.slice().reverse().slice(0,2).map((communique, index)=>(
                        <div className="main-news-more">
                        <div className="more-left">
                        <ChatIcon />
                        </div>
                        <div className="more-right">
                            <span className="more-h">
                               {communique.title}
                            </span>
                            <span className="more-text">
                            {communique.text}
                            </span>
                        </div>
                        </div>
                    ))}
 
                    </div>
                </div>
            </div>
            <div className='employeestatus'>
                    <div className='employee-top'>
                        <div className='employee-icon'></div>
                        <div className="employee-top-title">
                            <span className="employee-title-b">
                                Status pracowników
                            </span>
                            <span className='employee-title-text'>
                                Dziś jest {dzien} {miesiac} {rok}
                            </span>
                        </div>
                    </div>
                    <div className="employee-table">
                    <table className='employee-table-style'>
                    <tr>
                        <th>Imie Nazwisko</th>
                        <th>Stanowisko</th>
                        <th>Trasa</th>
                        <th>Status</th>
                        <th>Więcej</th>
                    </tr>
                    {product.map((product, index)=>(
                        <tr key={product.uuid} className='employee-tr'>
                        <td >{product.name}</td>
                        <td>{index + 1}</td>
                        <td>{product.price}</td>
                        <td className='employee-status-active'>{product.user.name}</td>
                        <td><Link to={`/products/edit/${product.uuid}`}>,</Link></td>
                    </tr>

                    ))}
                    {users.map((users, index)=>(
                        <tr key={users.uuid} className='employee-tr'>
                        <td >{users.name}</td>
                        <td>{index + 1}</td>
                        <td>{users.mail}</td>
                        <td className='employee-status-active'>{user.role}</td>
                        <td><Link to={`/products/edit/${product.uuid}`}>,</Link></td>
                    </tr>

                    ))}
                    
                 
                    <tr className='employee-tr'>
                        <td>Jan Nowak</td>
                        <td>Kierowca</td>
                        <td>5M</td>
                        <td className='employee-status-active'>Obecny</td>
                        <td>Więcej</td>
                    </tr>
                    <tr className='employee-tr'>
                        <td>Jan Nowak</td>
                        <td>Kierowca</td>
                        <td>5M</td>
                        <td className='employee-status-active'>Obecny</td>
                        <td>Więcej</td>
                    </tr>
                    <tr className='employee-tr'>
                        <td>Jan Nowak</td>
                        <td>Kierowca</td>
                        <td>5M</td>
                        <td className='employee-status-active'>Obecny</td>
                        <td>Więcej</td>
                    </tr>
                    <tr className='employee-tr'>
                        <td>Jan Nowak</td>
                        <td>Kierowca</td>
                        <td>5M</td>
                        <td className='employee-status-active'>Obecny</td>
                        <td>Więcej</td>
                    </tr>
                    <tr className='employee-tr'>
                        <td>Jan Nowak</td>
                        <td>Kierowca</td>
                        <td>5M</td>
                        <td className='employee-status-active'>Obecny</td>
                        <td>Więcej</td>
                    </tr>
                    <tr className='employee-tr'>
                        <td>Jan Nowak</td>
                        <td>Kierowca</td>
                        <td>5M</td>
                        <td className='employee-status-active'>Obecny</td>
                        <td>Więcej</td>
                    </tr>
                    
                    </table>
                    </div>

            </div>
        </div>
        <div className="main-right">


        </div>


    </div>
  )
}

export default Main