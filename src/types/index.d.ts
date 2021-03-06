declare namespace Api {
  type CommonDate = {
    created_at: Date;
    updated_at: Date;
  }

  type Todo = CommonDate & {
    id: number;
    title: string;
    content: string;
    priority: 0 | 1 | 2 | 3;
    due_date: Date;
    is_done: boolean;
  }
}