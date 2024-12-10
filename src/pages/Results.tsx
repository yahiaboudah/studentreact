import React, { useEffect, useState } from 'react';
import { fetchStudents, fetchSpecialties } from '../api';
import { Student, Specialty } from '../types';
import Layout from '../components/common/Layout';
import FinalResults from '../components/FinalResults';
import { assignSpecialties } from '../utils/calculations';

export default function Results() {
  const [students, setStudents] = useState<Student[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentsData, specialtiesData] = await Promise.all([
          fetchStudents(),
          fetchSpecialties()
        ]);
        
        const assignedStudents = assignSpecialties(studentsData, specialtiesData);
        setStudents(assignedStudents);
        setSpecialties(specialtiesData);
      } catch (err) {
        setError('Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Layout><div className="p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="p-4 text-red-600">{error}</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Final Results</h1>
        <FinalResults students={students} />
      </div>
    </Layout>
  );
}