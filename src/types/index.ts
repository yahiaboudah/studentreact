export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  studentNumber: string;
  semester1Avg: number;
  semester2Avg: number;
  semester3Avg: number;
  semester4Avg: number;
  overallAverage: number;
  choices?: string[];
  assignedChoice?: string | null;
}

export interface Spec {
  id?: number;
  name: string;
  availablePlaces: number;
  choices?: string[]
}


export interface Choice {
    id?: number,
    student: Student,
    spec: Spec,
    choiceOrder: number
}