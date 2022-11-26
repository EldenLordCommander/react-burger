import React, { useRef, DragEvent, FC } from 'react';
import constructorStyles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import {
    DELETE_COMPONENT_ITEM
}
from '../../services/actions/constructor-actions';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { TBurgerConstructorItem } from '../../utils/types';


export const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({ item, index, moveCard }) => {
    const dispatch = useAppDispatch();

    const deleteComponent = () => {
        dispatch(({
            type: DELETE_COMPONENT_ITEM,
            payload: item
        }))
    }

    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
         hover(item : any, monitor) {
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
            const clientOffset : (any) = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            if (moveCard!==undefined)
            {
                moveCard(dragIndex, hoverIndex);
            }
            item.index = hoverIndex;
        }
    })
    
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: item.item._id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    const opacity = isDragging ? 0 : 1;
    if (item.item.type !== 'bun') drag(drop(ref));
    const preventDefault = (e: DragEvent<HTMLElement>) => e.preventDefault();

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
                handleClose={() => deleteComponent()}
            />
        </div>
    )
}


export default BurgerConstructorItem;