export interface createTask {
  title: string,
  description: string
}

export interface updateTask {
  title?: string,
  description?: string,
  completed?: boolean
}