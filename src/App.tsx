import React, {useEffect, useState} from 'react';
import './App.css';
import Tickets from "./Components/Tickets/Tickets";
import s from "./common/styles/Main.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from "./Logo";
import ControlledCheckBoxes from "./ControlledCheckBoxes/ControlledCheckBoxes";
import {filterType, sortType, ticketType} from "./types/types";
import Loading from "./Components/Loading/Loading";
import {useDispatch, useSelector} from "react-redux";
import {getTicketsThunk, ticketsReducerAC} from "./ticketsReducer/ticketsReducer";
import {AppRootStateType} from "./store/store";


const filterState = ['All', 'No transfers', '1 transfer', '2 transfers', '3 transfers']

function App() {
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, ticketType[]>(state => state.tickets)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.appPage.isLoading)
    const [filters, setFilters] = useState<filterType>('All')
    const [checkedState, setCheckedState] = useState<boolean[]>(new Array(filterState.length).fill(false))
    const [nextTickets, setNextTickets] = useState<number>(5)
    let newState = state
    useEffect(() => {
        dispatch(getTicketsThunk())
    }, [])

    const sortByPrice = (sort: sortType) => {
        dispatch(ticketsReducerAC.setSort(sort))
        switch (sort) {
            case "cheapest":
                dispatch(ticketsReducerAC.setTickets(state.sort((a, b) => a.price < b.price ? -1 : 1)))
                break;
            case "fastest":
                dispatch(ticketsReducerAC.setTickets(state.sort((a, b) =>
                    a.segments.reduce((sum, x) =>
                        sum + x.duration, 0) - b.segments.reduce((sum, x) => sum + x.duration, 0))))
                break;
            default:
                return state
        }
    }
    const newFun = (filter: filterType, position: number, transfer: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let isValid: any = ''
        if (updatedCheckedState[position]) isValid = filterState[position]
        setFilters(isValid)
    }

    if (filters === '1 transfer') {
        newState = state.filter(el => el.segments.some((el) => el.stops.length === 1))
    }
    if (filters === '2 transfers') {
        newState = state.filter(el => el.segments.some((el) => el.stops.length === 2))
    }
    if (filters === '3 transfers') {
        newState = state.filter(el => el.segments.some((el) => el.stops.length === 3))
    }
    if (!isLoading) {
        return <div>
            <Loading/>
        </div>
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
                                    {filterState.map((el: any, i) =>
                                        <ControlledCheckBoxes
                                            checkedState={checkedState}
                                            key={i}
                                            index={i}
                                            filter={el}
                                            filters={filters}
                                            newFun={newFun}/>
                                    )}
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
                                    {newState.slice(0, nextTickets).map((el, i) =>
                                        <Tickets
                                            ticket={el}
                                            key={i}
                                        />)}

                                        <div className={nextTickets < 10?'col-12':'col-6'}>
                                            <button className={s.showMoreLess}
                                                    onClick={() => setNextTickets(nextTickets + 5)}>
                                                Show more
                                            </button>
                                        </div>

                                    <div className={'col-6'}>
                                        {nextTickets > 5 && <button className={s.showMoreLess}
                                                                    onClick={() => setNextTickets(nextTickets - 5)}>Show
                                            less</button>}
                                    </div>

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
