import type { Tees } from "./tees";

export type courses = {
    id: string;
    name: string;
    location: string;
    par: number;
    tees: Tees[];
    rating: number;
    slope: number;
}