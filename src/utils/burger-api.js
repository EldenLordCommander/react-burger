const BASE_API_URL = 'https://norma.nomoreparties.space/api';

export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL = `${BASE_API_URL}/orders`;

export const getIngredients = () => {
    return fetch(INGREDIENTS_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ответ от сервера вернул ошибку');
            }
            return response.json();
        })
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

export const getOrderId = (clickedIngredients) => {
    return fetch(ORDERS_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            ingredients: clickedIngredients
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ответ от сервера вернул ошибку');
            }
            return response.json();
        })
        .then((result) => {
                return result;
            }
        )
        .catch(error => alert("Ошибка запроса: " + error))
}