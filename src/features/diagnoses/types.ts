export type DiagnosisAnswer = "yes" | "partial" | "no";

export type DiagnosisQuestion = {
  id: string;
  section: "Atendimento" | "Marketing" | "Estrutura / Tecnologia" | "Gestão";
  question: string;
};

export type DiagnosisAnswers = Record<string, DiagnosisAnswer>;

export type CreateDiagnosisInput = {
  companyId: string;
  visitId: string;
  answers: DiagnosisAnswers;
  observations: string;
};

export type LatestDiagnosisByCompanyId = Map<string, string>;
