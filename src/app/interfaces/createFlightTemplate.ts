export interface CreateFlightTemplate {
    startDate: string;
    arrivalDate: string;
    from: string;
    to: string;
    airline: string[];
    airplane: string[];
    transfer?: string[];
}