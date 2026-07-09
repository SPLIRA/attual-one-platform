import type { DiagnosisAnswer } from "@/features/diagnoses/types";

export type VisitHistoryItem = {
  id: string;
  companyId: string;
  companyName: string;
  visitDate: string | null;
  responsibleName: string | null;
  durationMinutes: number | null;
  notes: string | null;
  diagnosisCompleted: boolean;
  diagnosisCreatedAt: string | null;
  observations: string | null;
  checklist: VisitDiagnosisAnswer[];
};

export type VisitDiagnosisAnswer = {
  id: string;
  section: string;
  question: string;
  answer: DiagnosisAnswer;
};
