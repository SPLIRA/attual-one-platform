# UX-001 - MVP Flow

ATTUAL ONE Insight MVP 0.1

Status: Draft  
Tipo: Documento de UX  
Escopo: Fluxo conceitual, sem implementacao de telas

## Objetivo

Descrever o fluxo completo de experiencia do ATTUAL ONE Insight MVP 0.1, orientando futuras decisoes de interface, produto e implementacao.

Este documento nao cria telas, componentes, rotas, banco, login ou funcionalidades.

## Principios De UX

- O usuario deve entender rapidamente qual e o proximo passo.
- O fluxo deve priorizar coleta simples, progressiva e objetiva.
- O preenchimento deve funcionar bem em celular antes de desktop.
- Cada etapa deve ter uma acao primaria clara.
- Campos obrigatorios devem ser poucos e justificaveis.
- Mensagens devem ser diretas, humanas e acionaveis.
- O usuario deve conseguir revisar antes de salvar.
- O MVP 0.1 deve evitar configuracoes avancadas, automacoes ou escolhas desnecessarias.

## Regra Dos 3 Cliques

As acoes principais do MVP devem ser alcancadas em ate 3 cliques ou toques a partir do Dashboard:

1. Iniciar nova visita.
2. Avancar entre etapas do diagnostico.
3. Revisar e salvar diagnostico.

Se uma decisao futura exigir mais de 3 cliques para uma acao essencial, ela deve ser revisada ou documentada como excecao.

## Acessibilidade Basica

- Todo campo deve ter rotulo visivel.
- Toda acao primaria deve ter texto claro.
- Estados de erro devem usar texto, nao apenas cor.
- Contraste minimo deve ser respeitado em textos, botoes e feedbacks.
- A navegacao por teclado deve ser considerada em desktop.
- A ordem de foco deve seguir a ordem visual do fluxo.
- Tamanhos de toque devem ser confortaveis em mobile.
- Formularios devem evitar placeholder como unica instrucao.

## Navegacao PWA

- O fluxo deve funcionar em tela cheia quando instalado como PWA.
- A navegacao deve ser linear durante a criacao de uma visita.
- O botao voltar do dispositivo deve preservar o contexto sempre que possivel.
- O usuario deve receber alerta antes de perder dados nao salvos.
- A experiencia deve considerar conexoes instaveis, mesmo sem modo offline completo no MVP 0.1.
- O Dashboard deve ser o ponto de retorno apos salvar ou cancelar.

## Fluxo Completo

```text
Dashboard vazio
  -> Nova Visita
  -> Cadastro da empresa
  -> Cadastro do contato
  -> Canais usados pela empresa
  -> Dores principais
  -> Observacoes da visita
  -> Revisao dos dados
  -> Salvar diagnostico
  -> Retorno ao Dashboard
```

## 1. Tela Inicial / Dashboard Vazio

### Objetivo

Apresentar o ponto de partida do MVP e deixar claro que ainda nao existem diagnosticos cadastrados.

### Campos

Nenhum campo de entrada nesta tela.

### Acoes

- Iniciar nova visita.
- Consultar diagnosticos existentes em versoes futuras.

### Validacoes

Nenhuma validacao de formulario.

### Estados Vazios

- Exibir mensagem informando que ainda nao ha diagnosticos.
- Exibir acao primaria para criar a primeira visita.
- Evitar blocos informativos excessivos.

### Mensagens De Erro

- Se houver falha ao carregar dados futuros: "Nao foi possivel carregar os diagnosticos agora."
- Se a acao de nova visita falhar futuramente: "Nao foi possivel iniciar uma nova visita. Tente novamente."

### Comportamento Mobile-First

- A acao "Nova Visita" deve ficar visivel sem rolagem em telas pequenas.
- O estado vazio deve ser curto, centralizado na tarefa e facil de ler.
- Elementos devem respeitar area segura do dispositivo.

### O Que Nao Entra Nesta Versao

- Graficos.
- Indicadores avancados.
- Filtros.
- Busca.
- Listagem complexa.
- Kanban.
- Login.
- Configuracoes de usuario.

## 2. Botao "Nova Visita"

### Objetivo

Ser a acao principal para iniciar o fluxo de criacao de diagnostico.

### Campos

Nenhum campo.

### Acoes

- Iniciar o fluxo de visita.
- Direcionar para a primeira etapa de cadastro da empresa.

### Validacoes

- Confirmar que o fluxo pode ser iniciado sem dados pendentes conflitantes.
- Em versao futura, validar permissao do usuario antes de iniciar.

### Estados Vazios

Nao se aplica como tela isolada.

### Mensagens De Erro

- "Nao foi possivel iniciar a visita."
- "Existe uma visita em andamento. Continue ou descarte antes de iniciar outra."

### Comportamento Mobile-First

- O botao deve ter area de toque confortavel.
- Deve ser facilmente encontrado com o polegar em uso comum de celular.
- O texto deve permanecer legivel em telas estreitas.

### O Que Nao Entra Nesta Versao

- Menu com varios tipos de visita.
- Criacao em lote.
- Atalhos avancados.
- Automacao de formulario.

## 3. Cadastro Da Empresa

### Objetivo

Coletar os dados minimos da empresa analisada.

### Campos

| Campo           | Obrigatorio | Observacoes                                   |
| --------------- | ----------- | --------------------------------------------- |
| Nome da empresa | Sim         | Campo principal da etapa.                     |
| Segmento        | Nao         | Ajuda a contextualizar o diagnostico.         |
| Site            | Nao         | Usado para avaliacao futura de canal digital. |
| Instagram       | Nao         | Usado para avaliacao futura de canal digital. |
| Cidade          | Nao         | Contexto comercial.                           |
| Estado          | Nao         | Contexto regional.                            |

### Acoes

- Avancar para cadastro do contato.
- Voltar ao Dashboard com confirmacao se houver dados preenchidos.
- Limpar campos da etapa, se necessario em versao futura.

### Validacoes

- Nome da empresa deve ser preenchido.
- URLs devem ter formato valido quando preenchidas.
- Campos opcionais nao devem bloquear avanco.

### Estados Vazios

- Campos aparecem vazios com rotulos claros.
- Nao usar exemplos que confundam com dados reais.

### Mensagens De Erro

- "Informe o nome da empresa."
- "Revise o formato do site."
- "Revise o formato do Instagram."

### Comportamento Mobile-First

- Campos em coluna unica.
- Teclado adequado para URL nos campos de site e Instagram.
- Botao de avancar fixo ou facilmente acessivel ao final do formulario.
- Evitar formularios longos demais na primeira etapa.

### O Que Nao Entra Nesta Versao

- Consulta automatica de CNPJ.
- Enriquecimento automatico de dados.
- Busca de empresas existentes.
- Validacao fiscal.
- Upload de logotipo.

## 4. Cadastro Do Contato

### Objetivo

Registrar a pessoa principal de contato na empresa.

### Campos

| Campo                | Obrigatorio | Observacoes                             |
| -------------------- | ----------- | --------------------------------------- |
| Nome do contato      | Sim         | Pessoa de referencia para a visita.     |
| Cargo ou funcao      | Nao         | Ajuda a entender o papel da pessoa.     |
| Telefone ou WhatsApp | Nao         | Deve ser coletado apenas se necessario. |
| E-mail               | Nao         | Deve ser coletado apenas se necessario. |
| Canal preferencial   | Nao         | Exemplo: WhatsApp, e-mail, telefone.    |

### Acoes

- Avancar para canais usados pela empresa.
- Voltar para cadastro da empresa.
- Pular campos opcionais.

### Validacoes

- Nome do contato deve ser preenchido.
- E-mail deve ter formato valido quando preenchido.
- Telefone deve aceitar formatos comuns sem exigir mascara rigida no MVP.

### Estados Vazios

- Apresentar formulario limpo, sem dados pre-carregados.
- Indicar visualmente quais campos sao opcionais.

### Mensagens De Erro

- "Informe o nome do contato."
- "Revise o formato do e-mail."
- "Revise o telefone informado."

### Comportamento Mobile-First

- Usar teclado de telefone para campo de telefone.
- Evitar campos lado a lado.
- Manter a acao de avancar clara apos o ultimo campo.

### O Que Nao Entra Nesta Versao

- Lista de multiplos contatos.
- Importacao de agenda.
- Validacao de WhatsApp.
- Envio de mensagem.
- Consentimento digital automatizado.

## 5. Canais Usados Pela Empresa

### Objetivo

Mapear quais canais a empresa usa para atrair, atender ou converter clientes.

### Campos

| Campo                   | Obrigatorio | Observacoes                           |
| ----------------------- | ----------- | ------------------------------------- |
| Site                    | Nao         | Opcao de canal usado.                 |
| Instagram               | Nao         | Opcao de canal usado.                 |
| Google Business Profile | Nao         | Opcao de canal usado.                 |
| WhatsApp                | Nao         | Opcao de canal usado.                 |
| Facebook                | Nao         | Opcao de canal usado.                 |
| Outros canais           | Nao         | Campo livre para canais nao listados. |
| Observacao por canal    | Nao         | Texto curto sobre situacao percebida. |

### Acoes

- Selecionar canais usados.
- Adicionar observacao curta.
- Avancar para dores principais.
- Voltar para cadastro do contato.

### Validacoes

- Permitir avancar mesmo sem canais selecionados, desde que isso seja confirmado.
- Limitar textos longos em observacoes por canal.

### Estados Vazios

- Nenhum canal selecionado por padrao.
- Exibir orientacao curta: "Selecione os canais que a empresa usa hoje."

### Mensagens De Erro

- "Selecione pelo menos um canal ou confirme que nenhum canal foi identificado."
- "A observacao esta longa demais. Resuma em poucas linhas."

### Comportamento Mobile-First

- Usar checkboxes ou botoes de selecao com area de toque grande.
- Evitar tabelas.
- Permitir selecao rapida com uma mao.
- Observacoes devem abrir abaixo do canal selecionado, sem esconder contexto.

### O Que Nao Entra Nesta Versao

- Integracao com redes sociais.
- Analise automatica de perfil.
- Captura de metricas.
- Login em contas externas.
- Score automatico por canal.

## 6. Dores Principais

### Objetivo

Registrar os principais problemas, desafios ou oportunidades identificados durante a visita.

### Campos

| Campo                | Obrigatorio | Observacoes                              |
| -------------------- | ----------- | ---------------------------------------- |
| Dor principal        | Sim         | Texto objetivo sobre o problema.         |
| Impacto percebido    | Nao         | Consequencia para o negocio.             |
| Prioridade           | Nao         | Baixa, media ou alta.                    |
| Recomendacao inicial | Nao         | Direcionamento simples para acao futura. |

### Acoes

- Adicionar uma dor.
- Editar uma dor adicionada.
- Remover uma dor antes de salvar.
- Avancar para observacoes da visita.
- Voltar para canais usados.

### Validacoes

- Pelo menos uma dor deve ser informada.
- Dor principal nao deve ser vazia.
- Prioridade deve aceitar apenas valores previstos quando escolhida.

### Estados Vazios

- Exibir mensagem curta: "Nenhuma dor adicionada ainda."
- Exibir acao clara para adicionar a primeira dor.

### Mensagens De Erro

- "Descreva pelo menos uma dor principal."
- "A descricao da dor nao pode ficar vazia."
- "Escolha uma prioridade valida."

### Comportamento Mobile-First

- Formulario de dor deve ser curto.
- Lista de dores adicionadas deve ser facil de revisar em coluna unica.
- Acoes de editar e remover devem ser visiveis, mas nao competir com avancar.

### O Que Nao Entra Nesta Versao

- Biblioteca padrao de dores.
- Inteligencia artificial sugerindo dores.
- Matriz de priorizacao complexa.
- Relatorio automatico.
- Anexos por dor.

## 7. Observacoes Da Visita

### Objetivo

Registrar contexto livre da conversa, percepcoes e proximos passos combinados.

### Campos

| Campo                      | Obrigatorio | Observacoes                            |
| -------------------------- | ----------- | -------------------------------------- |
| Resumo da visita           | Nao         | Texto livre com contexto geral.        |
| Proximos passos            | Nao         | Acoes combinadas apos a visita.        |
| Data sugerida de follow-up | Nao         | Apenas planejamento conceitual no MVP. |

### Acoes

- Avancar para revisao dos dados.
- Voltar para dores principais.
- Editar textos livremente.

### Validacoes

- Campos opcionais nao devem bloquear avanco.
- Limitar tamanho maximo para evitar textos extensos demais.
- Data de follow-up, se preenchida, nao deve estar em formato invalido.

### Estados Vazios

- Permitir etapa sem observacoes.
- Indicar que os campos sao opcionais.

### Mensagens De Erro

- "O resumo esta longo demais. Reduza o texto."
- "Os proximos passos estao longos demais. Reduza o texto."
- "Revise a data sugerida para follow-up."

### Comportamento Mobile-First

- Areas de texto devem ser confortaveis para digitacao em celular.
- Evitar muitas caixas de texto na mesma tela.
- Manter salvamento final fora desta etapa para preservar a revisao.

### O Que Nao Entra Nesta Versao

- Gravacao de audio.
- Transcricao automatica.
- Agendamento real.
- Lembretes automaticos.
- Sincronizacao com calendario.

## 8. Revisao Dos Dados

### Objetivo

Permitir que o usuario revise tudo antes de salvar o diagnostico.

### Campos

Nenhum campo novo obrigatorio. A tela deve exibir resumo das etapas anteriores:

- Empresa.
- Contato.
- Canais.
- Dores.
- Observacoes.
- Proximos passos.

### Acoes

- Editar uma etapa especifica.
- Voltar para observacoes.
- Salvar diagnostico.
- Cancelar com confirmacao.

### Validacoes

- Confirmar que campos obrigatorios das etapas anteriores foram preenchidos.
- Bloquear salvamento se empresa, contato ou dor principal estiverem ausentes.

### Estados Vazios

- Secoes opcionais sem dados devem aparecer como "Nao informado".
- Secoes obrigatorias ausentes devem destacar a pendencia.

### Mensagens De Erro

- "Revise os campos obrigatorios antes de salvar."
- "O diagnostico ainda nao tem uma dor principal."
- "Os dados da empresa estao incompletos."
- "Os dados do contato estao incompletos."

### Comportamento Mobile-First

- Resumo em secoes empilhadas.
- Edicao por etapa com links ou botoes pequenos, mas acessiveis.
- Botao "Salvar diagnostico" deve ser claro e proximo ao final da revisao.

### O Que Nao Entra Nesta Versao

- Pre-visualizacao de relatorio final.
- Exportacao em PDF.
- Compartilhamento.
- Assinatura do cliente.
- Comparacao com diagnosticos anteriores.

## 9. Salvar Diagnostico

### Objetivo

Concluir o fluxo e registrar o diagnostico conforme dados revisados.

### Campos

Nenhum campo novo.

### Acoes

- Confirmar salvamento.
- Exibir feedback de sucesso.
- Retornar ao Dashboard.

### Validacoes

- Garantir que todos os dados obrigatorios estejam presentes.
- Evitar duplo envio por multiplos toques no botao.
- Em versao futura, tratar falhas de rede e persistencia.

### Estados Vazios

Nao se aplica como tela de conteudo. Pode existir estado de processamento.

### Mensagens De Erro

- "Nao foi possivel salvar o diagnostico. Tente novamente."
- "Verifique sua conexao e tente de novo."
- "Alguns dados obrigatorios estao incompletos."

### Comportamento Mobile-First

- Usar estado de carregamento visivel apos toque em salvar.
- Desabilitar temporariamente a acao para evitar duplicidade.
- Confirmacao de sucesso deve ser objetiva e nao bloquear retorno.

### O Que Nao Entra Nesta Versao

- Salvamento offline completo.
- Sincronizacao em segundo plano.
- Envio por e-mail.
- Geracao de documento.
- Integracao com CRM.

## 10. Retorno Ao Dashboard

### Objetivo

Encerrar o fluxo e devolver o usuario ao ponto central do app.

### Campos

Nenhum campo.

### Acoes

- Visualizar o diagnostico recem-salvo em lista simples futura.
- Iniciar nova visita.
- Abrir diagnostico salvo em versao futura.

### Validacoes

Nenhuma validacao de formulario.

### Estados Vazios

- Se o diagnostico foi salvo, o Dashboard nao deve mais parecer vazio.
- Se a listagem ainda nao existir no MVP visual, mostrar feedback de sucesso e manter acao de nova visita.

### Mensagens De Erro

- "Diagnostico salvo, mas nao foi possivel atualizar a lista agora."
- "Nao foi possivel carregar o Dashboard."

### Comportamento Mobile-First

- Feedback de retorno deve ser imediatamente visivel.
- Acao para nova visita deve continuar acessivel.
- Evitar modais persistentes que prendam o usuario apos salvar.

### O Que Nao Entra Nesta Versao

- Dashboard analitico.
- Graficos.
- Filtros avancados.
- Busca textual.
- Exportacoes.
- Comparativos de performance.

## Criterios De Aprovacao Da UX

- O usuario consegue iniciar uma nova visita a partir do Dashboard em ate 1 toque.
- O fluxo completo pode ser entendido sem treinamento.
- Todas as etapas possuem acao primaria clara.
- Campos obrigatorios estao identificados e sao poucos.
- O usuario consegue revisar dados antes de salvar.
- Mensagens de erro explicam como corrigir o problema.
- A experiencia funciona bem em viewport mobile.
- O fluxo nao depende de login, banco real ou integracoes externas no MVP 0.1 conceitual.
- O Dashboard e o ponto de entrada e retorno do fluxo.
- O MVP nao inclui recursos fora do escopo definido neste documento.

## Observacao Final

Este documento define a experiencia esperada para o MVP 0.1 em nivel conceitual. Qualquer implementacao futura deve passar por revisao de produto, arquitetura, acessibilidade e dados antes de virar tela real.
