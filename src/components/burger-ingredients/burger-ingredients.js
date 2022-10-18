import React, { useState, useContext, useRef, useEffect } from 'react';
import ingredientStyle from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import TabHeader from '../tab-header/tab-header';
import IngredientDetails from '../ingredient-details/ingredient-details.js';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import IngredientItem from '../ingredient-item/ingredient-item.js';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';

import { IngredientContext } from '../../services/burger-context.js'
//import { GET_MODAL_ITEM } from '../../services/actions/ingredients-actions';
import { GET_MODAL_ITEM } from '../../services/actions/modal-actions';

function BurgerIngredients() {
    const data = useSelector((store) => store.ingredient.data);
    const dispatch = useDispatch();

    const bun = useRef();
    const sauce = useRef();
    const filling = useRef();
    const mainIngredientList = useRef();


    const [openModal, setModal] = useState(false);
    const [selectedIngredient, setIngredient] = useState();

    const [current, setCurrent] = React.useState('one');

    const handlerScroll = (tab, current) => {
        setCurrent(current);
        tab.current.scrollIntoView({ block: "start", behavior: "smooth" });
    };


    useEffect(() => {
        if (mainIngredientList.current) {
            mainIngredientList.current.addEventListener("scroll", () => {
                const scrollTop = mainIngredientList.current.scrollTop;
                if (scrollTop < parseFloat(bun.current.offsetHeight)) {
                    setCurrent("one");
                }
                else if (scrollTop < parseFloat(bun.current.offsetHeight) + parseFloat(sauce.current.offsetHeight)) {
                    setCurrent("two");
                }
                else if (scrollTop > parseFloat(bun.current.offsetHeight) + parseFloat(sauce.current.offsetHeight)) {
                    setCurrent("three");
                }
            });
        }
    }, []);


    const ingredientClick = (item) => {
        //console.log(1);
        setModal(true);
        setIngredient(item);
        dispatch({ type: GET_MODAL_ITEM, item })
    }

    return (
        <div className={ingredientStyle.leftColumn}>
            <h1 className={`${ingredientStyle.title} text text_type_main-large`} >Соберите бургер</h1>
            <div className={ingredientStyle.tabDiv}>
                <Tab value="one" active={current === 'one'} onClick={() => handlerScroll(bun, 'one')}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => handlerScroll(sauce, 'two')}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={() => handlerScroll(filling, 'three')}>
                    Начинки
                </Tab>
            </div>
            <div className={ingredientStyle.ingredientsList} >
                <section className={ingredientStyle.mainIngredientList} ref={mainIngredientList}>
                    <div ref={bun}>
                        <p className={`${ingredientStyle.title} text text_type_main-medium`} >Булки</p>
                        {
                            data.filter((item) => {
                                if (item.type === 'bun') {
                                    return item;
                                }
                            })
                                .map((item) => (
                                    <span onClick={(e)=>ingredientClick(item)} key={item._id}>
                                        <IngredientItem item={item} />
                                    </span>
                                )
                                )
                        }
                    </div>
                    <div className={ingredientStyle.ingredientList} ref={sauce}>
                        <p className={`${ingredientStyle.title} text text_type_main-medium`}>Соусы</p>
                        {
                            data.filter((item) => {
                                if (item.type === 'sauce') {
                                    return item;
                                }
                            })
                                .map((item) => (
                                    <span onClick={(e)=>ingredientClick(item)} key={item._id}>
                                        <IngredientItem item={item} />
                                    </span>
                                )
                                )
                        }
                    </div>
                    <div className={ingredientStyle.ingredientList} ref={filling}>
                        <p className={`${ingredientStyle.title} text text_type_main-medium`}>Начинка</p>
                        {
                            data.filter((item) => {
                                if (item.type === 'main') {
                                    return item;
                                }
                            })
                                .map((item) => (
                                    <span onClick={(e)=>ingredientClick(item)} key={item._id}>
                                        <IngredientItem item={item}  />
                                    </span>
                                )
                                )
                        }
                    </div>
                    {openModal && selectedIngredient &&
                        <Modal setModalActive={setModal} title={'Детали ингридиента'} id={selectedIngredient._id}>
                            <IngredientDetails item={selectedIngredient} />
                        </Modal>
                    }
                </section>
            </div>
        </div>
    )
}


export default BurgerIngredients;