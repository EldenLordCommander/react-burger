import detailsStyle from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

function IngredientDetails({ item }) {

    return (
        <div>
            <div className={detailsStyle.imageBlock} >
                <img src={item.image_large} alt={item.name}></img>
            </div>
            <p className={`${detailsStyle.itemTitle} text text_type_main-medium`}>{item.name}</p>
            <div className={detailsStyle.burgerContent}>
                <div className={`${detailsStyle.contentItem} text text_type_main-default`}>
                    <span>Калории, ккал</span>
                    <p className="text text_type_digits-default">
                        {item.calories}
                    </p>
                </div>
                <div className={`${detailsStyle.contentItem} text text_type_main-default`}>
                    <span>Белки, г</span>
                    <p className="text text_type_digits-default">
                        {item.proteins}
                    </p>
                </div>
                <div className={`${detailsStyle.contentItem} text text_type_main-default`}>
                    <span>Жиры, г</span>
                    <p className="text text_type_digits-default">
                        {item.fat}
                    </p>
                </div>
                <div className={`${detailsStyle.contentItem} text text_type_main-default`}>
                    <span>Углеводы, г</span>
                    <p className="text text_type_digits-default">
                        {item.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    item: PropTypes.oneOfType([ingredientPropTypes]).isRequired,
}

export default IngredientDetails;