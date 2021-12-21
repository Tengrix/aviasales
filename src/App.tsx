import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Tickets from "./Tickets";
import s from "./common/styles/Main.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from "./Logo";

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

    const newFilter = (filter: filterType, value: boolean) => {
        // newFun(filter, transfer)
        setFilter(filter)
        setCheck(!value)

    }
    // const newFun = (value: filterType, transfer: number) => {
    //     if (value) {
    //         // @ts-ignore
    //         setState(state.map(el => el.segments.filter((el) => el.stops.length === transfer)))
    //     }
    // }

    if (filter === '2 transfers') {
        // @ts-ignore
        newArr = state.filter(el => el.segments.reduce(el => el.stops.length === 2))
    }
    if (filter === '3 transfers') {
        // @ts-ignore
        newArr = state.filter(el => el.segments.reduce(el => el.stops.length === 3))
    }
    if (filter === 'All') {
        // @ts-ignore
        newArr = state
    }
    if (filter === 'No transfers') {
        // @ts-ignore
        newArr = state.filter(el => el.segments.reduce(el => el.stops.length === 0))
    }

    return (
        <div className={s.main}>
            <div className="container">
                <div className="row">
                    <div className={s.tickets}>
                        <Logo/>
                        <div className="row">
                            <div className="col-3">
                                <div className={s.checkBoxes}>
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
                                        <input onChange={() => newFilter('No transfers', check)}
                                               defaultChecked={check}
                                               className="form-check-input" type="checkbox" value="No transfers"
                                               id="flexCheckChecked"/>
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            No transfers
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={() => newFilter('1 transfer', check)} defaultChecked={check}
                                               className="form-check-input" type="checkbox" value="1 transfer"
                                               id="flexCheckChecked"/>
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            1 transfer
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={() => newFilter('2 transfers', check)}
                                               defaultChecked={check}
                                               className="form-check-input" type="checkbox" value="2 transfers"
                                               id="flexCheckChecked"/>
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            2 transfers
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input onChange={() => newFilter('3 transfers', check)}
                                               defaultChecked={check}
                                               className="form-check-input" type="checkbox" value="3 transfers"
                                               id="flexCheckChecked"/>
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            3 transfers
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className={s.btns}>

                                <div className={'row'}>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">

                                            <div className={'col-6'}>
                                                <button type="button" onClick={() => sortByPrice('cheapest')}
                                                        className={s.btn}>Cheapest
                                                </button>
                                            </div>
                                            <div className={'col-6'}>
                                                <button type="button" onClick={() => sortByPrice('fastest')}
                                                        className={s.btn}>Fastest
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {newArr.map((el, i) => <Tickets
                                        ticket={el}
                                        key={i}
                                    />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default App;
