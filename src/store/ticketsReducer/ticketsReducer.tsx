import {sortType, ticketsMainType, ticketType} from "../../types/types";
import {AppRootStateType, InferActionsType} from "../store";
import {Dispatch} from "react";
import {aviaAPI} from "../../api/aviaAPI";
import {appReducerAC} from "./appReducer";

const initialState: ticketsMainType[] = []

export default function ticketsReducer(state = initialState, action: ActionsType) {
    switch (action.type) {
        case "GET-TICKETS":
            return action.tickets
        case "SORT":
            return {
                ...state, sorting: action.sorting
            }
        default:
            return state
    }

}
type ActionsType = InferActionsType<typeof ticketsReducerAC>

export const ticketsReducerAC = {
    setTickets(tickets: ticketType[]) {
        return {
            type: 'GET-TICKETS',
            tickets
        } as const
    },
    setSort(sorting: sortType) {
        return {
            type: 'SORT',
            sorting
        } as const
    }
}

export const getTicketsThunk = () => {
    return async (dispatch: Dispatch<any>,getState: () => AppRootStateType) => {
        const state = getState()
        dispatch(appReducerAC.setLoading(false))
        try {
            const data = await aviaAPI.getTickets(state.appPage.searchId as string)
            dispatch(ticketsReducerAC.setTickets(data.data.tickets))
            dispatch(appReducerAC.setFetchingStop(data.data.stop))
            if (data.data.stop===true) dispatch(appReducerAC.setLoading(true))
            if(!data.data.stop) dispatch(getTicketsThunk())
        } catch(e){
            dispatch(getTicketsThunk())
            console.log('error')
        }
    }

}
export const getTicketId = () =>{
    return async (dispatch:Dispatch<any>,getState:()=>AppRootStateType)=>{
        try {
            await aviaAPI.getId().then(res=>{
                dispatch(appReducerAC.setSearchingId(res.data.searchId))
            console.log(getState().appPage.searchId)
            })
        }catch (e){

        }

    }
}