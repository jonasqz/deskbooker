import React, { useEffect, useState } from 'react';
import { getOffices, getFloors, getWings, getAdminDesks } from '../../api/admin';
import type { Office, Floor, Wing, AdminDesk } from '../../types/admin';

interface LocationListProps {
  type: 'offices' | 'floors' | 'wings' | 'desks';
}

export const LocationList: React.FC<LocationListProps> = ({ type }) => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [wings, setWings] = useState<Wing[]>([]);
  const [desks, setDesks] = useState<AdminDesk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        switch (type) {
          case 'offices':
            setOffices(await getOffices());
            break;
          case 'floors':
            setFloors(await getFloors());
            break;
          case 'wings':
            setWings(await getWings());
            break;
          case 'desks':
            setDesks(await getAdminDesks());
            break;
        }
      } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  const renderList = () => {
    switch (type) {
      case 'offices':
        return offices.map((office) => (
          <div key={office.id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium">{office.name}</h3>
            <p className="text-sm text-gray-500">{office.address}</p>
          </div>
        ));
      case 'floors':
        return floors.map((floor) => (
          <div key={floor.id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium">{floor.name}</h3>
            <p className="text-sm text-gray-500">Floor {floor.number}</p>
          </div>
        ));
      case 'wings':
        return wings.map((wing) => (
          <div key={wing.id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium">{wing.name}</h3>
          </div>
        ));
      case 'desks':
        return desks.map((desk) => (
          <div key={desk.id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium">{desk.name}</h3>
            <p className="text-sm text-gray-500">
              {desk.officeName} - {desk.floorName}
              {desk.wingName && ` - ${desk.wingName}`}
            </p>
          </div>
        ));
    }
  };

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{renderList()}</div>;
};