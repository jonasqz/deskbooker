import React, { useState, useEffect } from 'react';
import { createWing, getFloors } from '../../api/admin';
import type { Floor } from '../../types/admin';

interface WingFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const WingForm: React.FC<WingFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [floorId, setFloorId] = useState('');
  const [floors, setFloors] = useState<Floor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const data = await getFloors();
        setFloors(data);
      } catch (error) {
        console.error('Failed to fetch floors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFloors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWing({
        name,
        floorId,
      });
      onSubmit();
    } catch (error) {
      console.error('Failed to create wing:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
      <div className="space-y-4">
        <div>
          <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
            Floor
          </label>
          <select
            id="floor"
            value={floorId}
            onChange={(e) => setFloorId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select a floor</option>
            {floors.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.name} (Floor {floor.number})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Wing Name
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
            Create Wing
          </button>
        </div>
      </div>
    </form>
  );
};