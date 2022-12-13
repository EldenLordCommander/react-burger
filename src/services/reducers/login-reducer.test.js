import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILED
} from '../actions/login-action'

import {
    PATCH_USER_FAILED,
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS
} from '../actions/update-action'

import {
    POST_USER_FAILED,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    CLEAR_USER_DATA
} from '../actions/user-action'
import { initialState, loginReducer } from '../reducers/login-reducer'
import { testRegistrationUser } from './reducers-test-data'

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(loginReducer(undefined, {})).toEqual(initialState)
    })

    it('POST_LOGIN_REQUEST', () => {
        expect(
            loginReducer(undefined, {
                type: POST_LOGIN_REQUEST
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: undefined,
                postRequest: true,
                postFailed: false,
            }
        )
    });

    it('POST_LOGIN_SUCCESS', () => {
        expect(
            loginReducer(undefined, {
                type: POST_LOGIN_SUCCESS,
                success: true,
                message: 'Ок',
                user: {
                    email: testRegistrationUser.email,
                    name: testRegistrationUser.name
                }
            })
        ).toEqual(
            {
                success: true,
                message: 'Ок',
                user: {
                    email: testRegistrationUser.email,
                    name: testRegistrationUser.name
                },
                postRequest: false,
                postFailed: false
            }
        )
    });

    it('POST_LOGIN_FAILED', () => {
        expect(
            loginReducer(undefined, {
                type: POST_LOGIN_FAILED
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: undefined,
                postRequest: false,
                postFailed: true,
            }
        )
    });

    it('PATCH_USER_REQUEST', () => {
        expect(
            loginReducer(undefined, {
                type: PATCH_USER_REQUEST
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: undefined,
                postRequest: true,
                postFailed: false,
            }
        )
    });

    it('PATCH_USER_SUCCESS', () => {
        expect(
            loginReducer(undefined, {
                type: PATCH_USER_SUCCESS,
                success: true,
                message: 'Ок',
                user: {
                    email: testRegistrationUser.email,
                    name: testRegistrationUser.name
                }
            })
        ).toEqual(
            {
                success: true,
                message: 'Ок',
                user: {
                    email: testRegistrationUser.email,
                    name: testRegistrationUser.name
                },
                postRequest: false,
                postFailed: false
            }
        )
    });

    it('PATCH_USER_FAILED', () => {
        expect(
            loginReducer(undefined, {
                type: PATCH_USER_FAILED
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: undefined,
                postRequest: false,
                postFailed: true,
            }
        )
    });

    it('POST_USER_REQUEST', () => {
        expect(
            loginReducer(undefined, {
                type: POST_USER_REQUEST
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: undefined,
                postRequest: true,
                postFailed: false,
            }
        )
    });

    it('POST_USER_SUCCESS', () => {
        expect(
            loginReducer(undefined, {
                type: POST_USER_SUCCESS,
                success: true,
                message: 'Ок',
                user: {
                    email: testRegistrationUser.email,
                    name: testRegistrationUser.name
                }
            })
        ).toEqual(
            {
                success: true,
                message: 'Ок',
                user: {
                    email: testRegistrationUser.email,
                    name: testRegistrationUser.name
                },
                postRequest: false,
                postFailed: false
            }
        )
    });

    it('POST_USER_FAILED', () => {
        expect(
            loginReducer(undefined, {
                type: POST_USER_FAILED
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: undefined,
                postRequest: false,
                postFailed: true,
            }
        )
    });

    it('CLEAR_USER_DATA', () => {
        expect(
            loginReducer(undefined, {
                type: CLEAR_USER_DATA
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: undefined,
                postRequest: false,
                postFailed: false,
            }
        )
    });
}) 