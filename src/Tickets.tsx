import {ticketType} from "./App";
import Segments from "./Segments";

type ticketsType = {
    ticket: ticketType
}

function Tickets({ticket}: ticketsType) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    {ticket.price} Rubles
                </div>
                <div className="col-4">
                    {ticket.carrier} Airline
                </div>
                <div className="row">
                    {ticket.segments.map((el,i)=><Segments
                        key={i}
                        segment={el}
                    />)}
                </div>
            </div>
        </div>
    );
}

export default Tickets;
