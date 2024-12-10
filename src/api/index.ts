import axios from 'axios';
import { Student, Specialty } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchStudents = async (): Promise<Student[]> => {
  const response = await axios.get(`${API_BASE_URL}/student`);
  console.log('got data');
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

export const fetchSpecialties = async (): Promise<Specialty[]> => {
  const response = await axios.get(`${API_BASE_URL}/spec`);
  return response.data;
};

export const createSpecialty = async (specialty: Partial<Specialty>): Promise<Specialty> => {
  const response = await axios.post(`${API_BASE_URL}/spec`, specialty);
  return response.data;
};

export const updateSpecialty = async (id: number, specialty: Partial<Specialty>): Promise<Specialty> => {
  const response = await axios.put(`${API_BASE_URL}/spec/${id}`, specialty);
  return response.data;
};

export const deleteSpecialty = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/spec/${id}`);
};
