import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupConfirmation from "./PopupConfirmation";
import api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false)
    setDeletedCard({})
    setSelectedCard({});
  }

  useEffect(() => {
    api
      .getRealUserInfo()
      .then((profileInfo) => setCurrentUser(profileInfo))
      .catch((error) => console.log(`Ошибка: ${error}`))

    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        )
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }, [])

  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      console.log('overlay')
     closeAllPopups();
    }
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmationPopupOpen ||
    selectedCard.link

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  function changeAvatar(newAvatar) {
    setIsLoading(true)
    api
      .updateProfileUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function changeUpdateUser(newUserInfo) {
    setIsLoading(true)
    api
      .editProfileUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function changeAddPlaceSubmit(data) {
    setIsLoading(true)
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])

        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function changeCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)

    if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`))
    } else {
      api
        .addLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`))
    }
  }

  function changeCardDelete(card) {
    setIsLoading(true)
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
        closeAllPopups()
      })

      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
        <Header />
        <Main
           onEditProfile={setIsEditProfilePopupOpen}
           onEditAvatar={setIsEditAvatarPopupOpen}
           onAddPlace={setIsAddPlacePopupOpen}
           onConfirmationPopup={setIsConfirmationPopupOpen}
           onDeletedCard={setDeletedCard}
           onCardClick={setSelectedCard}
           onCardLike={changeCardLike}
           cards={cards}
          
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={changeUpdateUser}
          onClose={closeAllPopups}
          onLoading={isLoading}
          onCloseOverlay={closeByOverlay}
        />

        <AddPlacePopup
          onAddPlace={changeAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onLoading={isLoading}
          onCloseOverlay={closeByOverlay}
        />
        
        <EditAvatarPopup
          onUpdateAvatar={changeAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onLoading={isLoading}
          onCloseOverlay={closeByOverlay}
        />
        <PopupConfirmation
          onClose={closeAllPopups}
          isOpen={isConfirmationPopupOpen}
          onCardDelete={changeCardDelete}
          onLoading={isLoading}
          card={deletedCard}
          onCloseOverlay={closeByOverlay}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlay}
        />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
