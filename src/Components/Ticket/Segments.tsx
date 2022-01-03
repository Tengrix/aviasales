import {segmentsType} from "../../types/types";
import {useDispatch} from "react-redux";
import {ticketsReducerAC} from "../../ticketsReducer/ticketsReducer";

type segmentType = {
    segment: segmentsType
}
export default function Segments({segment}: segmentType) {
    const dispatch = useDispatch()
    const arrivingTime = (date: string, duration: number) => {
        const arrivingDate = new Date(Date.parse(date) + duration * 60 * 1000)
        const hours = arrivingDate.getUTCHours()
        let minutes = Math.round(arrivingDate.getUTCMinutes() / 10) * 10
        return `${minutes === 60 ? hours + 1 : hours < 10 ? '0' + hours : hours}:${minutes === 60 ? minutes - 60 + '0' : minutes === 0 ? minutes + '0' : minutes}`
    }
    const departureTime = (date: string) => {
        const departureDate = new Date(date)
        const hours = departureDate.getUTCHours()
        let minutes = Math.round(departureDate.getUTCMinutes() / 10) * 10
        return `${hours < 10 ? '0' + hours : hours}:${minutes}`
    }
    let durationHours = Number((segment.duration / 60).toFixed(0))
    let durationMinutes = Math.round(Number((((segment.duration / 60) - durationHours) * 60).toFixed(0)) / 10) * 10

    return (
        <div className="container">
            <div style={{paddingBottom:15}} className="row">
                <div className="col-4">
                    <div>
                        <span style={{color: "gray"}}>{segment.origin} - {segment.destination}</span>
                    </div>
                    {departureTime(segment.date)} - {arrivingTime(segment.date,segment.duration)}
                </div>
                <div className="col-4"><span style={{color: "gray"}}>flight time</span>
                    <div>
                        {durationHours}h {durationMinutes < 0 ? -durationMinutes : durationMinutes}min
                    </div>
                </div>
                <div className="col-4">
                    <span style={{color: 'gray'}}>
                    {segment.stops.length === 0 ? 'No transfers' : `${segment.stops.length} transfers`}
                        </span>
                    <div>
                        {segment.stops.join(',')}
                    </div>
                </div>
            </div>
        </div>
    )
}