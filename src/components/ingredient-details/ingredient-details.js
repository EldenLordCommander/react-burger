import React, { useState } from 'react';
import detailsStyle from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

function IngredientDetails({ ingredient }) {
    return (
        <div>
            <div className={detailsStyle.imageBlock} >
                <img src={ingredient.image_large} alt={ingredient.name}></img>
            </div>
            <p className={`${detailsStyle.itemTitle} text text_type_main-medium`}>{ingredient.name}</p>
            <div className={detailsStyle.burgerContent}>
                <div className={`${detailsStyle.contentItem} text text_type_main-default`}>
                    <span>Калории, ккал</span>
                    <p className="text text_type_digits-default">
                        {ingredient.calories}
                    </p>
                </div>
                <div className={`${detailsStyle.contentItem} text text_type_main-default`}>
                    <span>Белки, г</span>
                    <p className="text text_type_digits-default">
                        {ingredient.proteins}
                    </p>
                </div>
                <div className={`${detailsStyle.contentItem} text text_type_main-default`}>
                    <span>Жиры, г</span>
                    <p className="text text_type_digits-default">
                        {ingredient.fat}
                    </p>
                </div>
                <div className={`${detailsStyle.contentItem} text text_type_main-default`}>
                    <span>Углеводы, г</span>
                    <p className="text text_type_digits-default">
                        {ingredient.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: PropTypes.oneOfType([ingredientPropTypes]).isRequired,
}

export default IngredientDetails;