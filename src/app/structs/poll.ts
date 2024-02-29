import { Question } from "./question";

export interface Poll {
    id : string;
    name: string;
    password: string;
    money: number;
    questions: Question[];
}