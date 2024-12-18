import React, { useState } from 'react';
import { Spec } from '../../types';

interface SpecialtyFormProps {
  onSubmit: (spec: Partial<Spec>, createNew: boolean) => void;
  initialData?: Spec;
}

export default function SpecialtyForm({ onSubmit, initialData }: SpecialtyFormProps) {
  
  const [formData, setFormData] = useState<Partial<Spec>>(
    initialData || {
      name: '',
      availablePlaces: 0
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, initialData ? false: true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'availablePlaces' ? parseInt(value) : value
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
        <label className="block text-sm font-medium text-gray-700">Available Places</label>
        <input
          type="number"
          name="availablePlaces"
          value={formData.availablePlaces}
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