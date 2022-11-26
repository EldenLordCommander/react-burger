import React, { useState, useRef, useEffect } from 'react';
import ingredientStyle from './burger-ingredients.module.css';
import TabHeader from '../tab-header/tab-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import IngredientItem from '../ingredient-item/ingredient-item';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { GET_MODAL_ITEM } from '../../services/actions/modal-actions';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { TIngredientType } from '../../utils/types';

function BurgerIngredients() {
    const data = useAppSelector((store) => store.ingredient.data);
    const dispatch = useAppDispatch();

    const bun = useRef<HTMLDivElement>(null);
    const sauce = useRef<HTMLDivElement>(null);
    const filling = useRef<HTMLDivElement>(null);
    const mainIngredientList = useRef<HTMLDivElement>(null);

    // const [openModal, setModal] = useState<boolean>(false);
    // const [selectedIngredient, setIngredient] = useState();

    const [current, setCurrent] = useState<string>('one');

    const handlerScroll = (tab : React.RefObject<HTMLDivElement>, current: string) => {
        setCurrent(current);
        
        if (tab.current !== null){
            tab.current.scrollIntoView({ block: "start", behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (mainIngredientList.current) {
            mainIngredientList.current.addEventListener("scroll", () => {
                const scrollTop = mainIngredientList.current !== null ? mainIngredientList.current.scrollTop : null;
                const bunHeight = bun.current !== null ? bun.current.offsetHeight : null;
                const sauseHeight = sauce.current !== null ? sauce.current.offsetHeight : null;
                if (scrollTop !== null &&  Number(scrollTop) < Number(bunHeight)) {
                    setCurrent("one");
                }
                else if (scrollTop !== null && Number(scrollTop) < Number(bunHeight) + Number(sauseHeight)) {
                    setCurrent("two");
                }
                else if (scrollTop !== null && Number(scrollTop) > Number(bunHeight) + Number(sauseHeight)) {
                    setCurrent("three");
                }
            });
        }
    }, []);


    const ingredientClick = (item : TIngredientType) => {
        //setModal(true);
        //setIngredient(item);
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
                </section>
            </div>
        </div>
    )
}


export default BurgerIngredients;