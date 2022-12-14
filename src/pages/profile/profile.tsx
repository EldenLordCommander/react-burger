import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserWithRefresh } from '../../services/actions/update-action';
import { logoutUser } from '../../services/actions/logout-actions';
import { CLEAR_USER_DATA } from '../../services/actions/user-action';
import { getUserWithRefresh } from '../../services/actions/user-action';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export function ProfilePage() {
    // const user = useSelector((store) => store.login.user)
    const user = useAppSelector((store) => store.login.user)
    const history = useHistory();

    const [name, setName] = useState<string>(user!.name);
    const [email, setEmail] = useState<string>(user!.email);
    const [password, setPassword] = useState<string|undefined>(user!.password);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserWithRefresh);
      }, [dispatch]);

    const regForm = {
        name: name,
        email: email,
        password: password
    }

    function saveNewInfo() {
        console.log(regForm);
        dispatch(updateUserWithRefresh(regForm));
        dispatch(getUserWithRefresh());
    }

    function logoutClick()
    {
        dispatch(logoutUser());
        dispatch({
            type: CLEAR_USER_DATA
          })
        history.replace({ pathname: '/login' });
    }

    function cancel() {
        setName('');
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <div className={styles.form}>
                <div className={styles.sideMenu}>
                    <div className={styles.row}>
                        <p className="text text_type_main-large">
                            <NavLink to="/profile" exact
                                activeClassName={styles.linkUsed}>
                                ??????????????
                            </NavLink>
                        </p>
                    </div>
                    <div className={styles.row}>
                        <p className="text text_type_main-large">
                            <NavLink to="/profile/orders" activeClassName={styles.linkUsed} exact>
                                ?????????????? ??????????????
                            </NavLink>
                        </p>
                    </div>
                    <div className={styles.row}>
                        <p className="text text_type_main-large">
                            <NavLink to="/login" exact>
                                <span onClick={(e)=>logoutClick()}>??????????</span>
                            </NavLink>
                        </p>
                    </div>
                    <div className={styles.textRow}>
                        <p className="text text_type_main-default">
                            ?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????
                        </p>
                    </div>
                </div>
                <div className={styles.profileForm}>
                    <div className={styles.row}>
                        <Input type='text'
                            value={!name && user ? user.name : name}
                            placeholder='??????'
                            onChange={(e) => {
                                setName(e.target.value)
                            }}>
                        </Input>
                    </div>
                    <div className={styles.row}>
                        <Input type='text'
                            value={!email && user ? user.email : email}
                            placeholder='E-mail'
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}></Input>
                    </div>
                    <div className={styles.row}>
                        <Input type='password'
                            value={password ? password : ''}
                            placeholder='????????????'
                            autoComplete='new-password'
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}></Input>
                    </div>
                    <div className={styles.row}>
                        <section hidden={(name && name != user!.name) 
                        || (email && email != user!.email)
                        || (password && password != '')
                        ? false : true}
                        className={(name && name != user!.name) 
                            || (email && email != user!.email)
                            || (password && password != '')
                            ? styles.row : ''}>
                            <p onClick={() => cancel()} className={styles.alignLeft}>
                                ????????????
                            </p>
                            &nbsp;
                            <Button htmlType={'button'} onClick={(e) => { saveNewInfo() }} >
                                ??????????????????
                            </Button>
                        </section>

                    </div>
                </div>
            </div>
        </>

    )
}

