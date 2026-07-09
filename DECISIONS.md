# Decisions

Este arquivo registra decisoes tecnicas e organizacionais relevantes do projeto.

Use o formato abaixo para novas decisoes:

```text
## ADR-0000 - Titulo Da Decisao

Data: YYYY-MM-DD
Status: Proposed | Accepted | Superseded

Contexto:
Descreva o problema ou necessidade.

Decisao:
Descreva a decisao tomada.

Consequencias:
Liste impactos, trade-offs e proximos cuidados.
```

## ADR-0001 - Fundacao Em Next.js 15

Data: 2026-07-08
Status: Accepted

Contexto:
O projeto precisa de uma base moderna, profissional e preparada para evoluir com frontend, PWA e integracoes futuras.

Decisao:
Usar Next.js 15 com TypeScript, Tailwind CSS, Supabase preparado como infraestrutura futura, PWA, ESLint e Prettier.

Consequencias:
A base fica pronta para evolucao incremental, mantendo separacao por camadas e padronizacao tecnica desde o inicio.

## ADR-0002 - Clean Architecture Como Diretriz

Data: 2026-07-08
Status: Accepted

Contexto:
O projeto precisa evitar acoplamento precoce entre interface, regras de negocio e servicos externos.

Decisao:
Organizar o codigo em camadas claras dentro de `src/`, mantendo funcionalidades futuras em `features/` e infraestrutura em `lib/` ou `services/`.

Consequencias:
Novas funcionalidades devem respeitar fronteiras arquiteturais e documentar excecoes quando necessario.

## ADR-0003 - Documentacao Antes De Funcionalidades

Data: 2026-07-08
Status: Accepted

Contexto:
A evolucao do projeto deve seguir um padrao de software house profissional, com planejamento, rastreabilidade e criterios claros.

Decisao:
Criar documentos centrais e pastas de documentacao antes de implementar produto, telas, banco ou autenticacao.

Consequencias:
O projeto ganha governanca e reduz risco de implementacoes desalinhadas com negocio, UX e arquitetura.
