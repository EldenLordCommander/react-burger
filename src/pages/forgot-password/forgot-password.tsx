import { useState, useCallback, useEffect, FormEvent } from 'react';
import styles from './forgot-password.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../services/actions/forget-password-action';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';


export function ForgotPasswordPage() {
    const [email, setValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation();


    const resetStatus = useAppSelector((store) => store.forgetPassword.success);
    const message = useAppSelector((store) => store.forgetPassword.message);
    const userLogin = useAppSelector((store) => store.login.success);

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    function sendEmail() {
        dispatch(reset(email));
        history.replace({ pathname: '/reset-password', state: location });
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        sendEmail();
    }

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
        <form className={styles.forgotForm} action="submit" onSubmit={onSubmit}>
            <div className={styles.row}>
                <p className="text text_type_main-large">
                    Восстановление пароля
                </p>
            </div>
            <div className={styles.row}>
                <Input type='email' value={email} name="email" placeholder='Укажите e-mail'
                    onChange={e=>onChange(e)}></Input>
            </div>
            <div className={styles.button}>
                <Button htmlType={'submit'}>Восстановить</Button>
            </div>
            <div className={styles.textRow}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? &nbsp;
                    <Link to="/login">
                        Войти
                    </Link>
                </p>
            </div>
        </form>
    )
}

