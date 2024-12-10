import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../api';
import { Student } from '../types';
import Layout from '../components/common/Layout';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/students/StudentForm';

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleSubmit = async (studentData: Partial<Student>) => {
    try {
      // Handle create/update logic here
      await loadStudents();
      setShowForm(false);
      setSelectedStudent(null);
    } catch (err) {
      setError('Failed to save student');
    }
  };

  if (loading) return <Layout><div className="p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="p-4 text-red-600">{error}</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Student
          </button>
        </div>

        {showForm && (
          <StudentForm
            onSubmit={handleSubmit}
            initialData={selectedStudent || undefined}
          />
        )}

        <StudentTable
          students={students}
          onSelectStudent={handleSelectStudent}
          onUpdateStudent={() => {}}
          onDeleteStudent={() => {}}
        />
      </div>
    </Layout>
  );
}