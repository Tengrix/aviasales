import {sortType, ticketsMainType, ticketType} from "../types/types";
import {InferActionsType} from "../store/store";
import {Dispatch} from "react";
import {aviaAPI} from "../api/aviaAPI";
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
    return (dispatch: Dispatch<any>) => {
        try {
            aviaAPI.getId().then(res => {
                dispatch(appReducerAC.setLoading(false))
                aviaAPI.getTickets(res.data.searchId).then(r => {
                    dispatch(appReducerAC.setLoading(true))
                    dispatch(ticketsReducerAC.setTickets(r.data.tickets))
                })
            })
        } catch (e) {

        }
    }
}