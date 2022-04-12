import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';

export default function ProfileButton() {
  return (
    <Link to="/perfil">
      <button
        type="button"
        onClick={ () => {
          const currentEmail = JSON.parse(localStorage.getItem('user'));
          if (!currentEmail) {
            localStorage
              .setItem('user', JSON.stringify({ email: 'email@email.com' }));
          }
        } }
      >
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile Icon" />
      </button>
    </Link>
  );
}
