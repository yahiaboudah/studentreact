import React, { useEffect, useState } from 'react';
import { fetchStudents, deleteStudent, updateStudent, fetchSpecs, createStudent, refreshChoices, assignSpecs, searchStudentsByAll } from '../api';
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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');



  useEffect(() => {
    loadStudents();
    loadSpecs();
  }, []);

  const loadStudents = async () => {
    try {
      let data = await fetchStudents();
      
      data = data.map((st:any)=>{
        st.choicesList = st.choices?.sort((a,b):any=>{return a.choiceOrder - b.choiceOrder})
                ?.map((c) => c['spec']['name']);
        return st;
      });

      setStudents(data);
      // console.log(students);
    } catch (err) {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const searchStudents = async () => {
    try {
      let data = await searchStudentsByAll(firstName, lastName, number);
      data = data.map((st:any)=>{
        st.choicesList = st.choices?.sort((a,b):any=>{return a.choiceOrder - b.choiceOrder})
                ?.map((c) => c['spec']['name']);
        return st;
      });
      setStudents(data);
    }
    catch(err) {
      toast.error("Could not search student!");
    }
  }

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
    // setShowForm(false);
    // setSelectedStudent(null);
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleSubmit = async (studentData: Partial<Student>, createNew) => {
    try {
      
      if(createNew) {
        const newStudent = await createStudent(studentData);
        await setStudents(prevSt => [...prevSt, newStudent]);
        setShowForm(false);
        setSelectedStudent(null);
        toast.success("Student added successfuly!");
      }
      else {
        const newStudentData = await updateStudent(studentData.id!, studentData);
        await setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === newStudentData.id ? { ...student, ...newStudentData } : student
          )
        );
        setShowForm(false);
        setSelectedStudent(null);
        toast.success("Student successfuly updated!");
      }

    } catch (err) {
      toast.error("Could not update student!");
      setError('Failed to save student');
    }
  };

  const onCloseForm = () => {
    setShowForm(false);
    setSelectedStudent(null);
  }


  if (loading) return <Layout><div className="p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="p-4 text-red-600">{error}</div></Layout>;

  return (
    <Layout>
      <div className="space-y-6">
        
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <div className="flex justify-end space-x-4 items-center">

            <button 
              className='bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700'
              onClick={()=>{
                refreshChoices().then((res)=>{
                  if(res == true) {
                    window.location.reload();
                    toast.success("Refreshed student choices!");
                  }else {
                    toast.error("Failed to refresh student choices!");
                  }
                })
              }}
            >Refresh Choices</button>
            <button 
              className='bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-700'
              onClick={async ()=>{
                let res = await assignSpecs();
                if(res == true) {
                  window.location.reload();
                  toast.success("Assigned student specialties!");
                } else {
                  toast.error("Failed to assign specialties!");
                }
              }}
              >Assign specialties</button>
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
            onClose={onCloseForm}
          />
        )}

        <div className="search-bar flex justify-start space-x-5">
            
            <input
                type="text"
                className='rounded-md px-4 py-1'
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                className='rounded-md px-4 py-1'
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="text"
                className='rounded-md px-4 py-1'
                placeholder="Student Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />

            <div className='flex-grow'></div>
            <button className='text-white bg-red-400 rounded-md px-4 py-1 self-end' onClick={searchStudents}>Search ⌕</button>
          
        </div>

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