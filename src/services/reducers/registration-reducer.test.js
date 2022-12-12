import { POST_REGISTRATION_FAILED,
    POST_REGISTRATION_REQUEST,
    POST_REGISTRATION_SUCCESS
 } from '../actions/registration-action'
 import { initialState, registrationReducer } from '../reducers/registration-reducer'
import { testRegistrationUser } from './reducers-test-data'

 describe('constructor reducer', () => {
     it('should return the initial state', () => {
         expect(registrationReducer(undefined, {})).toEqual(initialState)
     })

     it('POST_REGISTRATION_REQUEST', () => {
        expect(
            registrationReducer(undefined, {
                type: POST_REGISTRATION_REQUEST
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: {
                    email: '',
                    name: ''
                },
                postRequest: true,
                postFailed: false,
            }
        )
    });

    it('POST_REGISTRATION_SUCCESS', () => {
        expect(
            registrationReducer(undefined, {
                type: POST_REGISTRATION_SUCCESS,
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

    it('POST_REGISTRATION_FAILED', () => {
        expect(
            registrationReducer(undefined, {
                type: POST_REGISTRATION_FAILED
            })
        ).toEqual(
            {
                success: false,
                message: '',
                user: {
                    email: '',
                    name: ''
                },
                postRequest: false,
                postFailed: true,
            }
        )
    });
 }) 