import React from 'react';
import ingredientStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients({ data }) {

    return (
        <section className={ingredientStyle.mainIngredientList}>
            <div className={ingredientStyle.ingredientList}>
                <p className="text text_type_main-medium" style={{ textAlign: 'left' }}>Булки</p>
                {
                    data.filter((item) => {
                        if(item.type==='bun')
                        {
                            return item;
                        }
                    })
                    .map((item, key) => (
                        <div className={ingredientStyle.ingredient} key={key}>
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
                <p className="text text_type_main-medium" style={{ textAlign: 'left' }}>Соусы</p>
                {
                    data.filter((item) => {
                        if(item.type==='sauce')
                        {
                            return item;
                        }
                    })
                    .map((item, key) => (
                        <div className={ingredientStyle.ingredient} key={key}>
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
                <p className="text text_type_main-medium" style={{ textAlign: 'left' }}>Начинка</p>
                {
                    data.filter((item) => {
                        if(item.type==='main')
                        {
                            return item;
                        }
                    })
                    .map((item, key) => (
                        <div className={ingredientStyle.ingredient} key={key}>
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
    )
}

BurgerIngredients.propTypes ={
    data : PropTypes.arrayOf(PropTypes.shape({
        name : PropTypes.string.isRequired,   
        image : PropTypes.string.isRequired,   
        price : PropTypes.number.isRequired   
    }).isRequired

    )
  }

export default BurgerIngredients;