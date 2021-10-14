export type Wedding = {
    invitation: Invitation;
    details: Details;
}

export type Invitation = {
    _id: string;
    salutation: string;
    members: Member[];
};

export type Member = {
    name: string;
    accepted: boolean;
};

export type Details = {
    date: string,
    locationChurch: string,
    streetChurch: string,
    cityChurch: string,
    locationParty: string,
    streetParty: string,
    cityParty: string,
    text: string[],
    deadline: string,
    program: ProgramItem[],
    faqs: FAQ[],
};

export type ProgramItem = {
    time: string;
    title: string;
    background: string;
    description: string[];
}

export type FAQ = {
    question: string;
    answer: string;
}