import React, { useState } from 'react';
import { Specialty } from '../../types';

interface SpecialtyFormProps {
  onSubmit: (specialty: Partial<Specialty>) => void;
  initialData?: Specialty;
}

export default function SpecialtyForm({ onSubmit, initialData }: SpecialtyFormProps) {
  const [formData, setFormData] = useState<Partial<Specialty>>(
    initialData || {
      name: '',
      availableSpots: 0
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'availableSpots' ? parseInt(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Specialty Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Available Spots</label>
        <input
          type="number"
          name="availableSpots"
          value={formData.availableSpots}
          onChange={handleChange}
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Specialty' : 'Add Specialty'}
        </button>
      </div>
    </form>
  );
}