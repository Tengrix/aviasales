import Segments from "./Segments";
import s from './common/styles/Main.module.scss'
import {ticketType} from "./types/types";

type ticketsType = {
    ticket: ticketType
}

function Tickets({ticket}: ticketsType) {
    return (
        <div className="container">
            <div className={s.ticket}>
                <div className="row">

                    <div className="col-8">
                        {ticket.price} Rubles
                    </div>
                    <div className="col-4">
                        <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt=""/>
                    </div>
                    <div className="row">
                        {ticket.segments.map((el, i) => <Segments
                            key={i}
                            segment={el}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tickets;
