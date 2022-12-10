import React from 'react';
import appStyles from './app-header.module.css';
import { NavLink } from "react-router-dom";

import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return (
        <header>
            <nav className={appStyles.navigation}>
                <div className={appStyles.constructorBlock}>
                    <NavLink to="/" activeClassName={appStyles.linkUsed} exact>
                        <BurgerIcon type="primary" />
                        Конструктор
                    </NavLink>
                </div>
                <div className={appStyles.orderListBlock}>
                    <NavLink to="/feed" activeClassName={appStyles.linkUsed} exact>
                        <ListIcon type="primary" />
                        Лента заказов
                    </NavLink>
                </div>
                <div>
                    <Logo />
                </div>
                <div className={appStyles.personalBlock}>
                    <NavLink to="/profile" activeClassName={appStyles.linkUsed} exact>
                        <ProfileIcon type="primary" />
                        Личный кабинет
                    </NavLink>
                </div>

            </nav>
        </header>

    )
}

export default AppHeader;