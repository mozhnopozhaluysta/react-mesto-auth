import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  onClose,
  onAddPlace,
  onLoading,
  isOpen,
  onCloseOverlay,
}) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="popupNewPlace"
      title="Новое место"
      buttonText={onLoading ? `Сохранение` : `Создать`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        className="popup__input popup__input_type_img-name"
        id="imgName"
        name="name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={handleChangePlaceName}
        required
      />
      <span className="error imgName-error" />
      <input
        className="popup__input popup__input_type_img-link"
        id="imgLink"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        value={placeLink}
        onChange={handleChangePlaceLink}
        required
      />
      <span className="error ImgLink-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
