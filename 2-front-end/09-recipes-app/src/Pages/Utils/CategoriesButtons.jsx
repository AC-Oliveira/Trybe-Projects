import React from 'react';
import PropTypes from 'prop-types';

export default function CategoriesButtons({ props: { mealsCategories, categoryToogle,
  fetchMealAPI, setCategoryToogle, mealsAndInputs, setMealsAndInputs } }) {
  const TWELVE = 12;
  const handleMealCatecory = async (category) => {
    const buttonCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(buttonCategory).then((resp) => resp.json());
    const categoryMeals = [...response.meals.slice(0, TWELVE)];
    setMealsAndInputs({ ...mealsAndInputs, meals: categoryMeals });
  };

  return (
    <>
      {
        mealsCategories.map(
          (category) => (
            <button
              className="categoryButtons"
              type="button"
              key={ category }
              onClick={ () => {
                if (categoryToogle.toogle) {
                  if (category === categoryToogle.category) {
                    fetchMealAPI();
                    setCategoryToogle({ category, toogle: !categoryToogle.toogle });
                  }
                  if (category !== categoryToogle.category) {
                    handleMealCatecory(category);
                    setCategoryToogle({ category, toogle: categoryToogle.toogle });
                  }
                }
                if (!categoryToogle.toogle) {
                  handleMealCatecory(category);
                  setCategoryToogle({ category, toogle: !categoryToogle.toogle });
                }
              } }
              data-testid={ `${category}-category-filter` }
            >
              {category}
            </button>),
        )
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchMealAPI }
      >
        All
      </button>
    </>
  );
}

CategoriesButtons.propTypes = {
  props: {
    mealsCategories: PropTypes.string,
    categoryToogle: PropTypes.string,
    fetchMealAPI: PropTypes.string,
    setCategoryToogle: PropTypes.string,
    mealsAndInputs: PropTypes.string,
    setMealsAndInputs: PropTypes.string,
  }.isRequired,
};
