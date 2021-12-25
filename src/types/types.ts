export type segmentsType = {
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
export type ticketType = {
    // Цена в рублях
    price: number;
    // Код авиакомпании (iata)
    carrier: string;
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: segmentsType[];
}
export type filterType = 'All'|'No transfers' | '1 transfer' | '2 transfers' | '3 transfers'