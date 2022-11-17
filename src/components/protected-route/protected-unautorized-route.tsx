import { Route, Redirect } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { TProtectedRoute } from '../../utils/types';

export const ProtectedUnautorizedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
    const userLogin = useAppSelector((store) => store.login.success);
    //console.log(userLogin);

    return (
        <Route
            {...rest}
            render={({ location }) =>
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