import React from 'react';
import { Student } from '../types';
import { calculateOverallAverage } from '../utils/calculations';

interface FinalResultsProps {
  students: Student[];
}

export default function FinalResults({ students }: FinalResultsProps) {
  const sortedStudents = [...students].sort((a, b) => {
    const avgA = calculateOverallAverage(a.average1, a.average2, a.average3, a.average4);
    const avgB = calculateOverallAverage(b.average1, b.average2, b.average3, b.average4);
    return avgB - avgA;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Overall Average
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned Specialty
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedStudents.map((student, index) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {calculateOverallAverage(
                  student.average1,
                  student.average2,
                  student.average3,
                  student.average4
                ).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.assignedSpecialty || 'Not assigned'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
