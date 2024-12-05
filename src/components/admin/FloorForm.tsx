import React, { useState, useEffect } from 'react';
import { createFloor, getOffices } from '../../api/admin';
import type { Office } from '../../types/admin';

interface FloorFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const FloorForm: React.FC<FloorFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [officeId, setOfficeId] = useState('');
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const data = await getOffices();
        setOffices(data);
      } catch (error) {
        console.error('Failed to fetch offices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFloor({
        name,
        number: parseInt(number),
        officeId,
      });
      onSubmit();
    } catch (error) {
      console.error('Failed to create floor:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <label htmlFor="office" className="block text-sm font-medium text-gray-700">
            Office
          </label>
          <select
            id="office"
            value={officeId}
            onChange={(e) => setOfficeId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select an office</option>
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Floor Number
          </label>
          <input
            type="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Floor Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create Floor
          </button>
        </div>
      </div>
    </form>
  );
};