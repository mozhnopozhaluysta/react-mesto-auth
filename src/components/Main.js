import React from "react";
import Card from "./Card";
import profileEditAvatar from "../images/profile__edit-avatar.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";


function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onDeletedCard,
  onConfirmationPopup,
}) {


  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__wrapper-relative">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар профиля"
            />
            <button
              className="profile__edit-avatar"
              type="button"
              onClick={() => {
                onEditAvatar(true);
              }}
            >
              <img
                className="profile__edit-pen"
                src={profileEditAvatar}
                alt="изображение письменной ручки"
              />
            </button>
          </div>

          <div className="profile__info">
            <div className="profile__info-name">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={() => {
                  onEditProfile(true);
                }}
              ></button>
            </div>
            <p className="profile__details">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            onAddPlace(true);
          }}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onDeletedCard}
            onCardLike={onCardLike}
            onConfirmationPopup={onConfirmationPopup}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
