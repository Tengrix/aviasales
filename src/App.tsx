import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Tickets from "./Tickets";
import 'bootstrap/dist/css/bootstrap.min.css'

type segmentsToType = {
    origin: string;
    // Код города (iata)
    destination: string;
    // Дата и время вылета туда
    date: string;
    // Массив кодов (iata) городов с пересадками
    stops: string[];
    // Общее время перелёта в минутах
    duration: number;
}
type segmentsFromType = {
    origin: string;
    // Код города (iata)
    destination: string;
    // Дата и время вылета туда
    date: string;
    // Массив кодов (iata) городов с пересадками
    stops: string[];
    // Общее время перелёта в минутах
    duration: number;
}
export type segmentsType = segmentsFromType & segmentsToType
export type ticketType = {
    // Цена в рублях
    price: number;
    // Код авиакомпании (iata)
    carrier: string;
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: segmentsType[];
}
type sortType = 'cheapest' | 'fastest'
type filterType = 'All' | 'No transfers' | '1 transfer' | '2 transfers' | '3 transfers'

function App() {
    const [state, setState] = useState<ticketType[]>([])
    const [filter, setFilter] = useState<filterType>('All')
    const [check, setCheck] = useState<boolean>(false)
    const [checkedArray, setCheckedArray] = useState([]);
    let newArr = state.slice(0, 5)

    useEffect(() => {
        axios.get('https://front-test.beta.aviasales.ru/search').then(({data}) => {
            axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`).then(res => setState(res.data.tickets))
                .catch(err => console.log(err))
        })
    }, [])

    const sortByPrice = (sort: sortType) => {
        switch (sort) {
            case "cheapest":
                setState([...state].sort((a, b) => a.price < b.price ? -1 : 1))
                break;
            case "fastest":
                setState([...state].sort((a, b) =>
                    a.segments.reduce((sum, x) =>
                        sum + x.duration, 0) - b.segments.reduce((sum, x) => sum + x.duration, 0)))
                break;
            default:
                return state
        }
    }

    const newFilter = (filter: filterType, value: boolean,transfer:number) => {
        newFun(filter,transfer)
        setFilter(filter)
        setCheck(!value)

    }
    const newFun = (value:filterType,transfer:number) => {
        if (value) {
            // @ts-ignore
            setState(state.filter(el => el.segments.reduce(el => el.stops.length === transfer)))
        }
    }

    // if (filter === '2 transfers') {
    //     // @ts-ignore
    //     newArr = state.filter(el => el.segments.reduce(el => el.stops.length === 2))
    // }
    // if (filter === '3 transfers') {
    //     // @ts-ignore
    //     newArr = state.filter(el => el.segments.reduce(el => el.stops.length === 3))
    // }
    // if (filter === 'All') {
    //     // @ts-ignore
    //     newArr = state
    // }
    // if (filter === 'No transfers') {
    //     // @ts-ignore
    //     newArr = state.filter(el => el.segments.reduce(el => el.stops.length === 0))
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setFilter(e.currentTarget.checked)
    // }
    // const filterHandler = (filter: filterType) => {
    //     switch (filter) {
    //         case "All":
    //             setState(newArr)
    //             break;
    //         case "No transfers":
    //             // @ts-ignore
    //             setState(newArr.filter(el => el.segments.reduce(el => el.stops.length === 0)))
    //             break;
    //         case "1 transfer":
    //             // @ts-ignore
    //             setState(newArr.filter(el => el.segments.reduce(el => el.stops.length === 1)))
    //             break;
    //         case "2 transfers":
    //             // @ts-ignore
    //             newArr = state.filter(el => el.segments.reduce(el => el.stops.length === 2))
    //             break;
    //         case "3 transfers":
    //             // @ts-ignore
    //             newArr = state.filter(el => el.segments.reduce(el => el.stops.length === 3))
    //             break;
    //         default:
    //             return state
    //     }
    // }
    console.log(newArr)
    console.log(check)
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <b>Number of transfers</b>
                    <div className="form-check">
                        <input defaultChecked={check}
                               className="form-check-input" type="checkbox" value="All"
                               id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            All
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={() => newFilter('No transfers', check,0)} defaultChecked={check}
                               className="form-check-input" type="checkbox" value="No transfers"
                               id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            No transfers
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={() => newFilter('1 transfer', check,1)} defaultChecked={check}
                               className="form-check-input" type="checkbox" value="1 transfer"
                               id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            1 transfer
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={() => newFilter('2 transfers', check, 2)} defaultChecked={check}
                               className="form-check-input" type="checkbox" value="2 transfers"
                               id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            2 transfers
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={() => newFilter('3 transfers', check, 3)} defaultChecked={check}
                               className="form-check-input" type="checkbox" value="3 transfers"
                               id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            3 transfers
                        </label>
                    </div>
                </div>
                <div className="col-9">
                    <button onClick={() => sortByPrice('cheapest')}>CHEAPEST</button>
                    <button onClick={() => sortByPrice('fastest')}>FASTEST</button>
                    <div className="row">
                        {newArr.map((el, i) => <Tickets
                            ticket={el}
                            key={i}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
