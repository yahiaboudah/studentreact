import axios from 'axios';
import { Student, Spec, Choice } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchStudents = async (): Promise<Student[]> => {
  const response = await axios.get(`${API_BASE_URL}/student`);
  return response.data;
};

export const createStudent = async (student: Partial<Student>): Promise<Student> => {
  const response = await axios.post(`${API_BASE_URL}/student`, student);
  return response.data;
};

export const updateStudent = async (id: number, student: Partial<Student>): Promise<Student> => {
  const response = await axios.put(`${API_BASE_URL}/student/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/student/${id}`);
};

export const fetchSpecs = async (): Promise<Spec[]> => {
  const response = await axios.get(`${API_BASE_URL}/spec`);
  return response.data;
};

export const fetchSpecById = async (id: number): Promise<Spec> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createSpec = async (specialty: Partial<Spec>): Promise<Spec> => {
  const response = await axios.post(`${API_BASE_URL}/spec`, specialty);
  return response.data;
};

export const updateSpec = async (id: number, specialty: Partial<Spec>): Promise<Spec> => {
  const response = await axios.put(`${API_BASE_URL}/spec/${id}`, specialty);
  return response.data;
};

export const deleteSpec = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/spec/${id}`);
};

export const fetchChoicesByStudentId = async (studentId: number): Promise<Choice[]> => {
    const response = await axios.get(`${API_BASE_URL}/choices/student/${studentId}`);
    return response.data;
};

export const deleteAllChoicesByStudentId = async (studentId: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/choices/student/${studentId}`);
};