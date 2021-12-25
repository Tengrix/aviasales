import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Tickets from "./Tickets";
import s from "./common/styles/Main.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from "./Logo";
import ControlledCheckBoxes from "./ControlledCheckBoxes/ControlledCheckBoxes";
import {filterType, ticketType} from "./types/types";


const filterState = ['All', 'No transfers', '1 transfer', '2 transfers', '3 transfers']
type sortType = 'cheapest' | 'fastest'
function App() {
    const [state, setState] = useState<ticketType[]>([])
    const [filters, setFilters] = useState<filterType>('All')
    const [checkedState, setCheckedState] = useState<boolean[]>(new Array(filterState.length).fill(false))
    const [nextTickets,setNextTickets] = useState<number>(10)
    let newState = state
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
    const newFun = (filter: filterType, position: number, transfer: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        let isValid: any = ''
        if (updatedCheckedState[position]) isValid = filterState[position]
        setFilters(isValid)
    }

    console.log(newState)
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
                                    {newState.slice(0,nextTickets).map((el, i) =>
                                        <Tickets
                                            ticket={el}
                                            key={i}
                                        />)}
                                    <button style={{marginBottom:10}} className={s.btn} onClick={() => setNextTickets(nextTickets + 5)} >
                                        Show more
                                    </button>
                                    {nextTickets > 5 && <button style={{marginBottom:10}} className={s.btn} onClick={()=> setNextTickets(nextTickets-5)}>Show less</button>}
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
