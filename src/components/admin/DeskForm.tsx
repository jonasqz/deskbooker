import React, { useState, useEffect } from 'react';
import { createAdminDesk, getOffices, getFloors, getWings } from '../../api/admin';
import type { Office, Floor, Wing } from '../../types/admin';

interface DeskFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const DeskForm: React.FC<DeskFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [officeId, setOfficeId] = useState('');
  const [floorId, setFloorId] = useState('');
  const [wingId, setWingId] = useState('');
  
  const [offices, setOffices] = useState<Office[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [wings, setWings] = useState<Wing[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [officesData, floorsData, wingsData] = await Promise.all([
          getOffices(),
          getFloors(),
          getWings(),
        ]);
        setOffices(officesData);
        setFloors(floorsData);
        setWings(wingsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdminDesk({
        name,
        officeId,
        floorId,
        wingId: wingId || undefined,
      });
      onSubmit();
    } catch (error) {
      console.error('Failed to create desk:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const availableFloors = floors.filter(floor => floor.officeId === officeId);
  const availableWings = wings.filter(wing => wing.floorId === floorId);

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
            onChange={(e) => {
              setOfficeId(e.target.value);
              setFloorId('');
              setWingId('');
            }}
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
          <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
            Floor
          </label>
          <select
            id="floor"
            value={floorId}
            onChange={(e) => {
              setFloorId(e.target.value);
              setWingId('');
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            disabled={!officeId}
          >
            <option value="">Select a floor</option>
            {availableFloors.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.name} (Floor {floor.number})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="wing" className="block text-sm font-medium text-gray-700">
            Wing (Optional)
          </label>
          <select
            id="wing"
            value={wingId}
            onChange={(e) => setWingId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={!floorId}
          >
            <option value="">Select a wing</option>
            {availableWings.map((wing) => (
              <option key={wing.id} value={wing.id}>
                {wing.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Desk Name
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
            Create Desk
          </button>
        </div>
      </div>
    </form>
  );
};