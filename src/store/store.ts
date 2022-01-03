import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import ticketsReducer from "../ticketsReducer/ticketsReducer";
import {appReducer} from "../ticketsReducer/appReducer";


const rootReducer = combineReducers({
    tickets:ticketsReducer,
    appPage:appReducer
})

export let store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)))
export type AppRootStateType = ReturnType<typeof rootReducer>
type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : never
export type InferActionsType<T extends {[key:string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
//@ts-ignore
window.store=store
