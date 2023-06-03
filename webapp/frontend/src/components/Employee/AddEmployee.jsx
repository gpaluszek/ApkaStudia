import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AvatarWoman,
  AvatarMan,
  SettingTwoIcon,
  AddUserIcon,
} from "../../common/icons/icons.jsx";
import { AddUserIll  } from "../../common/illustrastion/illustration.jsx";

const FormAddEmployee = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        surname: surname,
        street: street,
        houseNumber: houseNumber,
        city: city,
        postCode: postCode,
        sex: sex,
        phoneNumber: phoneNumber,
        email: email,
        role: role,
        status: status,
        password: password,
        confPassword: confPassword,
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
      <div className="form-container">
      <p className="msg-error">{msg}</p>
        <div className="form-top">
         <AddUserIcon className="form-icon-top" /> Pracownicy / Dodaj Nowego Pracownika
        </div>
        <div className="form-bottom">
        <div className="form-container-left">
        {/* <AddUserIll  className="form-add-ill" /> */}
                
          <h1 className="form-h1">Witaj na stronie dodawania użytkownika!</h1>

          <p className="form-p">
            Tutaj możesz w prosty i szybki sposób dodać nowego użytkownika do
            swojej listy pracowników.
            <br />
            <br />
            Wypełnij formularz dokładnie i upewnij się, że podajesz poprawne
            dane, aby nowy użytkownik mógł swobodnie korzystać z systemu.
            <br />
            <br />
            Jeśli będziesz chciał zmienić dane użytkownika w przyszłości, możesz
            to zrobić w sekcji "Pracownicy - Edytuj Użytkownika" .
            <br />
            <br />
            
            Jeśli potrzebujesz pomocy, skorzystaj z naszej sekcji pomocylub
            skontaktuj się z naszym zespołem wsparcia.


          </p>
          <AddUserIll  className="form-add-ill" />
          {/* <ProfileDetails  className="form-add-ill" /> */}
        </div>
        <form className="form-template" onSubmit={saveUser}>
          <div className="form-field">
            <label className="form-label">Imie*</label>
            <div className="form-control">
              
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Imie" required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Nazwisko*</label>
            <div className="form-control">
              <input
                type="text"
                className="form-input"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Nazwisko" required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Hasło*</label>
            <div className="form-control">
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****" required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Powtórz hasło*</label>
            <div className="form-control">
              <input
                type="password"
                className="form-input"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="Powtórz hasło" required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Płeć*</label>
            <div className="form-control">
              
              <select
                className="form-input"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                placeholder="Płeć" required
              >
                <option value="Kobieta">Kobieta</option>
                <option value="Mężczyzna">Mężczyzna</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Numer domu</label>
            <div className="form-control">
              <input
                type="text"
                className="form-input"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="Numer domu/mieszkania"
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Ulica</label>
            <div className="form-control">
              <input
                type="text"
                className="form-input"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Ulica"
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Miasto</label>
            <div className="form-control">
              <input
                type="text"
                className="form-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Miasto"
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Kod pocztowy</label>
            <div className="form-control">
              <input
                type="text"
                className="form-input"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                placeholder="Kod pocztowy"
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Email*</label>
            <div className="form-control">
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Numer telefonu*</label>
            <div className="form-control">
              <input
                type="text"
                className="form-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+48 123 456 789" required
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Poziom użytkownika w aplikacji</label>
            <div className="form-control">
              <select
                className="form-input"
                value={role} 
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Uzytkownik">Użytkownik</option>
                <option value="Admin">Admin</option>
                
              </select>
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Status</label>
            <div className="form-control">
               <select
                className="form-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Name"
              >
                <option value="Aktywny">Aktywny</option>
                <option value="Nieaktywny">Nieaktywny</option>
              </select>
            </div>
          </div>
          <button type="submit" className="form-button-sub">Dodaj użytkownika</button>
        </form>
        </div>
        
      </div>
    </div>
  );
};

export default FormAddEmployee;
