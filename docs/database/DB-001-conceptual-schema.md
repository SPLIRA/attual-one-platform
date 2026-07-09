# DB-001 - Conceptual Schema

ATTUAL ONE Insight MVP 0.1

Status: Draft  
Tipo: Documento conceitual  
Escopo: Modelagem inicial de dados, sem implementacao fisica

## Objetivo

Descrever o banco conceitual do ATTUAL ONE Insight MVP 0.1 para orientar futuras discussoes de produto, arquitetura e implementacao.

Este documento nao cria banco real, migrations, tabelas no Supabase, autenticacao ou qualquer funcionalidade.

## Principios De Modelagem

- O modelo deve ser simples o suficiente para o MVP 0.1.
- Cada tabela deve representar um conceito de negocio claro.
- Campos sensiveis devem ser coletados apenas quando forem necessarios.
- Relacionamentos devem favorecer rastreabilidade entre empresa, contato, visita, diagnostico e acompanhamento.
- Dados operacionais devem ser separados de arquivos e evidencias visuais.
- O modelo deve permitir evolucao futura para multiempresa sem exigir redesenho completo.
- Auditoria basica com `created_at` e `updated_at` deve ser considerada para todas as tabelas.

## Regra Multiempresa Futura

O MVP 0.1 deve nascer preparado para separar dados por empresa.

A tabela `companies` sera a entidade raiz. Registros operacionais devem se relacionar direta ou indiretamente a uma empresa. Em uma fase futura, essa regra podera ser reforcada com politicas de acesso, isolamento por organizacao e permissoes por usuario.

Mesmo sem implementar autenticacao agora, o desenho conceitual deve evitar dados globais sem vinculo empresarial quando houver risco de mistura entre clientes.

## Cuidados Com LGPD

- Coletar apenas dados necessarios para o diagnostico e acompanhamento comercial.
- Evitar dados sensiveis que nao sejam indispensaveis ao servico.
- Registrar finalidade clara para dados pessoais de contatos.
- Permitir revisao futura de consentimento, retencao e exclusao.
- Proteger fotos, observacoes e diagnosticos, pois podem revelar informacoes comerciais ou pessoais.
- Evitar expor dados pessoais em logs, URLs, nomes de arquivos ou mensagens de erro.
- Planejar acesso minimo necessario por perfil quando autenticacao for definida.

## Tabelas

## 1. companies

### Finalidade

Representar empresas atendidas ou analisadas pelo ATTUAL ONE Insight.

### Campos

| Campo           | Tipo sugerido              | Obrigatorio | Observacoes                                           |
| --------------- | -------------------------- | ----------- | ----------------------------------------------------- |
| `id`            | `uuid`                     | Sim         | Identificador unico da empresa.                       |
| `name`          | `text`                     | Sim         | Nome comercial ou razao social.                       |
| `document`      | `text`                     | Nao         | CNPJ ou identificador fiscal, se necessario.          |
| `segment`       | `text`                     | Nao         | Segmento de atuacao.                                  |
| `website_url`   | `text`                     | Nao         | Site principal da empresa.                            |
| `instagram_url` | `text`                     | Nao         | Perfil publico do Instagram.                          |
| `city`          | `text`                     | Nao         | Cidade principal da empresa.                          |
| `state`         | `text`                     | Nao         | Estado ou UF.                                         |
| `status`        | `text`                     | Sim         | Exemplo conceitual: `active`, `inactive`, `prospect`. |
| `created_at`    | `timestamp with time zone` | Sim         | Data de criacao.                                      |
| `updated_at`    | `timestamp with time zone` | Sim         | Data da ultima atualizacao.                           |

### Relacionamentos

- Uma empresa pode ter muitos contatos.
- Uma empresa pode ter muitas visitas.
- Uma empresa pode ter muitos diagnosticos.
- Uma empresa pode ter muitos acompanhamentos.

### Observacoes

Esta tabela deve ser a base para a futura regra multiempresa. Dados operacionais devem apontar para `companies.id` sempre que fizer sentido.

## 2. contacts

### Finalidade

Representar pessoas de contato associadas a uma empresa.

### Campos

| Campo               | Tipo sugerido              | Obrigatorio | Observacoes                        |
| ------------------- | -------------------------- | ----------- | ---------------------------------- |
| `id`                | `uuid`                     | Sim         | Identificador unico do contato.    |
| `company_id`        | `uuid`                     | Sim         | Referencia para `companies.id`.    |
| `name`              | `text`                     | Sim         | Nome da pessoa de contato.         |
| `role`              | `text`                     | Nao         | Cargo ou funcao.                   |
| `email`             | `text`                     | Nao         | E-mail profissional.               |
| `phone`             | `text`                     | Nao         | Telefone ou WhatsApp.              |
| `preferred_channel` | `text`                     | Nao         | Canal preferencial de contato.     |
| `notes`             | `text`                     | Nao         | Observacoes comerciais relevantes. |
| `created_at`        | `timestamp with time zone` | Sim         | Data de criacao.                   |
| `updated_at`        | `timestamp with time zone` | Sim         | Data da ultima atualizacao.        |

### Relacionamentos

- Um contato pertence a uma empresa.
- Um contato pode estar associado a visitas, diagnosticos ou follow-ups como responsavel principal.

### Observacoes

Como esta tabela pode conter dados pessoais, deve seguir criterios de minimizacao e finalidade. Campos opcionais devem ser preenchidos apenas quando houver necessidade operacional.

## 3. visits

### Finalidade

Registrar visitas, reunioes ou interacoes de levantamento realizadas com uma empresa.

### Campos

| Campo        | Tipo sugerido              | Obrigatorio | Observacoes                                                     |
| ------------ | -------------------------- | ----------- | --------------------------------------------------------------- |
| `id`         | `uuid`                     | Sim         | Identificador unico da visita.                                  |
| `company_id` | `uuid`                     | Sim         | Referencia para `companies.id`.                                 |
| `contact_id` | `uuid`                     | Nao         | Referencia para `contacts.id`, quando houver contato principal. |
| `visit_date` | `timestamp with time zone` | Sim         | Data e hora da visita ou reuniao.                               |
| `visit_type` | `text`                     | Sim         | Exemplo conceitual: `online`, `onsite`, `phone`.                |
| `summary`    | `text`                     | Nao         | Resumo do que foi observado.                                    |
| `next_steps` | `text`                     | Nao         | Proximos passos combinados.                                     |
| `created_at` | `timestamp with time zone` | Sim         | Data de criacao.                                                |
| `updated_at` | `timestamp with time zone` | Sim         | Data da ultima atualizacao.                                     |

### Relacionamentos

- Uma visita pertence a uma empresa.
- Uma visita pode ter um contato principal.
- Uma visita pode originar um diagnostico.

### Observacoes

A visita representa contexto operacional. Ela nao deve substituir o diagnostico, que possui estrutura propria.

## 4. diagnoses

### Finalidade

Representar um diagnostico de presenca digital, processo comercial ou oportunidade de melhoria para uma empresa.

### Campos

| Campo             | Tipo sugerido              | Obrigatorio | Observacoes                                                         |
| ----------------- | -------------------------- | ----------- | ------------------------------------------------------------------- |
| `id`              | `uuid`                     | Sim         | Identificador unico do diagnostico.                                 |
| `company_id`      | `uuid`                     | Sim         | Referencia para `companies.id`.                                     |
| `visit_id`        | `uuid`                     | Nao         | Referencia para `visits.id`, se o diagnostico nasceu de uma visita. |
| `contact_id`      | `uuid`                     | Nao         | Referencia para `contacts.id`, se houver interlocutor principal.    |
| `title`           | `text`                     | Sim         | Titulo curto do diagnostico.                                        |
| `summary`         | `text`                     | Sim         | Resumo executivo.                                                   |
| `score`           | `integer`                  | Nao         | Pontuacao conceitual, caso seja definida no produto.                |
| `status`          | `text`                     | Sim         | Exemplo conceitual: `draft`, `reviewed`, `delivered`.               |
| `recommendations` | `text`                     | Nao         | Recomendacoes gerais.                                               |
| `created_at`      | `timestamp with time zone` | Sim         | Data de criacao.                                                    |
| `updated_at`      | `timestamp with time zone` | Sim         | Data da ultima atualizacao.                                         |

### Relacionamentos

- Um diagnostico pertence a uma empresa.
- Um diagnostico pode estar ligado a uma visita.
- Um diagnostico pode ter muitas dores.
- Um diagnostico pode ter muitos canais avaliados.
- Um diagnostico pode ter muitas fotos.
- Um diagnostico pode gerar follow-ups.

### Observacoes

Esta e a entidade central do MVP 0.1. O diagnostico deve consolidar evidencias e conclusoes, mas detalhes repetiveis devem ficar nas tabelas auxiliares.

## 5. diagnosis_pains

### Finalidade

Registrar dores, problemas ou oportunidades identificadas em um diagnostico.

### Campos

| Campo            | Tipo sugerido              | Obrigatorio | Observacoes                                  |
| ---------------- | -------------------------- | ----------- | -------------------------------------------- |
| `id`             | `uuid`                     | Sim         | Identificador unico da dor.                  |
| `diagnosis_id`   | `uuid`                     | Sim         | Referencia para `diagnoses.id`.              |
| `category`       | `text`                     | Nao         | Categoria da dor, se houver taxonomia.       |
| `description`    | `text`                     | Sim         | Descricao objetiva do problema.              |
| `impact`         | `text`                     | Nao         | Impacto percebido no negocio.                |
| `severity`       | `text`                     | Nao         | Exemplo conceitual: `low`, `medium`, `high`. |
| `recommendation` | `text`                     | Nao         | Recomendacao especifica para esta dor.       |
| `created_at`     | `timestamp with time zone` | Sim         | Data de criacao.                             |
| `updated_at`     | `timestamp with time zone` | Sim         | Data da ultima atualizacao.                  |

### Relacionamentos

- Uma dor pertence a um diagnostico.

### Observacoes

As dores devem ser descritas em linguagem clara, evitando julgamentos vagos. Uma futura taxonomia pode padronizar categorias e severidades.

## 6. diagnosis_channels

### Finalidade

Registrar canais avaliados em um diagnostico, como site, Instagram, Google Business Profile, WhatsApp ou outros pontos de contato.

### Campos

| Campo           | Tipo sugerido              | Obrigatorio | Observacoes                                  |
| --------------- | -------------------------- | ----------- | -------------------------------------------- |
| `id`            | `uuid`                     | Sim         | Identificador unico do canal avaliado.       |
| `diagnosis_id`  | `uuid`                     | Sim         | Referencia para `diagnoses.id`.              |
| `channel_name`  | `text`                     | Sim         | Nome do canal avaliado.                      |
| `channel_url`   | `text`                     | Nao         | URL do canal, quando aplicavel.              |
| `current_state` | `text`                     | Nao         | Situacao observada.                          |
| `opportunity`   | `text`                     | Nao         | Oportunidade identificada.                   |
| `priority`      | `text`                     | Nao         | Exemplo conceitual: `low`, `medium`, `high`. |
| `created_at`    | `timestamp with time zone` | Sim         | Data de criacao.                             |
| `updated_at`    | `timestamp with time zone` | Sim         | Data da ultima atualizacao.                  |

### Relacionamentos

- Um canal avaliado pertence a um diagnostico.

### Observacoes

Esta tabela evita que canais sejam armazenados como texto solto dentro do diagnostico. Isso facilita filtros, comparacoes futuras e relatorios.

## 7. diagnosis_photos

### Finalidade

Registrar referencias a fotos ou imagens usadas como evidencia em um diagnostico.

### Campos

| Campo          | Tipo sugerido              | Obrigatorio | Observacoes                                        |
| -------------- | -------------------------- | ----------- | -------------------------------------------------- |
| `id`           | `uuid`                     | Sim         | Identificador unico da foto.                       |
| `diagnosis_id` | `uuid`                     | Sim         | Referencia para `diagnoses.id`.                    |
| `file_url`     | `text`                     | Sim         | URL ou caminho do arquivo em armazenamento futuro. |
| `caption`      | `text`                     | Nao         | Legenda descritiva.                                |
| `source`       | `text`                     | Nao         | Origem da imagem, se relevante.                    |
| `sort_order`   | `integer`                  | Nao         | Ordem de exibicao futura.                          |
| `created_at`   | `timestamp with time zone` | Sim         | Data de criacao.                                   |
| `updated_at`   | `timestamp with time zone` | Sim         | Data da ultima atualizacao.                        |

### Relacionamentos

- Uma foto pertence a um diagnostico.

### Observacoes

O MVP 0.1 nao deve definir ainda bucket, storage, upload ou permissoes de arquivo. Este documento descreve apenas a referencia conceitual.

## 8. follow_ups

### Finalidade

Registrar acompanhamentos posteriores relacionados a uma empresa, contato, visita ou diagnostico.

### Campos

| Campo          | Tipo sugerido              | Obrigatorio | Observacoes                                                          |
| -------------- | -------------------------- | ----------- | -------------------------------------------------------------------- |
| `id`           | `uuid`                     | Sim         | Identificador unico do follow-up.                                    |
| `company_id`   | `uuid`                     | Sim         | Referencia para `companies.id`.                                      |
| `contact_id`   | `uuid`                     | Nao         | Referencia para `contacts.id`, quando houver contato principal.      |
| `diagnosis_id` | `uuid`                     | Nao         | Referencia para `diagnoses.id`, quando relacionado a um diagnostico. |
| `scheduled_at` | `timestamp with time zone` | Nao         | Data planejada para o acompanhamento.                                |
| `completed_at` | `timestamp with time zone` | Nao         | Data de conclusao, quando aplicavel.                                 |
| `channel`      | `text`                     | Nao         | Canal do contato, como WhatsApp, e-mail ou ligacao.                  |
| `status`       | `text`                     | Sim         | Exemplo conceitual: `pending`, `completed`, `canceled`.              |
| `notes`        | `text`                     | Nao         | Observacoes sobre o acompanhamento.                                  |
| `created_at`   | `timestamp with time zone` | Sim         | Data de criacao.                                                     |
| `updated_at`   | `timestamp with time zone` | Sim         | Data da ultima atualizacao.                                          |

### Relacionamentos

- Um follow-up pertence a uma empresa.
- Um follow-up pode estar ligado a um contato.
- Um follow-up pode estar ligado a um diagnostico.

### Observacoes

Follow-ups devem manter a continuidade comercial sem virar uma ferramenta completa de CRM no MVP 0.1.

## O Que Nao Entra No MVP 0.1

- Banco real no Supabase.
- Migrations.
- Row Level Security.
- Autenticacao.
- Controle de usuarios, papeis e permissoes.
- CRM completo.
- Automacoes de mensagens.
- Upload real de arquivos.
- Buckets de storage.
- Historico completo de auditoria.
- Assinaturas, pagamentos ou cobranca.
- Relatorios avancados.
- Inteligencia artificial aplicada aos diagnosticos.
- Multiempresa com isolamento tecnico implementado.

## Observacao Final

Este documento e uma referencia conceitual para decisao futura. Antes de implementacao fisica, o modelo deve ser revisado contra requisitos de produto, LGPD, seguranca, UX e operacao.
