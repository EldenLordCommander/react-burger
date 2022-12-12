import { useState, useEffect } from 'react';
import loginStyles from './login.module.css';
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/actions/login-action';
import { Route, Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { Location } from "history";

export type TState = {
    from?: Location;
}
export function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const history = useHistory();
    
    const { state } = useLocation<TState>();
    

    const status = useAppSelector((store) => store.login.success);
    const userLogin = useAppSelector((store) => store.login.success);

    function login(e : React.SyntheticEvent<Element, Event>) {
        e.preventDefault();
        const regForm = {
            email: email,
            password: password
        }
        dispatch(loginUser(regForm))
    }

    // useEffect(() => {
    //     if (status === true) {
    //         history.replace({ pathname: '/' });
    //     }
    // }, [status]);

    if (userLogin) {
        return (
          <Redirect
            to={{
                //pathname: state.from?.pathname || '/'
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
                <Button htmlType={'button'} onClick={(e)=>{login(e)}} id="btnLogin">Войти</Button>
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

