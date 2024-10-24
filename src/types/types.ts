export interface Status {
    label: string;
    color: string;
}

export interface Item {
    id: string;
    name: string;
    quantity: number;
    description: string;
    notes: string;
}

export interface Category {
    id: string;
    name: string;
    items: Item[];
}

export interface Job {
    id: string;
    name: string;
    status: Status;
    categories: Category[];
    items: Item[];
}