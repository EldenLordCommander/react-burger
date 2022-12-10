import styles from './order-list-image.module.css';
import { useAppSelector } from '../../utils/hooks';
import { Link, useLocation } from "react-router-dom";
import { FC } from 'react';

export const OrderListImage: FC<{index : number, ingredient: string}> = ({ index, ingredient }) => {
    const data = useAppSelector((store) => store.ingredient.data);
    
    const imgStyle = (index : number) => {
        if (index<5){
            return {
                'zIndex': 6 - index,
                'marginRight': -20
            }
        }
        else{
            return {
                'zIndex': 0,
                'marginRight': -20
            }
        }
    }

    return (
        <div className={styles.container} style={imgStyle(index)}>
            <img src={data.find(e => e._id === ingredient)!.image_mobile}
                className={index < 5 ? styles.imageBlock : styles.overflowImageBlock}
                alt={data.find(e => e._id === ingredient)!.name} />
            {
                index>5 ? (
                    <p className={`${styles.textInImage} text text_type_digits-default`}>+{index-5}</p>
                ) : ''
            }
        </div>
    )
}