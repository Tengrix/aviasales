import axios from "axios";
import {ticketType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://front-test.beta.aviasales.ru/'
})

export const aviaAPI = {
    getId() {
        return instance.get('search')
    },
    getTickets(searchId:string) {
        return instance.get<getTicketsType>(`tickets?searchId=${searchId}`)
    }
}

type getTicketsType = {
    tickets:ticketType[]
}