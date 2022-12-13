import { BrowserRouter, Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ProtectedUnautorizedRoute from '../protected-route/protected-unautorized-route';
import MainPage from '../main-page/main-page'
import { LoginPage, ForgotPasswordPage, ProfilePage, RegistrationPage, ResetPasswordPage, OrdersPage } from '../../pages'
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { getData } from '../../services/actions/ingredients-actions';
import { getCurrentUser, getUserWithRefresh } from '../../services/actions/user-action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { TLocationState } from '../../utils/types';
import { Feed } from '../feed/feed';
import { OrderItem } from '../order-item/order-item';
import { OrderItemPage } from '../order-item-page/order-item-page';
import { getCookie } from '../../utils/burger-api';


function App() {

   const ModalSwitch = () => {
      const location = useLocation();
      const isAuthorized = getCookie("accessToken");
      const { state } = location as TLocationState;
      let background = location.state && state.background;
      const history = useHistory();

      const dispatch = useAppDispatch();
      useEffect(() => {
         console.log(isAuthorized);
         dispatch(getData());
         if (isAuthorized){
            dispatch(getUserWithRefresh());
         }
         //dispatch(getUserWithRefresh());
         //dispatch(getCurrentUser());
      }, [dispatch]);

      const closeModal = () => {
         history.goBack();
     }

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
               <Route path='/feed' exact>
                  <Feed />
               </Route>
               <Route path='/feed/:id' exact>
                  <OrderItemPage />
               </Route>
               <Route path='/profile/orders' exact>
                  <ProtectedUnautorizedRoute>
                     <OrdersPage />
                  </ProtectedUnautorizedRoute>
               </Route>
               <Route path='/profile/orders/:id' exact>
                  <ProtectedUnautorizedRoute>
                     <OrderItemPage />
                  </ProtectedUnautorizedRoute>
               </Route>
            </Switch>

            {background && (
               <Switch>
                  <Route
                     path='/ingredients/:ingredientId'
                     children={
                        <Modal title={'Детали ингридиента'} setActive={closeModal}>
                           <IngredientDetails />
                        </Modal>
                     }
                  />
                  <Route
                     path='/feed/:id'
                     children={
                        <Modal title={'Детали заказа'} setActive={closeModal}>
                           <OrderItemPage />
                        </Modal>
                     }
                  />
                  <Route
                     path='/profile/orders/:id'
                     children={
                        <Modal title={'Детали заказа'} setActive={closeModal}>
                           <ProtectedUnautorizedRoute>
                              <OrderItemPage />
                           </ProtectedUnautorizedRoute>
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


