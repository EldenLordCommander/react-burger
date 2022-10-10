import React, { useState, useContext, useEffect, setState, useReducer } from 'react';
import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details.js';

import { IngredientContext } from '../app/app';

const OrderContext = React.createContext(null);


function BurgerConstructor() {
    const data = useContext(IngredientContext);
    const firstIngredient = data[0];
    const leftIngredients = data.slice(1, data.length - 1);
    const [openModal, setModal] = useState(false);
    const url = 'https://norma.nomoreparties.space/api/orders';
    const [clickedIngredients, setIngredients] = useState([firstIngredient._id]);

    const initialPriceState = { price: firstIngredient.price * 2 };
    //const [price, setPrice] = useState(null);
    const [priceState, priceDispatcher] = useReducer(reducer, initialPriceState);

    const [orderData, setOrder] = useState({
        name: '',
        order: {},
        success:false
    });

    const orderClick = () => {
        getOrderId();
        setModal(true);
        console.log(clickedIngredients);
        
    }

    const getOrderId = () => {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }, 
            body: JSON.stringify({
                //ingredients : data.map((ingredient)=>ingredient._id)})
                ingredients : clickedIngredients })
            })
           .then((response) => {
              if (!response.ok) {
                 throw new Error('Ответ от сервера вернул ошибку');
              }
              return response.json();
           })
           .then(
              result => setOrder({ name: result.name, order: result.order, success: result.success })
           )
           .catch(error => alert("Ошибка запроса: " + error))
     }

     const itemClickTest = (e) =>{
        priceDispatcher({type: 'addIngredient', price: e.price});
        setIngredients([...clickedIngredients, e._id]);
    }

     function reducer(state, action) {  
        switch (action.type) {
          case "addIngredient":
            return { 
                price: state.price + action.price 
            };
          case "deleteIngredient":
            return { 
                price: state.price - action.price 
            };
          default:
            throw new Error(`Wrong type of action: ${action.type}`);
        }
      }


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
                    
                    leftIngredients.filter((item) => {
                        if (item.type !== 'bun') {
                            return item;
                        }
                    })
                    .map((item) =>
                    (
                        <div className={constructorStyles.constructorIngregient} key={item._id} onClick={()=>itemClickTest(item)}>
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
                    <span className="text text_type_digits-medium">{priceState.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" htmlType={'button'} onClick={orderClick}>
                    Оформить заказ
                </Button>
            </section>
            {openModal &&
                <Modal setModalActive={setModal}>
                    <OrderDetails order={orderData.order} />
                </Modal>
            }
        </section >

    )
}


// BurgerConstructor.propTypes = {
//     data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
// }
BurgerConstructor.propTypes = {
    IngredientContext: PropTypes.shape({
        data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    })
}

ConstructorElement.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructor;