import React, { useEffect, useState } from 'react';
import { Student, Spec } from '../../types';
import { fetchSpecs } from '../../api';

import toast, { Toaster } from 'react-hot-toast';

import { ShieldCloseIcon } from 'lucide-react'

interface StudentFormProps {
  onSubmit: (student: Partial<Student>) => void;
  onClose: ()=>void;
  specs: Spec[];
  initialData?: Student;
}

export default function StudentForm({ onSubmit, onClose, initialData, specs }) {
  const [formData, setFormData] = useState(
    initialData || {
      firstName: '',
      lastName: '',
      studentNumber: '',
      semester1Avg: 0,
      semester2Avg: 0,
      semester3Avg: 0,
      semester4Avg: 0,
      choices: [],
      choicesList: []
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if((new Set(formData.choicesList)).size != formData.choicesList.length) {
      toast.error("There is a duplicate specialty!");
      return;
    }
    if(formData.choicesList.filter(x=>x=='').length > 0) {
      toast.error("Please select all specialty choices!");
      return;
    }
    onSubmit(formData, initialData ? false: true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('semester') ? parseFloat(value) : value
    }));
  };

  const handleChoiceChange = (index, value) => {
    // const updatedChoices = [...(formData.choices || [])];
    const updatedChoicesList = [...(formData.choicesList || [])];

    // Update both choices and choicesList
    // updatedChoices[index] = specs.find((spec) => spec.id === value) || null;
    updatedChoicesList[index] = value;

    setFormData((prev) => ({
      ...prev,
      // choices: updatedChoices,
      choicesList: updatedChoicesList
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4 items-center justify-items-end bg-white p-6 rounded-lg shadow">
      <Toaster/>
      <ShieldCloseIcon
        className="absolute top-2 right-2 mr-8 text-gray-500 cursor-pointer transition-transform transform hover:text-red-500 scale-150 hover:scale-200"
        onClick={onClose}
      />
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
              value={formData[`semester${num}Avg`] || ''}
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

      <div className="grid grid-cols-2 gap-4">
        {(formData.choices.length > 0 ? formData.choices: specs).map((ch, index) => (
          <div key={index} className="flex items-center">
            <label className="mr-2">Choice {index + 1}:</label>
            <select
              className="px-4 py-2 bg-slate-50 rounded-2xl border-2 border-lime-600"
              value={formData.choicesList[index] || ''}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            >
              <option value="">Select a specialty</option>
              {ch.hasOwnProperty('spec')? (
                <>
                  <option key={ch.spec.id} value={ch.spec.name}>
                    {ch.spec.name}
                  </option>
                  {specs.filter(s=>s.name !=ch.spec.name).map((ss)=>(
                    <option key={ss.id} value={ss.name}>
                      {ss.name}
                    </option>
                  ))}
                </>
              ):(
                specs.map((spec) => (
                  <option key={spec.id} value={spec.name}>
                    {spec.name}
                  </option>
                ))
              )}
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
