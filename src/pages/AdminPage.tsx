import React, { useState } from 'react';
import { Building2, LayoutGrid, Map, Plus } from 'lucide-react';
import { OfficeForm } from '../components/admin/OfficeForm';
import { FloorForm } from '../components/admin/FloorForm';
import { WingForm } from '../components/admin/WingForm';
import { DeskForm } from '../components/admin/DeskForm';
import { LocationList } from '../components/admin/LocationList';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState<'offices' | 'floors' | 'wings' | 'desks'>('offices');
  const [showForm, setShowForm] = useState(false);

  if (!currentUser?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('offices')}
                className={`${
                  activeTab === 'offices'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Offices
              </button>
              <button
                onClick={() => setActiveTab('floors')}
                className={`${
                  activeTab === 'floors'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
              >
                <LayoutGrid className="w-5 h-5 mr-2" />
                Floors
              </button>
              <button
                onClick={() => setActiveTab('wings')}
                className={`${
                  activeTab === 'wings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
              >
                <Map className="w-5 h-5 mr-2" />
                Wings
              </button>
              <button
                onClick={() => setActiveTab('desks')}
                className={`${
                  activeTab === 'desks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex items-center px-4 py-4 border-b-2 font-medium text-sm`}
              >
                <Map className="w-5 h-5 mr-2" />
                Desks
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New
              </button>
            </div>

            {showForm && (
              <div className="mb-6">
                {activeTab === 'offices' && (
                  <OfficeForm onSubmit={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
                )}
                {activeTab === 'floors' && (
                  <FloorForm onSubmit={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
                )}
                {activeTab === 'wings' && (
                  <WingForm onSubmit={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
                )}
                {activeTab === 'desks' && (
                  <DeskForm onSubmit={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
                )}
              </div>
            )}

            <LocationList type={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
};