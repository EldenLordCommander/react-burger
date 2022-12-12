import { POST_LOGOUT_FAILED,
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS
 } from '../actions/logout-actions'
 import { initialState, logoutReducer } from '../reducers/logout-reducer'

 describe('constructor reducer', () => {
     it('should return the initial state', () => {
         expect(logoutReducer(undefined, {})).toEqual(initialState)
     })

     it('POST_LOGOUT_REQUEST', () => {
        expect(
            logoutReducer(undefined, {
                type: POST_LOGOUT_REQUEST
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

    it('POST_LOGOUT_SUCCESS', () => {
        expect(
            logoutReducer(undefined, {
                type: POST_LOGOUT_SUCCESS,
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

    it('POST_LOGOUT_FAILED', () => {
        expect(
            logoutReducer(undefined, {
                type: POST_LOGOUT_FAILED
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
