import {InferActionsType} from "../store";
import {ticketsReducerAC} from "./ticketsReducer";

type initialStateType = {
    isLoading: boolean;
    error: null | string;
    fetchingStop: boolean;
    searchId:string | null;
}
const initialState: initialStateType = {
    isLoading: false,
    error: null,
    fetchingStop: false,
    searchId:''

}
export const appReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "IS-LOADING":
            return {
                ...state, isLoading: action.value
            }
        case "ERROR":
            return {
                ...state, error: action.error
            }
        case "STOP-FETCHING":
            return {
                ...state, fetchingStop:action.stop
            }
        case "SEARCH-ID":
            return {
                ...state, searchId:action.id
            }
        default:
            return state
    }
}
type ActionsType = InferActionsType<typeof appReducerAC>

export const appReducerAC = {
    setLoading(value: boolean) {
        return {
            type: 'IS-LOADING',
            value
        } as const
    },
    setError(error: string | null) {
        return {
            type: 'ERROR',
            error
        } as const
    },
    setFetchingStop(stop:boolean){
        return{
            type:'STOP-FETCHING',
            stop
        }as const
    },
    setSearchingId(id:string){
        return{
            type:'SEARCH-ID',
            id
        }as const
    }
}