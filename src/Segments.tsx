import {segmentsType} from "./App";

type segmentType = {
    segment: segmentsType
}
export default function Segments({segment}: segmentType) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div>
                        {segment.origin} - {segment.destination}
                    </div>
                    {segment.date}
                </div>

                <div className="col-4"> flight time
                    <div>
                        {Math.round(segment.duration / 60)}h
                    </div>
                </div>
                <div className="col-4">
                    {segment.stops.length===0?'' : `${segment.stops.length} transfers`}
                    <div>
                        {segment.stops.join(',')}
                    </div>
                </div>
            </div>
        </div>
    )
}