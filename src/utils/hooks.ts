import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector } from 'react-redux'
import type { RootState, AppDispatch, AppThunk } from '../index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch | AppThunk = dispatchHook
//export const useAppDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector