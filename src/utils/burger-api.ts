import { TMainForm, TRegisterForm, TResetForm } from "./types";

const BASE_API_URL = 'https://norma.nomoreparties.space/api';

export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL = `${BASE_API_URL}/orders`;
export const RESET_PASSWORD_URL = `${BASE_API_URL}/password-reset`;
export const SAVE_PASSWORD_URL = `${BASE_API_URL}/password-reset/reset`;
export const REGISTER_URL = `${BASE_API_URL}/auth/register`;
export const LOGIN_URL = `${BASE_API_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
export const TOKEN_URL = `${BASE_API_URL}/auth/token`;
export const USER_URL = `${BASE_API_URL}/auth/user`;


export function checkResponse(response: Response) {
    if (!response.ok) {
        throw new Error('Ответ от сервера вернул ошибку');
    }
    return response.json();
}

export function setCookie(name: string, value: string, props: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getIngredients = () => {
    return fetch(INGREDIENTS_URL)
        .then(checkResponse)
        .then((result) => {
            if (result.success) {
                return result.data
            }
            else {
                throw new Error('API вернуло ошибку');
            }
        }
        )
        .catch(error => alert("Ошибка запроса: " + error))
}

export const getOrderId = (clickedIngredients: Array<string>) => {
    return fetch(ORDERS_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            ingredients: clickedIngredients
        })
    })
        .then(checkResponse)
        .then((result) => {
            return result;
        }
        )
        .catch(error => alert("Ошибка запроса: " + error))
}

export const resetPassword = (email: string) => {
    return fetch(RESET_PASSWORD_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: email
        })
    })
        .then(checkResponse)
        .then((result) => {
            return result;
        }
        )
        .catch(error => alert("Ошибка запроса: " + error))
}

export const setPassword = (form : TRegisterForm) => {
    return fetch(SAVE_PASSWORD_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form)
    })
        .then(checkResponse)
        .then((result) => {
            return result;
        }
        )
        .catch(error => alert("Ошибка запроса: " + error))
}

export const registerUser = (form : TRegisterForm) => {
    //console.log(JSON.stringify(form));
    return fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form)
    })
        .then(checkResponse)
        .then((result) => {
            if (result.success) {
                let accessToken = result.accessToken.split('Bearer ')[1]
                if (accessToken) {
                    setCookie('accessToken', accessToken, { expires: 3600 });
                }
                localStorage.setItem('refreshToken', result.refreshToken);

                return result;
            }
        })
        .catch(error => alert("Ошибка запроса: " + error))
}

export const login = (form : TMainForm) => {
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form)
    })
        .then(checkResponse)
        .then((result) => {
            console.log(result);
            if (result.success) {
                let accessToken = result.accessToken.split('Bearer ')[1]
                if (accessToken) {
                    setCookie('accessToken', accessToken, { expires: 3600 });
                }
                localStorage.setItem('refreshToken', result.refreshToken);

                return result;
            }
        })
        .catch(error => alert("Ошибка запроса: " + error))
}

export const updateToken = () => {
    return fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    })
        .then(checkResponse)
        .then((result) => {
            if (result.success) {
                let accessToken = result.accessToken.split('Bearer ')[1]
                if (accessToken) {
                    setCookie('accessToken', accessToken, { expires: 3600 });
                }
                localStorage.setItem('refreshToken', result.refreshToken);

                return result;
            }
        })
        .catch(error => alert("Ошибка запроса: " + error))
}

const checkUserResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
  };

export const refreshTokenRequest = () => {
    return fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
        .then(checkResponse)
        .then((result) => {
            return result;
        })
}

export const fetchWithRefresh = async () => {
    try {
        const res = await fetch(USER_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: 'Bearer ' + getCookie('accessToken')
            }
        });
        return await checkUserResponse(res);
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            const { refreshToken, accessToken } = await refreshTokenRequest();
            setCookie('accessToken', accessToken.split("Bearer ")[1], { expires: 3600 });
            localStorage.setItem('refreshToken', refreshToken);

            const res = await fetch(USER_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: 'Bearer ' + getCookie('accessToken')
                }
            });

            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}

export const updateWithRefresh = async (form : TRegisterForm) => {
    try {
        const res = await fetch(USER_URL, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify(form)
        });
        return await checkUserResponse(res);
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            const { refreshToken, accessToken } = await refreshTokenRequest();
            setCookie('accessToken', accessToken.split("Bearer ")[1], { expires: 3600 });
            localStorage.setItem('refreshToken', refreshToken);

            const res = await fetch(USER_URL, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: 'Bearer ' + getCookie('accessToken')
                },
                body: JSON.stringify(form)
            })

            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}

export const getUser = () => {
    return fetch(USER_URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
        .then(checkResponse)
        .then((result) => {
            return result;
        })
}

export const logout = () => {
    return fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    })
        .then(checkResponse)
        .then((result) => {
            if (result.success) {
                localStorage.setItem('refreshToken', '')
                setCookie('accessToken', '', {expires: 0})
                //window.location.reload();
            }
        })
        .catch(error => alert("Ошибка запроса: " + error))
}

export const updateUserData = (form : TRegisterForm) => {
    return fetch(USER_URL, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(form)
    })
        .then(checkResponse)
        .then((result) => {
            return result;
        })
        .catch(error => alert("Ошибка запроса: " + error))
}