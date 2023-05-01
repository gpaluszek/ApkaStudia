import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowDown,
  ArrowUp,
} from "../common/icons/icons.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TableEmployee = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };


  return (
    <div>
      <div className="div-table">
        
        <table className="employee-table">
          <thead>
            <tr className="employee-tr">
              <th>Imie Nazwisko</th>
              <th>Stanowisko</th>
              <th>Status</th>
              <th>Email</th>
              <th>Doświadczenie</th>
              <th className="employee-setting">Opcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              
              <React.Fragment key={user.uuid}>
           
                <tr
                
                  key={user.uuid}
                  className="employee-tr"
                  onClick={() => handleRowClick(index)}
                >
                  
                  <td className="employee-profile td-employee">
                    {user.sex == "Kobieta" ? (
                      <div className="circle-avatar-women">
                        {user &&
                          `${user.name.charAt(0).toUpperCase()}${user.surname
                            .charAt(0)
                            .toUpperCase()}`}
                      </div>
                    ) : (
                      <div className="circle-avatar-man">
                        {user &&
                          `${user.name.charAt(0).toUpperCase()}${user.surname
                            .charAt(0)
                            .toUpperCase()}`}
                      </div>
                    )}
                    {user.employeeprofile}
                    {user && `${user.name} ${user.surname}`}
                    {user.employeeprofile}
                  </td>
                  <td className="td-employee">
                  {user.employeeprofile.employeeAgreements && user.employeeprofile.employeeAgreements.typeContract}
                    {user.position} {user.role}
                  </td>
                  <td className="td-employee">{
                  user.status == true ? (
                    "Aktywny"
                  ) : (
                    "Nieaktwyny"
                  )
                  
                  }</td>
                  <td className="td-employee">{user.email}</td>
                  <td className="td-employee">1rok</td>
                  <td className="td-employee employee-setting">
                    <button className="button-table">
                      {selectedRows.includes(index) ? (
                        <ArrowUp className="employee-icon" />
                      ) : (
                        <ArrowDown className="employee-icon" />
                      )}
                    </button>
                  </td>
                </tr>
                {selectedRows.includes(index) && (
                  <tr className="employee-tr-info">
                    <td colSpan="6">
                      <div className="employee-info">
                        <div>Adres: {user.street + " " + user.houseNumber + " " + user.city + " " + user.postCode}</div>
                        <div>Telefon: {user.phoneNumber}</div>
                        <div>Data zatrudnienia: {user.employmentDate}</div>
                  </div>
                  <div className="employee-options">
                    <Link
                      to={`/users/edit/${user.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user.uuid)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
};

export default TableEmployee;




  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { isError
  //   //,user
  //   } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     dispatch(getMe());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (isError) {
  //       navigate("/");
  //     }
  //     // if(user && user.role !== "admin"){
  //     //   navigate("/dashboard");
  //     // }
  //     // opcja dostępu inny niz admin do dashboard
  //   }, [isError,
  //     //user,

  //     navigate]);