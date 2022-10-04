import React from 'react';
import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';


function BurgerConstructor({ data }) {
    const firstIngredient = data[0];
    const leftIngredients = data.slice(1, data.length - 1);

    return (
        <section className={constructorStyles.rightColumn}>
            <section>
                <div className={constructorStyles.borderItems}>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={firstIngredient.name + ' (верх)'}
                        price={firstIngredient.price}
                        thumbnail={firstIngredient.image_mobile}
                    />
                </div>
            </section>
            <section className={constructorStyles.constructorItems}>
                {
                    leftIngredients.map((item) =>
                    (
                        <div className={constructorStyles.constructorIngregient} key={item._id}>
                            <div>
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement

                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        </div>
                    ))
                }
            </section>
            <section>
                <div className={constructorStyles.borderItems}>

                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={firstIngredient.name + ' (низ)'}
                        price={firstIngredient.price}
                        thumbnail={firstIngredient.image_mobile}
                    />
                </div>
            </section>
            <section className={constructorStyles.checkout}>
                <div className={constructorStyles.price}>
                    <span className="text text_type_main-large">0</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" htmlType={'button'}>
                    Оформить заказ
                </Button>
            </section>

        </section >

    )
}


BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
}

ConstructorElement.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructor;