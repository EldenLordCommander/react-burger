import React, { useState, useContext, useEffect, setState, useReducer, useCallback } from 'react';
import constructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details.js';
import { getOrderId } from '../../utils/burger-api.js'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { ADD_BUN_ITEM, 
    DELETE_BUN_ITEM, 
    ADD_COMPONENT_ITEM,
    DELETE_COMPONENT_ITEM  } 
    from '../../services/actions/constructor-actions';
import { UPDATE_CONSTRUCTOR_LIST } from '../../services/actions/constructor-actions';
import { v4 as uuidv4 } from 'uuid';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { getOrder } from '../../services/actions/order-action';

import { IngredientContext } from '../../services/burger-context.js'

const OrderContext = React.createContext(null);


function BurgerConstructor() {
    const data = useSelector((store) => store);
    //console.log(data);
    const dispatch = useDispatch();

    const dataConstructor = useSelector((store) => store.burgerConstructor.dataConstructor);
    const firstIngredient = dataConstructor.bun;
    const leftIngredients = dataConstructor.components;
    const totalPrice = useSelector((store) => store.burgerConstructor.total);

    
    const [{ isHover }, dropTargerRef] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.item!==undefined)
            {
                if (item.item.type === 'bun') {
                    if (firstIngredient.length>0) {
                        dispatch({
                            type: DELETE_BUN_ITEM,
                            item: item
                        })
                        dispatch({
                            type: ADD_BUN_ITEM,
                            payload: {
                                ...item,
                                uid:uuidv4()
                            }
                        })
                    }
                    else
                    {
                        dispatch({
                            type: ADD_BUN_ITEM,
                            payload: {
                                ...item,
                                uid:uuidv4()
                            }
                        })
                    }
                }
                else {

                    dispatch({
                        type: ADD_COMPONENT_ITEM,
                        payload: {
                            ...item,
                            uid:uuidv4()
                        }
                    })
                }
            }
        }
    });

    const [openModal, setModal] = useState(false);
    //const [clickedIngredients, setIngredients] = useState([]);
    // const initialPriceState = { price: firstIngredient.price * 2 };
    // const [priceState, priceDispatcher] = useReducer(reducer, initialPriceState);

    const [orderData, setOrder] = useState({
        name: '',
        order: {},
        success: false
    });

    const components = useSelector((store) => store.burgerConstructor.dataConstructor.components.map((e) => e.item._id));
    
    const order = useSelector(
        (store) => store.order);

    const orderClick = () => {
        if ((firstIngredient.length>0)||(components.length>0)){
            const orderElements = [firstIngredient[0].item._id, ...components, firstIngredient[0].item._id];
            //console.log(orderElements);
            dispatch(getOrder(orderElements));
            setModal(true);
        }
    }

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = leftIngredients[dragIndex];
    const newCards = [...leftIngredients]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    dispatch({
      type: UPDATE_CONSTRUCTOR_LIST,
      payload: newCards,
    })
  }, [leftIngredients, dispatch]);
    


    return (
        <section>
            <section className={`${isHover ? constructorStyles.onHover : ''} ${constructorStyles.rightColumn}`} ref={dropTargerRef}>
                <section>
                    <div className={constructorStyles.borderItems}>
                        {firstIngredient && firstIngredient.length > 0 &&
                            <ConstructorElement
                                type='top'
                                isLocked={true}
                                text={firstIngredient[0].item.name + ' (верх)'}
                                price={firstIngredient[0].item.price}
                                thumbnail={firstIngredient[0].item.image_mobile}
                            />
                        }

                    </div>
                </section>
                <section className={constructorStyles.constructorItems}>
                    {leftIngredients &&
                        leftIngredients.map((item, index) =>
                        (
                            <BurgerConstructorItem item={item} key={item.uid} index={index} moveCard={moveCard}/>
                        )
                        )
                    }
                </section>
                <section>
                    <div className={constructorStyles.borderItems}>
                        {firstIngredient && firstIngredient.length > 0 &&
                            <ConstructorElement
                                type='bottom'
                                isLocked={true}
                                text={firstIngredient[0].item.name + ' (верх)'}
                                price={firstIngredient[0].item.price}
                                thumbnail={firstIngredient[0].item.image_mobile}
                            />
                        }
                    </div>
                </section>
                <section className={constructorStyles.checkout}>
                    <div className={constructorStyles.price}>
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>

                    <Button type="primary" size="large" htmlType={'button'} onClick={orderClick}>
                        Оформить заказ
                    </Button>
                </section>

            </section >
            {openModal && order.order.order &&
                <Modal setModalActive={setModal}>
                    <OrderDetails />
                </Modal>
            }
        </section>

    )
}


ConstructorElement.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}


export default BurgerConstructor;