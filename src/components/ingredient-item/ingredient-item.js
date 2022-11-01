import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyle from './ingredient-item.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details.js';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';
import { Link, useLocation } from "react-router-dom";

export default function IngredientItem({ item }) {
    const location = useLocation();

    const counter = useSelector((store) => item.type === 'bun'
        ? store.burgerConstructor.dataConstructor.bun
            .filter((e) => e.item._id === item._id).length
        : store.burgerConstructor.dataConstructor.components
            .filter((e) => e.item._id === item._id).length);

    const [{ opacity }, dndRef] = useDrag({
        type: 'ingredients',
        item: { item },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });


    return (
        <>
            <Link key={item._id}
                // className={styles.link}
                to={{
                    pathname: `/ingredients/${item._id}`,
                    state: { background: location },
                  }}
            >
                <div className={ingredientStyle.ingredient} key={item._id} ref={dndRef} style={{ opacity }}>
                    {counter !== 0 &&
                        <Counter count={counter} size="default" />
                    }
                    <img src={item.image} className={ingredientStyle.priceBlock} alt={item.name} ></img>
                    <p className="text text_type_main-default">{item.price}
                        <CurrencyIcon type="primary" />
                    </p>
                    <p className="text text_type_main-default">{item.name}</p>

                </div>

            </Link>
        </>
    )
}


