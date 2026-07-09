# Architecture

## Objetivo

Este documento descreve a fundacao tecnica do projeto ATTUAL ONE e as regras de organizacao para evolucao futura.

O projeto usa Next.js 15, TypeScript, Tailwind CSS, Supabase, PWA, ESLint e Prettier. A base atual nao implementa funcionalidades, telas, autenticacao ou banco de dados.

## Principios

- Separar responsabilidades por camada.
- Manter regras de negocio fora do framework.
- Evitar acoplamento direto entre features e infraestrutura.
- Preferir modulos pequenos, explicitos e testaveis.
- Documentar decisoes relevantes antes de expandir a base.

## Estrutura

```text
src/
  app/
  components/
  features/
  lib/
  hooks/
  services/
  types/
  styles/
  utils/
```

## Camadas

`src/app` concentra a entrada do Next.js App Router: layouts, metadados e rotas.

`src/components` concentra componentes reutilizaveis sem regra de negocio.

`src/features` sera o ponto principal para funcionalidades futuras, organizadas por dominio.

`src/lib` concentra adaptadores de infraestrutura, SDKs e clientes externos.

`src/hooks` concentra hooks compartilhados e genericos.

`src/services` concentra orquestracao de casos de uso e servicos de aplicacao.

`src/types` concentra contratos TypeScript transversais.

`src/styles` concentra estilos globais e configuracao visual base.

`src/utils` concentra funcoes puras e utilitarios sem dependencia de framework.

## Regras De Evolucao

- Toda nova feature deve ter fronteira clara dentro de `src/features`.
- Acesso a servicos externos deve passar por adaptadores em `src/lib` ou `src/services`.
- Componentes compartilhados nao devem depender de regras especificas de negocio.
- Tipos devem permanecer proximos do dominio que os utiliza.
- Documentos em `docs/` devem ser atualizados junto com mudancas relevantes.

## Estado Atual

A arquitetura esta preparada, mas sem funcionalidades implementadas. Supabase e PWA estao apenas configurados como fundacao tecnica.
