  export interface option {
    text: string
    correct: boolean
  }
  export interface question {
    id:number
    question: string
    options: option[]
  }