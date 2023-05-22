import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupEditAvatar(props) {
  const avatarRef = useRef();
  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      id="avatar-popup"
      title="Обновить аватар"
      type="user-avatar"
      buttonText="Сохранить"
    >
      <label htmlFor="avatar-input" className="popup__label">
        <input
          id="avatar-input"
          type="url"
          className="popup__input"
          name="avatar"
          required
          placeholder="Введите ссылку на аватар"
          ref={avatarRef}
          minLength="2"
          maxLength="200"
        />
        <span className="avatar-input-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
}

export default PopupEditAvatar;
