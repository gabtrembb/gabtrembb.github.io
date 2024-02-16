export interface Question {
    question: string;
    type: QuestionType;
}

export enum QuestionType
{
    TrueFalse,
    Multiple,
    ClosestNumber,
    Text
}