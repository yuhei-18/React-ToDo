declare namespace Api {
  type CommonDate = {
    createdAt: Date
    updatedAt: Date
  }

  type Todo = CommonDate & {
    id: number
    title: string
    content: string
    priority: 0 | 1 | 2 | 3
    dueDate: Date
    isDone: boolean
  }
}
