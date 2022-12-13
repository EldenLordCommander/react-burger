import { useState, useCallback, useEffect, FormEvent } from 'react';
import registerStyles from './register.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { savePassword } from '../../services/actions/registration-action';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';


export function RegistrationPage() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const history = useHistory();

    const status = useAppSelector((store) => store.registration.success);
    const userLogin = useAppSelector((store) => store.login.success);

    function registerUser(){
        const regForm={ 
            name: name,
            email: email,
            password: password
        }
        dispatch(savePassword(regForm))
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        registerUser();
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
                <Input type='text' value={name} name="name" placeholder='Имя' onChange={(e)=>{
                    setName(e.target.value)
                }}></Input>
            </div>
            <div className={registerStyles.row}>
                <Input type='email' value={email} name="email" placeholder='E-mail' onChange={(e)=>{
                    setEmail(e.target.value)
                }}></Input>
            </div>
            <div className={registerStyles.row}>
                <Input type='password' value={password} name="password" placeholder='Пароль' onChange={(e)=>{
                    setPassword(e.target.value)
                }}></Input>
            </div>
            <div className={registerStyles.button}>
                <Button htmlType={'submit'} type="primary" >Зарегистрироваться</Button>
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

