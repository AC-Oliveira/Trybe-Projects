import React from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from './HeaderWithoutSearch';
import Footer from '../Components/Footer';

export default function ProfilePage() {
  let currentEmail = JSON.parse(localStorage.getItem('user'));
  if (!currentEmail) currentEmail = { email: '' };
  return (
    <>
      <HeaderWithoutSearch />
      <h3 data-testid="page-title">Perfil</h3>
      <h3 data-testid="profile-email">{ currentEmail.email }</h3>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          onClick={ () => { localStorage.clear(); } }
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </Link>
      <Footer />
    </>
  );
}
