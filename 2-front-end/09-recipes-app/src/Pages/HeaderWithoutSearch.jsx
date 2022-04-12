import React from 'react';
import ProfileButton from './Utils/ProfileButton';
import '../App.css';

export default function HeaderWithoutSearch() {
  return (
    <header>
      <ProfileButton />
      <h3 data-testid="page-title" style={ { alignSelf: 'center' } }>Comidas</h3>
    </header>
  );
}
