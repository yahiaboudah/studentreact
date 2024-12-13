import React, { useEffect, useState } from 'react';
import { fetchSpecs, updateSpec, deleteSpec, createSpec, searchSpecs } from '../api';
import { Spec } from '../types';
import Layout from '../components/common/Layout';
import SpecialtyTable from '../components/SpecialtyTable';
import SpecialtyForm from '../components/specialties/SpecialtyForm';
import toast, { Toaster } from 'react-hot-toast';


export default function Specialties() {
  const [specialties, setSpecs] = useState<Spec[]>([]);
  const [selectedSpec, setSelectedSpec] = useState<Spec | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [specName, setSpecName] = useState('');

  useEffect(() => {
    loadSpecialties();
  }, []);

  
  const loadSpecialties = async () => {
    try {
      const data = await fetchSpecs();
      setSpecs(data);
    } catch (err) {
      setError('Failed to load specialties');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSpec = (spec: Spec) => {
    setSelectedSpec(spec);
    setShowForm(true);
  };
  
  const searchSpecsFunc = async () => {
    try {
      let data = await searchSpecs(specName);
      setSpecs(data);
    }
    catch(err) {
      toast.error("Could not search specialties!");
    }
  }

  const handleSubmit = async (specData: Partial<Spec>, createNew) => {
    try {
      if(createNew) {
        
        const newSpec = await createSpec(specData);
        setSpecs((prevSpecs) => [...prevSpecs, newSpec]);
        setShowForm(false);
        setSelectedSpec(null);
        toast.success("Specialty added successfuly!");
      }
      else {
        updateSpec(specData.id!, specData);
        await setSpecs((prevSpecs) =>
          prevSpecs.map((spec) =>
            spec.id === specData.id ? { ...spec, ...specData } : spec
          )
        );
        setShowForm(false);
        setSelectedSpec(null);
        toast.success("Specialty successfuly updated!"); 
      }
    } catch (err) {
      toast.error("Failed to save specialty!");
      setError('Failed to save specialty!');
    }
  };

  if (loading) return <Layout><div className="p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="p-4 text-red-600">{error}</div></Layout>;

  return (
    <Layout>
      <Toaster/>
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
          <SpecialtyForm onSubmit={handleSubmit} initialData={selectedSpec || undefined} />
        )}

        <div className="search-bar flex justify-start space-x-5">
            
            <input
                type="text"
                className='rounded-md px-4 py-1'
                placeholder="Name"
                value={specName}
                onChange={(e) => setSpecName(e.target.value)}
            />

            <div className='flex-grow'></div>
            <button className='text-white bg-red-400 rounded-md px-4 py-1 self-end' onClick={searchSpecsFunc}>Search ⌕</button>
          
        </div>

        <SpecialtyTable 
            specs={specialties}
            onSelectSpec={handleSelectSpec}
            onDeleteSpec={(id)=>{
              deleteSpec(id);
              setSpecs((prevSpecs) => prevSpecs.filter((spec) => spec.id !== id));
              toast.success("Specialty deleted successfuly!");
            }}
        />
      </div>
    </Layout>
  );
}