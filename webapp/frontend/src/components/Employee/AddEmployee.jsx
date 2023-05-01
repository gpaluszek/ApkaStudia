import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AvatarWoman,
  AvatarMan,
  SettingTwoIcon,
} from "../../common/icons/icons.jsx";

const FormAddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

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
  return (
    <div>
      <form onSubmit={saveUser}>
        <div className="form-field">
          <label className="form-label">Imie</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={name} onChange={(e) => setName(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Nazwisko</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={surname} onChange={(e) => setSurname(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Hasło</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={password} onChange={(e) => setPassword(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Powtórz hasło</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Płeć</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={sex} onChange={(e) => setSex(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Numer domu</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={housenumber} onChange={(e) => setHouseNumber(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Ulica</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={street} onChange={(e) => setStreet(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Miasto</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={city} onChange={(e) => setCity(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Kod pocztowy</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={postcode} onChange={(e) => setPostCode(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Email</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Numer telefonu</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Poziom użytkownika w aplikacji</label>
          <div className="form-control">
            <input
              type="text"className="form-input" value={role} onChange={(e) => setRole(e.target.value)}placeholder="Name"
            />
          </div>
        </div>
        
        
      </form>
    </div>
  );
};

export default FormAddEmployee;
