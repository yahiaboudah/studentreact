export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  studentNumber: string;
  average1: number;
  average2: number;
  average3: number;
  average4: number;
  choice1?: string;
  choice2?: string;
  choice3?: string;
  choice4?: string;
  assignedSpecialty?: string | null;
}

export interface Specialty {
  id?: number;
  name: string;
  availableSpots: number;
}
