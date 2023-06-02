import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  onLoading,
  onClose,
  onUpdateAvatar,
  isOpen,
  onCloseOverlay,
}) {
  const avatarRef = useRef(null);

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChangeAvatar() {
    return avatarRef.current.value;
  }

  return (
    <PopupWithForm
      name="popupEditAvatar"
      title="Обновить аватар"
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        className="popup__input popup__input_type_link-avatar"
        id="nameInputAvatar"
        name="avatar"
        type="url"
        placeholder="Введите ссылку URL"
        onChange={handleChangeAvatar}
        ref={avatarRef}
        required
      />
      <span className="error nameInputAvatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
