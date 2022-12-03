import { Route, Redirect, useLocation } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { TProtectedRoute } from '../../utils/types';

export const ProtectedUnautorizedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
    const userLogin = useAppSelector((store) => store.login.success);
    const location = useLocation();
    //console.log(userLogin);

    return (
        <Route
            {...rest}
            render={() =>
                userLogin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
} 

export default ProtectedUnautorizedRoute;