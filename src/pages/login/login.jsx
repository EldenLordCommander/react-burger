import { useState, useEffect } from 'react';
import loginStyles from './login.module.css';
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/actions/login-action';
import { Route, Redirect } from 'react-router-dom';

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const status = useSelector((store) => store.login.success);
    const userLogin = useSelector((store) => store.login.success);

    function login(e) {
        e.preventDefault();
        const regForm = {
            email: email,
            password: password
        }
        dispatch(loginUser(regForm))
    }

    useEffect(() => {
        if (status === true) {
            history.replace({ pathname: '/' });
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
        <div className={loginStyles.loginForm}>
            <div className={loginStyles.row}>
                <p className="text text_type_main-large">
                    Вход
                </p>
            </div>
            <div className={loginStyles.row}>
                <Input type='email' value={email} placeholder='E-mail'
                    onChange={(e) => { setEmail(e.target.value) }}>
                </Input>
            </div>
            <div className={loginStyles.row}>
                <Input type='password' placeholder='Пароль' value={password}
                    onChange={(e) => { setPassword(e.target.value) }}>
                </Input>
            </div>
            <div className={loginStyles.button}>
                <Button htmlType={'button'} onClick={(e)=>{login(e)}}>Войти</Button>
            </div>
            <div className={loginStyles.textRow}>
                <p className="text text_type_main-default text_color_inactive">
                    Вы новый пользователь? &nbsp;
                    <Link to="/register">
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
            <div className={loginStyles.textRow}>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль? &nbsp;
                    <Link to="/forgot-password">
                        Восстановить пароль
                    </Link>
                </p>
            </div>
        </div>
    )
}

