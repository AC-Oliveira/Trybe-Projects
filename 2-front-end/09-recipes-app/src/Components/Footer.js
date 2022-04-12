import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button type="button">
          <img src={ drinkIcon } alt="Icone de bebida" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img
            src={ exploreIcon }
            alt="Icone de explorar"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img src={ mealIcon } alt="Icone de comida" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}
export default Footer;
