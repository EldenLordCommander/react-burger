import React, { useState } from 'react';
import orderStyle from './order-details.module.css';
import checkImage from '../../images/done.png'
import PropTypes from 'prop-types';

function OrderDetails({ order }) {

    return (
        <div className={orderStyle.orderBlock}>
            <p className={`${orderStyle.itemTitle} text text_type_digits-large`}>{order.number}</p>
            <div className={`text text_type_main-default`}>
                <p className="text text_type_main-default">
                    Идентификатор заказа
                </p>
            </div>
            <div className={`${orderStyle.imageBlock} text text_type_main-default`}>
            <img src={checkImage} className={orderStyle.priceBlock} alt='Заказ принят'></img>

            </div>
            <div className={`text text_type_main-default`}>
                <p className="text text_type_main-default">
                    Ваш заказ начали готовить
                </p>
            </div>
            <div className={`${orderStyle.waitingText} text text_type_main-default`}>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    )
}

OrderDetails.propTypes = {
    order: PropTypes.shape({
        number: PropTypes.number,
    })
}


// BurgerIngredients.propTypes = {
//     data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
// }

export default OrderDetails;