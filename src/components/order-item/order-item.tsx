import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { wsConnectionClosedAction, wsConnectionStartAction } from '../../services/actions/wsActions';
import { wsUrlAll, wsUrlUser } from '../../utils/burger-api';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { TOrder } from '../../utils/types';
import styles from './order-item.module.css';

export function OrderItem() {
    const { id } = useParams<{id : string}>();

    const orders = useAppSelector(store => store.wsReducer.orders.orders);
    const data = useAppSelector((store) => store.ingredient.data);
    const item = orders.find(e => e._id === id);


    const formatOrderDate = (orderDate : string) => {
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - new Date(orderDate).getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        let dayDiffrense = '';
        if (diffDays === 0) {
            dayDiffrense = 'Сегодня, ';
        }
        else if (diffDays === 1) {
            dayDiffrense = 'Вчера, ';
        }
        else {
            dayDiffrense = diffDays + ' дн. назад ';
        }
        return dayDiffrense + new Date(orderDate).toLocaleTimeString();
    }

    const calcOrderSumm = (ingredients: string[]) => {
        let sum = 0;
        for (var i = 0; i < ingredients.length; i++) {
            sum = sum + data.find(e => e._id === ingredients[i])!.price
        }
        return sum;
    }

    const getOrderStatus = (status: string) => {
        if (status === 'created') {
            return 'Создан';
        }
        if (status === 'pending') {
            return 'Ожидайте';
        }
        if (status === 'done') {
            return 'Готово';
        }
    }

    const onlyUnique = (value:any, index:number, self:any) => {
        return self.indexOf(value) === index;
    }


    return (
        <div className={styles.orderBlock}>
            <div>
                <p className={`${styles.headerTitle} text text_type_digits-default`}>#{item!.number}</p>
            </div>
            <div>
                <h1 className={`${styles.orderTitle} text text_type_main-medium`} >{item!.name}</h1>
            </div>
            <div>
                <h1 className={`${styles.statusTitle} text text_type_main-small`} >
                    {
                        getOrderStatus(item!.status)
                    }
                </h1>
            </div>
            <div>
                <h1 className={`${styles.orderTitle} text text_type_main-medium`} >Состав:</h1>
            </div>
            <div className={styles.ingredientList}>
                {
                    item!.ingredients.filter(onlyUnique).map((ingredient, index) => (
                        <div className={styles.orderIngredientCard} key={ingredient}>
                            <img
                                src={data.find(e => e._id === ingredient)!.image_mobile}
                                className={styles.imageBlock}
                                alt={data.find(e => e._id === ingredient)!.name} >
                            </img>
                            <p className={styles.ingredientName}>{data.find(e => e._id === ingredient)!.name}</p>
                            <p className={styles.price}>{item!.ingredients.filter(e => e === ingredient).length} X {data.find(e => e._id === ingredient)!.price}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    ))
                }
            </div>
            <div className={styles.footerBlock}>
                <p className={`${styles.footerBlockLeft} text text_type_main-small`}>{formatOrderDate(item!.createdAt)}</p>
                <p className={`${styles.footerBlockRight} text text_type_digits-default`}>{calcOrderSumm(item!.ingredients)}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}

export default OrderItem;