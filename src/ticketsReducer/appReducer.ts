import {InferActionsType} from "../store/store";
import {ticketsReducerAC} from "./ticketsReducer";

type initialStateType = {
    isLoading:boolean;
}
const initialState:initialStateType = {
    isLoading:false
}
export const appReducer = (state=initialState, action:ActionsType) => {
    switch (action.type){
        case "IS-LOADING":
            return{
                ...state, isLoading: action.value
            }
        default:
            return state
    }
}
type ActionsType = InferActionsType<typeof appReducerAC>

export const appReducerAC = {
    setLoading(value:boolean){
        return{
            type:'IS-LOADING',
            value
        }as const
    }
}