import { useEffect } from 'react';
import appStyles from './main-page.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../services/actions/ingredients-actions';
import { getCurrentUser } from '../../services/actions/user-action';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useDispatch, useSelector } from 'react-redux';

function MainPage() {

   const dispatch = useDispatch();

   const data = useSelector(
      (store) => store.ingredient.data);

   // useEffect(() => {
   //    dispatch(getCurrentUser());
   // }, [dispatch])


   return (

      <div className={appStyles.app}>
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


export default MainPage;
