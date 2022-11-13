import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ProtectedAutorizedRoute({ children, ...rest }) {
    const userLogin = useSelector((store) => store.login.success);
    console.log(userLogin);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                userLogin ? (
                    <Redirect
                        to={location.state.from.pathname}
                    />
                ) : (
                    children
                )
            }
        />
    );
} 