import React, { useRef } from 'react';
import constructorStyles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import {
    DELETE_COMPONENT_ITEM
}
    from '../../services/actions/constructor-actions';


function BurgerConstructorItem({ item, index, moveCard }) {
    const dispatch = useDispatch();

    const deleteComponent = (id) => {
        dispatch(({
            type: DELETE_COMPONENT_ITEM,
            payload: item
        }))
    }

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
         hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })
    
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: item.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    const opacity = isDragging ? 0 : 1;
    if (item.type !== 'bun') drag(drop(ref));
    const preventDefault = (e) => e.preventDefault();

    return (
        <div className={constructorStyles.constructorIngregient} ref={ref} style={{opacity}} 
            onDrop={preventDefault} data-handler-id={handlerId}>
            <div>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={item.item.name}
                price={item.item.price}
                thumbnail={item.item.image_mobile}
                handleClose={(e) => deleteComponent(item)}
            />
        </div>
    )
}

BurgerConstructorItem.propTypes = {
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
    item: PropTypes.shape({
        item: PropTypes.oneOfType([ingredientPropTypes]).isRequired,
        uid:PropTypes.string.isRequired
    })
    
};

ConstructorElement.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructorItem;