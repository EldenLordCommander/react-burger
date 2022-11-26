import { useState, useCallback, useEffect } from 'react';
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

    function registerUser(e : React.SyntheticEvent<Element, Event>){
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

