import { useState, useEffect } from 'react';
import styles from './orders.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/actions/update-action';
import { logoutUser } from '../../services/actions/logout-actions';
import { CLEAR_USER_DATA } from '../../services/actions/user-action';


export function OrdersPage() {
    const user = useSelector((store) => store.login.user)
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch();
      }, [dispatch]);


    function logoutClick()
    {
        dispatch(logoutUser());
        dispatch({
            type: CLEAR_USER_DATA
          })
        history.replace({ pathname: '/login' });
    }

    return (
        <>
            <div className={styles.form}>
                <div className={styles.sideMenu}>
                    <div className={styles.row}>
                        <p className="text text_type_main-large">
                            <NavLink to="/profile" exact
                                activeClassName={styles.linkUsed}>
                                Профиль
                            </NavLink>
                        </p>
                    </div>
                    <div className={styles.row}>
                        <p className="text text_type_main-large">
                            <NavLink to="/profile/orders" activeClassName={styles.linkUsed} exact>
                                История заказов
                            </NavLink>
                        </p>
                    </div>
                    <div className={styles.row}>
                        <p className="text text_type_main-large">
                            <NavLink to="/login" exact>
                                <span onClick={(e)=>logoutClick()}>Выход</span>
                            </NavLink>
                        </p>
                    </div>
                    <div className={styles.textRow}>
                        <p className="text text_type_main-default">
                            В этом разделе вы можете изменить свои персональные данные
                        </p>
                    </div>
                </div>
                <div className={styles.profileForm}>
                    
                </div>
            </div>
        </>

    )
}

