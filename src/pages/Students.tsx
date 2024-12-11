import React, { useEffect, useState } from 'react';
import { fetchStudents, deleteStudent, updateStudent, fetchSpecs } from '../api';
import { Student,Spec } from '../types';
import Layout from '../components/common/Layout';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/students/StudentForm';

import toast, { Toaster } from 'react-hot-toast';

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadStudents();
    loadSpecs();
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

  const loadSpecs = async () => {
    try {
      const data = await fetchSpecs();
      setSpecs(data);
    }
     catch (err) {
      setError('Failed to load specialties');
     }
     finally {
      setLoading(false);
     }
  }

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleSubmit = async (studentData: Partial<Student>) => {
    try {
      
      updateStudent(studentData.id!, studentData);
      await setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentData.id ? { ...student, ...studentData } : student
        )
      );
      setShowForm(false);
      setSelectedStudent(null);
      toast.success("Student successfuly updated!");

    } catch (err) {
      toast.error("Could not update student!");
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
            specs={specs}
          />
        )}

        <StudentTable
          students={students}
          onSelectStudent={handleSelectStudent}
          onDeleteStudent={(id) => {
            deleteStudent(id);
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
            toast.success("Student deleted successfuly!");
          }}
        />
      </div>
      <Toaster/>
    </Layout>
  );
}