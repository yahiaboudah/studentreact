import React from 'react';
import { Student } from '../types';
import { calculateOverallAverage } from '../utils/calculations';

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

interface FinalResultsProps {
  students: Student[];
}

export default function FinalResults({ students }: FinalResultsProps) {

  
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Specialties List", 14, 10);
    autoTable(doc, {
      html: '#table1',
      headStyles: {
        fillColor: [128, 0, 128], 
        textColor: [255, 255, 255],
        fontStyle: "bold"
      },
    });
    doc.save("students.pdf");
  }

  return (
    <div className="overflow-x-auto flex flex-col justify-start">
          
    <button 
        className='bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 self-end'
        onClick={exportPDF}
      >Export As PDF</button>

      <table id='table1' className="min-w-full divide-y divide-gray-200">
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
          {students.map((student, index) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.overallAverage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.assignedSpec?.name || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
