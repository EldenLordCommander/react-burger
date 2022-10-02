import React from 'react';
import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructor({ data }) {
    const firstIngredient = data[0];
    const lastIngredient = data[data.length - 1];
    const leftIngredients = data.slice(1, data.length - 1);

    return (
        <section>
            <section>
                <div style={{ marginTop: '16px', marginBottom: '16px' }} className={constructorStyles.constructorIngregient}>
                    <div style={{ opacity: 0 }}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={firstIngredient.name}
                        price={firstIngredient.price}
                        thumbnail={firstIngredient.image_mobile}
                    />
                </div>
            </section>
            <section className={constructorStyles.constructorItems}>
                {
                    leftIngredients.map((item, key) =>
                    (

                        <div className={constructorStyles.constructorIngregient} style={{ marginTop: '16px', marginBottom: '16px' }} key={key}>
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
                <div style={{ marginTop: '16px', marginBottom: '16px' }} className={constructorStyles.constructorIngregient}>
                    <div style={{ opacity: 0 }}>
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={lastIngredient.name}
                        price={lastIngredient.price}
                        thumbnail={lastIngredient.image_mobile}
                    />
                </div>
            </section>

        </section >

    )
}

BurgerConstructor.propTypes ={
    data : PropTypes.arrayOf(PropTypes.shape({
            name : PropTypes.string.isRequired,   
            image_mobile : PropTypes.string.isRequired,   
            price : PropTypes.number.isRequired   
        }).isRequired
    )
  }

ConstructorElement.propTypes = {
    text : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    thumbnail : PropTypes.string.isRequired
}

export default BurgerConstructor;