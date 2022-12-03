import { useState, useEffect } from 'react';
import styles from './feed.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserWithRefresh } from '../../services/actions/update-action';
import { logoutUser } from '../../services/actions/logout-actions';
import { CLEAR_USER_DATA } from '../../services/actions/user-action';
import { getUserWithRefresh } from '../../services/actions/user-action';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { wsConnectionStartAction, wsConnectionClosedAction } from '../../services/actions/wsActions';
import { wsUrlAll } from '../../utils/burger-api';
import { OrdersList } from '../order-list/order-list';

export function Feed() {
    const user = useAppSelector((store) => store.login.user)
    const history = useHistory();
    const dispatch = useAppDispatch();
    const orders = useAppSelector(store => store.wsReducer.orders.orders);
    const total = useAppSelector(store => store.wsReducer.orders.total);
    const totalToday = useAppSelector(store => store.wsReducer.orders.totalToday);
    const data = useAppSelector((store) => store.ingredient.data);

    useEffect(() => {
        dispatch(wsConnectionStartAction(wsUrlAll));
        return () => {
            dispatch(wsConnectionClosedAction());
        }
    }, []);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.leftColumn}>
                    <h1 className={`${styles.title} text text_type_main-large`} >Лента заказов</h1>
                    {orders &&
                        <OrdersList orders={orders} />
                    }
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.statusList} >
                        <div className={styles.leftStatusColumn}>
                            <h1 className={`${styles.statusTitle} text text_type_main-medium`}>Готовы:</h1>
                            <div className={styles.statusDoneColumn}>
                                {orders &&
                                    orders.filter(e => e.status === 'done').slice(0,10).map((item, index) => (
                                        <p className={`${styles.doneOrders} text text_type_digits-default`} key={'done' + item.number}>{item.number}</p>
                                    ))
                                }
                            </div>
                            <div className={styles.statusDoneColumn}> 
                                {orders &&
                                    orders.filter(e => e.status === 'done').slice(10,20).map((item, index) => (
                                        <p className={`${styles.doneOrders} text text_type_digits-default`} key={'done' + item.number}>{item.number}</p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles.rightStatusColumn}>
                            <h1 className={`${styles.statusTitle} text text_type_main-medium`}>В работе:</h1>
                            <div>
                                {orders &&
                                    orders.filter(e => e.status === 'created').slice(10).map((item, index) => (
                                        <p className={`text text_type_digits-default`} key={'wait' + item.number}>{item.number}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderNumDiv}>
                        <h1 className={`${styles.title} text text_type_main-medium`} >Выполнено за все время:</h1>
                        <p className={`${styles.headerBlockLeft} text text_type_digits-large`}>{total}</p>
                    </div>
                    <div className={styles.orderNumDiv}>
                        <h1 className={`${styles.title} text text_type_main-medium`} >Выполнено за сегодня:</h1>
                        <p className={`${styles.headerBlockLeft} text text_type_digits-large`}>{totalToday}</p>
                    </div>
                </div>
            </div>

        </>

    )
}

