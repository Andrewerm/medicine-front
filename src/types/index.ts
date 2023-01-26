export interface ISurvey {
    id:          number;
    title:      string;
    description: string;
    items:       Item[];
}

export interface Item {
    id:       number;
    question: string;
    answers:  Answer[];
}

export interface Answer {
    id:      number;
    variant: string;
}
