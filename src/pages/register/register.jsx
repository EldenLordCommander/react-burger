import { useState, useCallback, useEffect } from 'react';
import registerStyles from './register.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { savePassword } from '../../services/actions/registration-action';


export function RegistrationPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const status = useSelector((store) => store.registration.success);
    const userLogin = useSelector((store) => store.login.success);

    function registerUser(e){
        e.preventDefault();
        const regForm={ 
            name: name,
            email: email,
            password: password
        }
        dispatch(savePassword(regForm))
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

        <form className={registerStyles.registerForm} action="submit">
            <div className={registerStyles.row}>
                <p className="text text_type_main-large">
                    Регистрация
                </p>
            </div>
            <div className={registerStyles.row}>
                <Input type='text' value={name} placeholder='Имя' onChange={(e)=>{
                    setName(e.target.value)
                }}></Input>
            </div>
            <div className={registerStyles.row}>
                <Input type='email' value={email} placeholder='E-mail' onChange={(e)=>{
                    setEmail(e.target.value)
                }}></Input>
            </div>
            <div className={registerStyles.row}>
                <Input type='password' value={password} placeholder='Пароль' onChange={(e)=>{
                    setPassword(e.target.value)
                }}></Input>
            </div>
            <div className={registerStyles.button}>
                <Button htmlType={'button'} type="primary" onClick={(e)=>{registerUser(e)}}>Зарегистрироваться</Button>
            </div>
            <div className={registerStyles.textRow}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? &nbsp;
                    <Link to="/login">
                        Войти
                    </Link>
                </p>
            </div>
        </form>
    )
}

