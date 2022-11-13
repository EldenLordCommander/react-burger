import { BrowserRouter, Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ProtectedUnautorizedRoute from '../protected-route/protected-unautorized-route';
import ProtectedAutorizedRoute from '../protected-route/protected-autorized-route';
import MainPage from '../main-page/main-page.js'
import { LoginPage, ForgotPasswordPage, ProfilePage, RegistrationPage, ResetPasswordPage, OrdersPage } from '../../pages'
import AppHeader from '../app-header/app-header.js';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details.js';
import Modal from '../modal/modal.js';
import { getData } from '../../services/actions/ingredients-actions';
import { getCurrentUser, getUserWithRefresh } from '../../services/actions/user-action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {
   
   const ModalSwitch = () => {
      const location = useLocation();
      let background = location.state && location.state.background;
      
      const dispatch = useDispatch();
      useEffect(() => {
         dispatch(getData());
         dispatch(getUserWithRefresh());
         //dispatch(getCurrentUser());
       }, [dispatch]);

      return (
         <>
            <AppHeader />
            <Switch location={background || location}>
               <Route path='/' exact={true}>
                  <MainPage />
               </Route>
               <Route path="/login" exact={true}>
                  <LoginPage />
               </Route>
               <Route path="/forgot-password" exact={true}>
                  <ForgotPasswordPage />
               </Route>
               <Route path="/profile" exact>
                  <ProtectedUnautorizedRoute>
                     <ProfilePage />
                  </ProtectedUnautorizedRoute>
               </Route>
               <Route path="/register" exact={true}>
                  <RegistrationPage />
               </Route>
               <Route path="/reset-password" exact={true}>
                  <ResetPasswordPage />
               </Route>
               <Route path='/ingredients/:ingredientId' exact>
                  <IngredientDetails />
               </Route>
               <Route path='/profile/orders' exact>
                  <OrdersPage />
               </Route>
            </Switch>

            {background && (
               <Switch>
                  <Route
                     path='/ingredients/:ingredientId'
                     children={
                        <Modal title={'Детали ингридиента'}>
                           <IngredientDetails />
                        </Modal>
                     }
                  />
               </Switch>
            )}
         </>
      );
   }

   return (
      <BrowserRouter>
         <ModalSwitch />
      </BrowserRouter>
   );

}


export default App;


