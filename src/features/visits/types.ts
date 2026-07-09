export type VisitDurationMinutes = 15 | 30 | 45 | 60;

export type CreateVisitInput = {
  companyId: string;
  companyName: string;
  visitDate: string;
  responsibleName: string;
  durationMinutes: VisitDurationMinutes;
  initialNotes: string;
};
