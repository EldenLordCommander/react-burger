import React from 'react';
import appStyles from './app-header.module.css';

import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return (
        <header>
            <nav className={appStyles.navigation}>
                <div className={appStyles.constructorBlock}>
                    <BurgerIcon type="primary" />
                    Конструктор
                </div>
                <div className={appStyles.orderListBlock}>
                    <ListIcon type="primary" />
                    Лента заказов
                </div>
                <div>
                    <Logo />
                </div>
                <div className={appStyles.personalBlock}>
                    <ProfileIcon type="primary" />
                    Личный кабинет
                </div>

            </nav>
        </header>

    )
}

export default AppHeader;