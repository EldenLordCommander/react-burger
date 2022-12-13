import { TIngredientType, TOrderRequest } from '../../utils/types'
import { TConstrunctorItem } from './constructor-reducer';
import { TOrder } from './order-reducer';
import { TRegistrationUser } from './registration-reducer';

export const testModalItem: TIngredientType = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
};

export const testOrder: TOrder = {
    success: true,
    name: 'Тестовый заказ',
    order: {
        number: 100
    }
};

export const testDataArray: Array<TIngredientType> = [
    {
        _id: "60d3b41abdacab0026a733c6",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
    },
    {
        _id: "60d3b41abdacab0026a733c6",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
    }
]

export const testRegistrationUser: TRegistrationUser = {
    email: 'test@gmail.com',
    name: 'test_User'
}


export const testBun: TIngredientType = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
};

export const testComponent: TIngredientType = {
    _id: "60d3b41abdacab0026a733c8",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 11337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png"
};

export const testConstructorBun: TConstrunctorItem = {
    item: testBun,
    uid: '1'
}

export const testConstructorComponent: TConstrunctorItem = {
    item: testComponent,
    uid: '2'
}

export const testConstructorComponents: TConstrunctorItem[] = [
    {
        item: testComponent,
        uid: '2'
    }
]

export const testWSOrders: TOrderRequest = {
    total: 100,
    totalToday: 2,
    success: true,
    orders: [
        {
            _id: 'order1',
            status: 'done',
            number: 1,
            name: 'test order',
            createdAt: '',
            updateAt: '',
            ingredients: [
                '1','2'
            ]
        }
    ]
}