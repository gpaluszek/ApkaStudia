import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowDown, ArrowUp } from "../../common/icons/icons";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const TableEmployee = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const updateUserStatus = async (id) => {
    setSelectedUserId(id);
    setShowConfirmation(true);
  };

  const handleConfirmStatus = async (status) => {
    try {
      await axios.patch(`http://localhost:5000/users/status/${selectedUserId}`, { status: status });
      setShowConfirmation(false);
      setSelectedUserId(null);
      getUsers(); // Aktualizacja listy użytkowników po zmianie statusu
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelStatus = () => {
    setShowConfirmation(false);
    setSelectedUserId(null);
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
        <div className="div-table-options">
          <NavLink className="table-options" to="/adduser">
            Dodaj użytkownika
          </NavLink>
        </div>
        <table className="employee-table">
          <thead>
            <tr className="employee-tr">
              <th>Identyfikator</th>
              <th>Imie Nazwisko</th>
              <th>Status</th>
              <th>Numer Telefonu</th>
              <th>Email</th>
              <th className="employee-setting"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <React.Fragment key={user.id}>
                <tr
                  key={user.uuid}
                  className="employee-tr"
                  onClick={() => handleRowClick(index)}
                >
                  <td className="td-employee">{user.id}</td>
                  <td className="employee-profile td-employee">
                    {user.sex === "Kobieta" ? (
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
                    {user && `${user.name} ${user.surname}`}
                  </td>
                  <td className="td-employee">
                    {user.status === true ? "Aktywny" : "Nieaktywny"}
                  </td>
                  <td className="td-employee">
                    {user && `${user.phoneNumber} `}
                  </td>
                  <td className="td-employee">{user.email}</td>
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
                      <div className="employee-options">
                        <Link
                          to={`/users/edit/${user.id}`}
                          className="button is-small is-info"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/users/${user.id}`}
                          className="button is-small is-info"
                        >
                          Kontrakty
                        </Link>
                        <button
                          onClick={() => updateUserStatus(user.id)}
                          className="button is-small is-danger"
                        >
                          Wyłącz konto
                        </button>
                      </div>
                      {showConfirmation && (
                        <div className="confirmation-popup">
                          <div className="confirmation-content">
                            <h3>Czy na pewno chcesz zmienić status użytkownika?</h3>
                            <div className="confirmation-buttons">
                              <button
                                className="button is-small is-danger"
                                onClick={() => handleConfirmStatus(true)}
                              >
                                Aktywny
                              </button>
                              <button
                                className="button is-small"
                                onClick={() => handleConfirmStatus(false)}
                              >
                                Nieaktywny
                              </button>
                              <button
                                className="button is-small"
                                onClick={handleCancelStatus}
                              >
                                Anuluj
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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
