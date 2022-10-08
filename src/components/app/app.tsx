import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
//import Data from '../../utils/data.js'

function App() {
   const [state, setState] = useState({
      data:[],
      success:false 
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
            result => setState({data: result.data, success: result.success})
            )
         .catch(error => alert("Ошибка запроса: " + error))
   }, [])

   //console.log(state);
   return (
      <div className={appStyles.app}>
         <AppHeader />
         {state.data && state.success &&
            <main className={appStyles.main}>

               <BurgerIngredients data={state.data} />
               <BurgerConstructor data={state.data} />
            </main >
         }
      </div >
   );
}

export default App;
