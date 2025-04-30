
export interface Todo {
    id: string,
    title: string,
    completed: boolean,
    dueDate?: string,
    priority?: 'low'|'medium'|'high',
    starred?: Boolean
}

