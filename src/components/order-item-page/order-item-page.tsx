import { useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { wsConnectionClosedAction, wsConnectionStartAction } from "../../services/actions/wsActions";
import { wsUrlAll, wsUrlUser } from "../../utils/burger-api";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import OrderItem from "../order-item/order-item";

export function OrderItemPage() {
    const { url } = useRouteMatch();
    const dispatch = useAppDispatch();
    const { id } = useParams<{id : string}>();
    const orders = useAppSelector(store => store.wsReducer.orders.orders);

    const wsUrl = url ===`/feed/${id}` ? wsUrlAll : wsUrlUser;

    useEffect(() => {
        dispatch(wsConnectionStartAction(wsUrl));
        return () => {
            dispatch(wsConnectionClosedAction());
        }
    }, []);

    return (orders &&
        <OrderItem />
    )
}