export interface Event {
    id: string;
    type: "theoretical" | "practical"; //TODO remove
    employee: string;
    date: string;  // Use string to store LocalDate format
    time: string;  // Use string to store LocalTime format
    description?: string;
    lessonId: string;
  }
  
  export interface EventState {
    isLoading: boolean;
    events: Event[];
    error: string | null;
  }
  

  export interface Lesson {
    id: string;
    type: "theoretical" | "practical";
    employee: string;
    date: string;  // Use string to store LocalDate format
    time: string;  // Use string to store LocalTime format
    description?: string;
    lessonId: string;
  }