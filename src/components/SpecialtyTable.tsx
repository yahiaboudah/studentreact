import React from 'react';
import { Spec } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

interface SpecTableProps {
  specs: Spec[];
  onSelectSpec: (spec: Spec) => void;
  onDeleteSpec: (id: number) => void;
}

export default function SpecialtyTable({ specs, onSelectSpec, onDeleteSpec }: SpecTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Places
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Picks
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200" >
          {specs.map((spec, index) => (
            <tr key={spec.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">
                {spec.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {spec.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {spec.availablePlaces}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {spec.choices?.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onSelectSpec(spec)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => spec.id && onDeleteSpec(spec.id)}
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
