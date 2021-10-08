export type Invitation = {
    _id: string;
    salutation: string;
    members: Member[];
};

export type Member = {
    _id: string;
    name: string;
    accepted: boolean;
};