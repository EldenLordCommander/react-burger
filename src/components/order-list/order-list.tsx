import styles from './order-list.module.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { OrderListImage } from '../order-list-image/order-list-image';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { TOrder } from '../../utils/types';
import { wsConnectionClosedAction } from '../../services/actions/wsActions';

export const OrdersList: FC<{ orders: TOrder[] }> = ({orders}) => {
    const user = useAppSelector((store) => store.login.user)
    const data = useAppSelector((store) => store.ingredient.data);
    const location = useLocation();
    const { url } = useRouteMatch();
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(wsConnectionClosedAction());
        }
    }, []);

    const imgStyle = (index: number) => {
        return {
            'zIndex': 6 - index,
            'marginRight': -16
        }
    }

    const formatOrderDate = (orderDate: string) =>{
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - new Date(orderDate).getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 
        let dayDiffrense = '';
        if (diffDays===0){
            dayDiffrense = 'Сегодня, ';
        }
        else if (diffDays===1){
            dayDiffrense = 'Вчера, ';
        }
        else{
            dayDiffrense = diffDays + ' дн. назад ';
        }
        return dayDiffrense + new Date(orderDate).toLocaleTimeString();
    } 

    const calcOrderSumm = (ingredients: string[]) => {
        let sum=0;
        for (var i=0; i<ingredients.length;i++){
            sum = sum + data.find(e => e._id === ingredients[i])!.price
        }
        return sum;
    }

    const getOrderStatus = (status: string) => {
        if (status === 'created'){
            return 'Создан';
        }
        if (status === 'pending'){
            return 'Ожидайте';
        }
        if (status === 'done'){
            return 'Готово';
        }
    }

    return (
        <>
            <section className={styles.mainOrdertList}>
                {orders &&
                    orders.map((item, index) =>
                    (
                        <Link key={item._id} className={styles.clearLink}
                            to={{
                                state: { background: location },
                                pathname: `${url}/${item._id}`
                            }}
                        >
                            <div key={item._id} className={styles.orderBlock}>
                                <div className={styles.headerBlock}>
                                    <p className={`${styles.headerBlockLeft} text text_type_digits-default`}>#{item.number}</p>
                                    <p className={`${styles.headerBlockRight} text text_type_main-small`}>{formatOrderDate(item.createdAt)}</p>
                                </div>
                                <div>
                                    <h1 className={`${styles.orderTitle} text text_type_main-medium`} >{item.name}</h1>
                                </div>
                                {user &&
                                    <div>
                                        <h1 className={`${styles.orderTitle} text text_type_main-small`} >
                                            {
                                                getOrderStatus(item.status)
                                            }
                                        </h1>
                                    </div>
                                }
                                <div className={styles.footerBlock}>
                                    <div className={styles.imageRow}>
                                        {
                                            item.ingredients.length>5 ? (
                                                <>
                                                    {
                                                        item.ingredients.map((ingredient, index) => (
                                                            index < 5 ? (
                                                                <OrderListImage index={index} ingredient={ingredient} key={item.number+index}/>
                                                                
                                                            ) : ''
                                                        ))
                                                    }
                                                    <div>
                                                        <OrderListImage index={item.ingredients.length} ingredient={item.ingredients[5]}/>
                                                        
                                                    </div>
                                                </>
                                            ) : (
                                                item.ingredients.map((ingredient, index) => (
                                                    index < 5 ? (
                                                        <OrderListImage index={index} ingredient={ingredient} key={item.number+index}/>
                                                        
                                                    ) : ''
                                                ))
                                            )
                                        }
                                    </div>
                                    <div className={`${styles.footerBlockRight} text text_type_digits-default`}>
                                        {calcOrderSumm(item.ingredients)}
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                    )
                }
            </section>

        </>

    )
}

