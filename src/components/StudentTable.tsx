import React from 'react';
import { Student } from '../types';
import { calculateOverallAverage } from '../utils/calculations';
import { Pencil, Trash2 } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
}

export default function StudentTable({
  students,
  onSelectStudent,
  onDeleteStudent
}: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Overall Average
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.studentNumber}
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
                <div className="flex space-x-2">
                  <button
                    onClick={() => onSelectStudent(student)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => student.id && onDeleteStudent(student.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
