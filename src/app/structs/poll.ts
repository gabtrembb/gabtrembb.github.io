import { Question } from "./question";

export interface Poll {
    name: string;
    password: string;
    money: number;
    questions: Question[];
}