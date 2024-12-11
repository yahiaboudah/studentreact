
export const calculateOverallAverage = (
  average1: number,
  average2: number,
  average3: number,
  average4: number
): number => {
  return (average1 + average2 + average3 + average4) / 4;
};

export const assignSpecialties = (students: any[], specialties: any[]) => {
  // Sort students by overall average
  const sortedStudents = [...students].sort((a, b) => {
    const avgA = calculateOverallAverage(a.average1, a.average2, a.average3, a.average4);
    const avgB = calculateOverallAverage(b.average1, b.average2, b.average3, b.average4);
    return avgB - avgA;
  });

  // Create a copy of specialties with available spots
  const availableSpecialties = specialties.map(specialty => ({
    ...specialty,
    remainingSpots: specialty.availableSpots
  }));

  return sortedStudents.map(student => {
    const choices = [student.choice1, student.choice2, student.choice3, student.choice4];
    let assignedSpecialty = null;

    // Try to assign the student's choices in order of preference
    for (const choice of choices) {
      const specialty = availableSpecialties.find(s => s.name === choice);
      if (specialty && specialty.remainingSpots > 0) {
        specialty.remainingSpots--;
        assignedSpecialty = choice;
        break;
      }
    }

    return {
      ...student,
      assignedSpecialty
    };
  });
};