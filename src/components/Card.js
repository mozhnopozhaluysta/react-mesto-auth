import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardLike,
  onCardDelete,
  onCardClick,
  onConfirmationPopup,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const likeButtonClassName = `element__button-like ${
    isLiked ? "element__button-like_active" : ""
  }`;
  const isOwner = card.owner._id === currentUser._id;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
    onConfirmationPopup(true);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="element">
      {isOwner && (
        <button
          className="element__delete"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="element__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-like">
          <button
            className={likeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__count-like">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
