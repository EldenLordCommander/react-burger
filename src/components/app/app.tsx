import React, { useEffect, useState, useContext } from 'react';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
//import Data from '../../utils/data.js'

export const IngredientContext = React.createContext([]);

function App() {
   const [state, setState] = useState({
      data: [],
      success: false
   });
   const url = "https://norma.nomoreparties.space/api/ingredients";

   useEffect(() => {
      fetch(url)
         .then((response) => {
            if (!response.ok) {
               throw new Error('Ответ от сервера вернул ошибку');
            }
            return response.json();
         })
         .then(
            result => setState({ data: result.data, success: result.success })
         )
         .catch(error => alert("Ошибка запроса: " + error))
   }, [])

   return (

      <div className={appStyles.app}>
         <AppHeader />
         {state.data && state.success &&
            <main className={appStyles.main}>
               <IngredientContext.Provider value={state.data}>
                  <BurgerIngredients />
                  <BurgerConstructor />
               </IngredientContext.Provider>
            </main >
         }
      </div >
   );
}


export default App;
