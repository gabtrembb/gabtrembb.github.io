export interface Question {
    question: string;
    type: QuestionType;
    choices: string[];
}

export enum QuestionType
{
    TrueFalse,
    Multiple,
    ClosestNumber,
    Text
}