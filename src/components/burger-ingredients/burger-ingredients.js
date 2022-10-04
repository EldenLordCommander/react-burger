import React from 'react';
import ingredientStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import TabHeader from '../tab-header/tab-header';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';

function BurgerIngredients({ data }) {

    return (
        <div className={ingredientStyle.leftColumn}>
            <h1 className={`${ingredientStyle.title} text text_type_main-large`} >Соберите бургер</h1>
            <TabHeader />
            <div className={ingredientStyle.ingredientsList}>
                <section className={ingredientStyle.mainIngredientList}>
                    <div >
                        <p className={`${ingredientStyle.title} text text_type_main-medium`} >Булки</p>
                        {
                            data.filter((item) => {
                                if (item.type === 'bun') {
                                    return item;
                                }
                            })
                                .map((item) => (
                                    <div className={ingredientStyle.ingredient} key={item._id}>
                                        <Counter count={1} size="default" />
                                        <img src={item.image} className={ingredientStyle.priceBlock}></img>
                                        <p className="text text_type_main-default">{item.price}
                                            <CurrencyIcon type="primary" />
                                        </p>
                                        <p className="text text_type_main-default">{item.name}</p>
                                    </div>
                                )
                                )
                        }
                    </div>
                    <div className={ingredientStyle.ingredientList}>
                        <p className={`${ingredientStyle.title} text text_type_main-medium`}>Соусы</p>
                        {
                            data.filter((item) => {
                                if (item.type === 'sauce') {
                                    return item;
                                }
                            })
                                .map((item) => (
                                    <div className={ingredientStyle.ingredient} key={item._id}>
                                        <Counter count={1} size="default" />
                                        <img src={item.image} className={ingredientStyle.priceBlock}></img>
                                        <p className="text text_type_main-default">{item.price}
                                            <CurrencyIcon type="primary" />
                                        </p>
                                        <p className="text text_type_main-default">{item.name}</p>
                                    </div>
                                )
                                )
                        }
                    </div>
                    <div className={ingredientStyle.ingredientList}>
                        <p className={`${ingredientStyle.title} text text_type_main-medium`}>Начинка</p>
                        {
                            data.filter((item) => {
                                if (item.type === 'main') {
                                    return item;
                                }
                            })
                                .map((item) => (
                                    <div className={ingredientStyle.ingredient} key={item._id}>
                                        <Counter count={1} size="default" />
                                        <img src={item.image} className={ingredientStyle.priceBlock}></img>
                                        <p className="text text_type_main-default">{item.price}
                                            <CurrencyIcon type="primary" />
                                        </p>
                                        <p className="text text_type_main-default">{item.name}</p>
                                    </div>
                                )
                                )
                        }
                    </div>

                </section>
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}

export default BurgerIngredients;