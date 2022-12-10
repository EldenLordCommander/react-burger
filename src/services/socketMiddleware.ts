import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '..';
import { TWSActions } from '../utils/types';

export const socketMiddleware = (wsActions: TWSActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch, getState } = store;
            const { type, payload, wsUrl } = action;
            const { wsInit, onOpen, onClose, onError, onMessage, onSend } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                //console.log(socket);
                // функция, которая вызывается при открытии сокета
                socket.onopen = (event) => {
                    console.log('open');
                    dispatch({ type: onOpen });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    console.log('onmessage');
                    const data = JSON.parse(event.data);
                    if (data.success) {
                        dispatch({ type: onMessage, payload: data });
                    }
                    else {
                        socket?.close();
                    }
                };

                // функция, которая вызывается при закрытии соединения
                socket.onclose = (event) => {
                    console.log('close');
                    dispatch({ type: onClose, payload: event });
                };

                if (type === onClose) {
                    socket.close();
                }

                if (type === onSend) {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
}; 