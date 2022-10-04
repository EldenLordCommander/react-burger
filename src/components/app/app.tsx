import React from 'react';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Data from '../../utils/data.js'

function App() {

   return (
      <div className={appStyles.app}>
         <AppHeader />
         <main className={appStyles.main}>
            <BurgerIngredients data={Data} />
            <BurgerConstructor data={Data}  />
         </main >

      </div >
   );
}

export default App;
