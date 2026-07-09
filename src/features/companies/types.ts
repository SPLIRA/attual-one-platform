export type CompanyListItem = {
  id: string;
  name: string;
  segment: string | null;
  city: string | null;
  status: string | null;
  lastVisitAt: string | null;
  created_at: string | null;
};

export type CompanyDetails = CompanyListItem & {
  phone: string | null;
  whatsapp: string | null;
  instagram: string | null;
  website: string | null;
  address: string | null;
  notes: string | null;
  updated_at: string | null;
};

export type CompanyFormInput = {
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

export type CreateCompanyInput = CompanyFormInput;

export type UpdateCompanyInput = CompanyFormInput;
