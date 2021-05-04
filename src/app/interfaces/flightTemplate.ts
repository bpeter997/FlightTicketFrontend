export interface FlightTemplate {
    id: string;
    start: Date;
    arrive: Date;
    from: string;
    to: string;
    airline: string[];
    airplane: string[];
}