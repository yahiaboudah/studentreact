import React from 'react';
import { Specialty } from '../types';

interface SpecialtyTableProps {
  specialties: Specialty[];
}

export default function SpecialtyTable({ specialties }: SpecialtyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Available Spots
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {specialties.map((specialty) => (
            <tr key={specialty.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {specialty.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {specialty.availableSpots}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
