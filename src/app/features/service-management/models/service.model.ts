export interface Service {
  id: number;
  serviceName: string;
  code: string;
  type: string;
  status: 'Active' | 'Inactive';
}
