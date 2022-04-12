import React from 'react';
import { Link } from 'react-router-dom';
// import HeaderWithoutSearch from './HeaderWithoutSearch';
import ProfileButton from './Utils/ProfileButton';
import Footer from '../Components/Footer';

export default function ExplorePage() {
  return (
    <div>
      {/* <h3 data-testid="page-title">Explorar</h3> */}
      {/* <HeaderWithoutSearch /> */}
      <header>
        <ProfileButton />
        <h3 data-testid="page-title" style={ { alignSelf: 'center' } }>Explorar</h3>
        <div>
          {}
        </div>
      </header>
      <Link to="/explorar/comidas">
        <button className="categoryButtons" data-testid="explore-food" type="button">
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button className="categoryButtons" data-testid="explore-drinks" type="button">
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}
