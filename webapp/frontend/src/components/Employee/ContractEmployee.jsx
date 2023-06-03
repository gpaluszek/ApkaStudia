import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowDown, ArrowUp } from "../../common/icons/icons";
import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ContractEmployeeMain = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setUser(response.data);
  };

  return (
    <div>
      
      {user ? (
        
        <div className="div-table"> 
        <div className="global-row">
        <span>Kontrakty pracownika -  {user.name} {user.surname}</span>
        <span>
        Przeglądaj kontrakty zawarte przez konkretnego pracownika. Wyświetlaj informacje na temat stanowiska, daty rozpoczęcia i zakończenia kontraktu oraz rodzaju kontraktu.
        </span>
       </div>
       
          <div className="div-table-options">
            <NavLink className="table-options" to="/adduser">
              Dodaj Umowe
            </NavLink>
          </div>
          <table className="employee-table">
            <thead>
              <tr className="employee-tr">
                <th>Stanowisko</th>
                <th>Start Umowy</th>
                <th>Koniec Umowy</th>
                <th>Rodzaj Umowy</th>
                <th className="employee-setting">Opcje</th>
              </tr>
            </thead>
            <tbody>
            {user.profile && user.profile.contracts.length > 0 ? (
  user.profile.contracts.map((contract, index) => (
    <tr className="employee-tr" key={index}>
      <td className="td-employee">{contract.position}</td>
      <td className="td-employee">
        {new Date(contract.startContract).toLocaleDateString("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className="td-employee">
        {new Date(contract.endContract).toLocaleDateString("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className="td-employee">{contract.typeContract}</td>
      <td className="td-employee employee-setting"></td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5">Brak danych</td>
  </tr>
)}

</tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ContractEmployeeMain;
