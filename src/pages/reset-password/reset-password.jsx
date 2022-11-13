import { useState, useEffect } from 'react';
import styles from './reset-password.module.css';
import { Button, Input, ShowIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { savePassword } from '../../services/actions/reset-password-action';

export function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const status = useSelector((store) => store.reset.success);
    const userLogin = useSelector((store) => store.login.success);

    function saveNewPassword(e) {
        e.preventDefault();
        const form = {
            password: password,
            token: token
        }
        dispatch(savePassword(form))
    }

    useEffect(() => {
        if (status === true) {
            history.replace({ pathname: '/login' });
        }
    }, [status]);

    if (userLogin) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    return (
        <>
            {location.state && location.state.pathname === "/forgot-password" ? (
                <div className={styles.resetForm}>
                    <div className={styles.row}>
                        <p className="text text_type_main-large">
                            Восстановление пароля
                        </p>
                    </div>
                    <div className={styles.row}>
                        <Input type='password' value={password} placeholder='Введите новый пароль' icon={ShowIcon}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        ></Input>
                    </div>
                    <div className={styles.row}>
                        <Input type='text' value={token} placeholder='Введите код из письма'
                            onChange={(e) => {
                                setToken(e.target.value)
                            }}
                        ></Input>
                    </div>
                    <div className={styles.button}>
                        <Button htmlType={'button'} type="primary" onClick={(e) => { saveNewPassword(e) }}>Сохранить</Button>
                    </div>
                    <div className={styles.textRow}>
                        <p className="text text_type_main-default text_color_inactive">
                            Вспомнили пароль? &nbsp;
                            <Link to="/login">
                                Войти
                            </Link>
                        </p>
                    </div>
                </div>
            ) : (
                <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
            )
            }
        </>

    )
}

