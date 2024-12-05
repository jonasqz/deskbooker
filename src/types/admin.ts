export interface Office {
  id: string;
  name: string;
  address: string;
}

export interface Floor {
  id: string;
  officeId: string;
  number: number;
  name: string;
}

export interface Wing {
  id: string;
  floorId: string;
  name: string;
}

export interface AdminDesk {
  id: string;
  name: string;
  wingId?: string;
  floorId: string;
  officeId: string;
  officeName?: string;
  floorName?: string;
  wingName?: string;
}