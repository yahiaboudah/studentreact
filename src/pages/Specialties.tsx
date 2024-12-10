import React, { useEffect, useState } from 'react';
import { fetchSpecialties } from '../api';
import { Specialty } from '../types';
import Layout from '../components/common/Layout';
import SpecialtyTable from '../components/SpecialtyTable';
import SpecialtyForm from '../components/specialties/SpecialtyForm';

export default function Specialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadSpecialties();
  }, []);

  const loadSpecialties = async () => {
    try {
      const data = await fetchSpecialties();
      setSpecialties(data);
    } catch (err) {
      setError('Failed to load specialties');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (specialtyData: Partial<Specialty>) => {
    try {
      // Handle create/update logic here
      await loadSpecialties();
      setShowForm(false);
    } catch (err) {
      setError('Failed to save specialty');
    }
  };

  if (loading) return <Layout><div className="p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="p-4 text-red-600">{error}</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Specialties</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Specialty
          </button>
        </div>

        {showForm && (
          <SpecialtyForm onSubmit={handleSubmit} />
        )}

        <SpecialtyTable specialties={specialties} />
      </div>
    </Layout>
  );
}