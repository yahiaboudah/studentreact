import React, { useEffect, useState } from 'react';
import { Student, Spec } from '../../types';
import { fetchSpecs } from '../../api';

interface StudentFormProps {
  onSubmit: (student: Partial<Student>) => void;
  specs: Spec[]
  initialData?: Student;
}

export default function StudentForm({ onSubmit, initialData, specs }: StudentFormProps) {
  
  const [formData, setFormData] = useState<Partial<Student>>(
    initialData || {
      firstName: '',
      lastName: '',
      studentNumber: '',
      semester1Avg: 0,
      semester2Avg: 0,
      semester3Avg: 0,
      semester4Avg: 0,
      choices: []
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
      [name]: name.includes('semester') ? parseFloat(value) : value
    }));
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...(formData.choices || [])];
    updatedChoices[index] = value;
    setFormData(prev => ({
      ...prev,
      choices: updatedChoices
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Student Number</label>
        <input
          type="text"
          name="studentNumber"
          value={formData.studentNumber}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((num) => (
          <div key={num}>
            <label className="block text-sm font-medium text-gray-700">Average {num}</label>
            <input
              type="number"
              name={`semester${num}Avg`}
              value={formData[`semester${num}Avg` as keyof Student] || ''}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="20"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {formData.choices?.map((choice, index) => (
          <div key={index} className="flex items-center">
            <label className="mr-2">Choice {index + 1}:</label>
            <select
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            >
              <option value="">Select a specialty</option>
              {specs.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
  );
}