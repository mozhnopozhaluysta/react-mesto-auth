import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
  isOpen,
  onUpdateUser,
  onLoading,
  onClose,
  onCloseOverlay,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      name="popupEditProfile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        className="popup__input popup__input_type_name"
        id="popupName"
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
        required
      />
      <span className="error popupName-error" />
      <input
        className="popup__input popup__input_type_info"
        id="popupInfo"
        name="about"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={about || ""}
        onChange={handleChangeAbout}
        required
      />
      <span className="error popupInfo-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
