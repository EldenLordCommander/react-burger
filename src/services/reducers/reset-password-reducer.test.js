import { POST_RESET_FAILED,
    POST_RESET_SUCCESS,
    POST_RESET_REQUEST
 } from '../actions/reset-password-action'
 import { initialState, resetPasswordReducer } from '../reducers/reset-password-reducer'

 describe('constructor reducer', () => {
     it('should return the initial state', () => {
         expect(resetPasswordReducer(undefined, {})).toEqual(initialState)
     })

     it('POST_RESET_REQUEST', () => {
        expect(
            resetPasswordReducer(undefined, {
                type: POST_RESET_REQUEST
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

    it('POST_RESET_SUCCESS', () => {
        expect(
            resetPasswordReducer(undefined, {
                type: POST_RESET_SUCCESS,
                success: true,
                message: 'Reset',
            })
        ).toEqual(
            {
                success: true,
                message: 'Reset',
                postRequest: false,
                postFailed: false
            }
        )
    });

    it('POST_RESET_FAILED', () => {
        expect(
            resetPasswordReducer(undefined, {
                type: POST_RESET_FAILED
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
