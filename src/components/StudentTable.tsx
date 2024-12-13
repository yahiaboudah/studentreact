import React from 'react';
import { Student } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
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
                Average 1
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average 2
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Average 3
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Average 4
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Choices
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Overall Average
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.studentNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.semester1Avg}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.semester2Avg}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.semester3Avg}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.semester4Avg}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span style={{ color: 'orange' }}>{'['}</span>
                {student.choices
                    ?.sort((a:any,b:any)=>{return a.choiceOrder - b.choiceOrder})
                    ?.map((c) => c['spec']['name'])
                    ?.join(' | ')
                    .split(' | ')
                    .map((part, index, array) => (
                      <span>
                        <span key={index}>
                          {part}
                          {index < array.length - 1 && <span style={{ color: 'orange' }}> {']['} </span>}
                        </span>
                      </span>
                    ))}
                <span style={{ color: 'orange' }}>{']'}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.overallAverage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.assignedSpec?.name ? '*' + student.assignedSpec?.name + '*' : 'N/A'}
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
