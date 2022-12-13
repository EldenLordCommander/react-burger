import detailsStyle from './ingredient-details.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../services/actions/ingredients-actions';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { DELETE_MODAL_ITEM } from '../../services/actions/modal-actions';

function IngredientDetails() {
    const { ingredientId } = useParams<{ingredientId : string}>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch({ type: DELETE_MODAL_ITEM })
        }
    }, [])

    const item = useAppSelector((store) => store.ingredient.data
        .filter((e) => e._id === ingredientId))[0];

    return (item && (
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
    )
}

export default IngredientDetails;