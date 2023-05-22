import React from "react";
import success from "../images/icon/success.svg";
import error from "../images/icon/error.svg";
import { useLocation, useHistory } from "react-router-dom";

function InfoTooltip(props) {
  const location = useLocation();
  const history = useHistory();
  function redirectPopup() {
    if (props.status) {
      props.onClose();
      if (location.pathname === "/sign-up") {
        history.push("/sign-in");
      }
    }
    props.onClose();
  }

  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id={props.id}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={redirectPopup}
          aria-label="Закрыть форму"
        />
        <div className="auth__info">
          <img
            src={props.status ? success : error}
            className="auth__status-icon"
            alt={props.status ? "Иконка успеха" : "Иконка ошибки"}
          />
          <p 
            src={props.status ? success : error}
            className="auth__status-text">
            {props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
