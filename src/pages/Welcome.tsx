import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, ClipboardList } from 'lucide-react';
import Layout from '../components/common/Layout';

export default function Welcome() {
  const features = [
    {
      name: 'Student Management',
      description: 'Add, modify, and track student information and academic progress',
      icon: Users,
      path: '/students'
    },
    {
      name: 'Specialties',
      description: 'Manage available specialties and their capacity',
      icon: BookOpen,
      path: '/specialties'
    },
    {
      name: 'Final Results',
      description: 'View specialty assignments and final classifications',
      icon: ClipboardList,
      path: '/results'
    }
  ];

  return (
    <Layout>
      <div className="text-center mb-12">
        <GraduationCap className="w-20 h-20 mx-auto text-blue-600" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">
          Student Management System
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Efficiently manage student records, specialties, and academic assignments
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <feature.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {feature.name}
            </h3>
            <p className="text-gray-500">{feature.description}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
}