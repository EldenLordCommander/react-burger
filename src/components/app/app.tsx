import React, { useEffect, useState, useContext } from 'react';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/burger-api.js'
import { IngredientContext } from '../../services/burger-context.js'

function App() {
   const [data, setState] = useState(null);

   useEffect(() => {
      getIngredients().then(setState);
   }, [])

   return (

      <div className={appStyles.app}>
         <AppHeader />
         {data &&
            <main className={appStyles.main}>
               <IngredientContext.Provider value={data}>
                  <BurgerIngredients />
                  <BurgerConstructor />
               </IngredientContext.Provider>
            </main >
         }
      </div >
   );
}


export default App;
