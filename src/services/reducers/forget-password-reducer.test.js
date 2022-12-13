import { POST_PASSWORD_REQUEST,
    POST_PASSWORD_SUCCESS,
    POST_PASSWORD_FAILED
 } from '../actions/forget-password-action'
 import { initialState, forgetPasswordReducer } from '../reducers/forget-password-reducer'

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(forgetPasswordReducer(undefined, {})).toEqual(initialState)
    })

    it('POST_PASSWORD_REQUEST', () => {
        expect(
            forgetPasswordReducer(undefined, {
                type: POST_PASSWORD_REQUEST
            })
        ).toEqual(
            {
                success: false,
                message: '',
                postRequest: true,
                postFailed: false,
            }
        )
    });

    it('POST_PASSWORD_SUCCESS', () => {
        expect(
            forgetPasswordReducer(undefined, {
                type: POST_PASSWORD_SUCCESS,
                success: true,
                message: 'Ок',
            })
        ).toEqual(
            {
                success: true,
                message: 'Ок',
                postRequest: false,
                postFailed: false
            }
        )
    });

    it('POST_PASSWORD_FAILED', () => {
        expect(
            forgetPasswordReducer(undefined, {
                type: POST_PASSWORD_FAILED
            })
        ).toEqual(
            {
                success: false,
                message: '',
                postRequest: false,
                postFailed: true,
            }
        )
    });
}) 