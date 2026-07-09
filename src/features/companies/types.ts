export type CompanyListItem = {
  id: string;
  name: string;
  segment: string | null;
  city: string | null;
  created_at: string | null;
};

export type CreateCompanyInput = {
  name: string;
  segment: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  website: string;
  address: string;
  city: string;
  notes: string;
};
