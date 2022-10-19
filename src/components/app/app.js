import { useEffect } from 'react';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../services/actions/ingredients-actions';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDispatch, useSelector } from 'react-redux';

function App() {

   const dispatch = useDispatch();

   const data = useSelector(
      (store) => store.ingredient.data);

   useEffect(() => {
      dispatch(getData())
   }, [dispatch])


   return (

      <div className={appStyles.app}>
         <AppHeader />
         <DndProvider backend={HTML5Backend}>
            {data && data.length > 0 &&
               <main className={appStyles.main}>
                  <BurgerIngredients />
                  <BurgerConstructor />
               </main >
            }
         </DndProvider>
      </div >
   );
}


export default App;
