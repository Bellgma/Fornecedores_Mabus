# Proposta de Sistema de Gestão de Fornecedores - Mabus Empresarial LTDA

## 1. Arquitetura Sugerida

A arquitetura recomendada para o sistema interno da Mabus foca na agilidade de implementação, baixo custo de manutenção e facilidade de adoção, utilizando abordagens **No-Code / Low-Code**.

* **Tipo de Sistema:** Banco de Dados Relacional em Nuvem (Plataforma No-Code) com interface de aplicativo/dashboard.
* **Paradigma:** Sistema de Consulta Centralizada. Não haverá processamento transacional complexo (como envio de e-mails via SMTP), mas servirá como a "fonte única de verdade" para consulta de dados cadastrais, protocolos de comunicação e catálogos.
* **Modelo de Permissões:** Controle de Acesso Baseado em Função (RBAC - Role-Based Access Control) em dois níveis hierárquicos:
  * **Administradores/Gestores:** Acesso completo (CRUD - Criação, Leitura, Atualização, Exclusão) para gerenciar a base de fornecedores e atualizar os templates padrão.
  * **Cotadores:** Acesso restrito (Somente Leitura - *Read-only*). Podem realizar buscas avançadas, utilizar filtros e visualizar/copiar dados de fornecedores e templates de e-mail.

## 2. Estrutura de Dados Recomendada

A base de dados será estruturada em tabelas (ou bases) interligadas, mantendo a organização relacional.

### Tabela: Fornecedores
Armazena as informações centrais de cada empresa.
* **ID do Fornecedor:** Identificador único (Autonumeração).
* **Razão Social:** Texto.
* **Nome Fantasia:** Texto (Principal campo de exibição).
* **CNPJ:** Texto (com máscara).
* **Status:** Seleção Única (Ativo, Inativo, Em Avaliação).
* **Categorias de Fornecimento:** Seleção Múltipla (ex: Materiais de Escritório, Equipamentos de TI, Limpeza).
* **Nível de Preço/Histórico:** Classificação (ex: $, $$, $$$) ou campo de texto com notas de cotações anteriores.
* **Localidade/Estado:** Seleção Única ou Texto.
* **Data da Última Atualização:** Data automática.

### Tabela: Contatos
Relacionada 1:N com a tabela Fornecedores (Um fornecedor pode ter múltiplos contatos).
* **Nome do Contato:** Texto (Responsável pela cotação).
* **Cargo/Setor:** Texto.
* **E-mail:** Campo de e-mail.
* **Telefone Principal / WhatsApp:** Campo de telefone.
* **Fornecedor Vinculado:** Relação com a tabela Fornecedores.

### Tabela: Catálogo / O Que Fornece (Resumido)
Relacionada com a tabela Fornecedores.
* **Descrição do Produto/Serviço:** Texto ou Tags.
* **Observações Técnicas:** Texto longo (ex: "Trabalham apenas com marcas específicas").

### Tabela: Templates e Protocolos de Comunicação
Tabela de configuração geral gerenciada pelos Gestores.
* **Nome do Template:** Texto (ex: "Cotação Padrão de Produtos").
* **Assunto do E-mail Padrão:** Texto (ex: `[COTAÇÃO] Mabus Empresarial LTDA - Solicitante: {NomeCotador}`).
* **Script de Apresentação Corporativa:** Texto longo (Como o cotador deve iniciar a conversa).
* **Corpo do E-mail (Template):** Texto longo (com as variáveis marcadas).
* **E-mail Institucional Remetente Sugerido:** Seleção (ex: `cotacao@mabus.com.br`, e-mail corporativo individual).

## 3. Fluxo de Uso do Cotador

O processo diário do cotador será rápido, linear e focado na extração de informações para o disparo do e-mail via cliente próprio (Outlook).

1. **Acesso à Plataforma:** O cotador faz login no painel (via web ou app) com seu perfil de *Read-only*.
2. **Busca e Filtragem:** Na tela inicial, o cotador utiliza a barra de busca ou os filtros para localizar potenciais fornecedores (ex: filtra por Categoria = "Equipamentos de TI", Localidade = "SP").
3. **Análise Rápida:** O sistema exibe uma lista de cards ou uma tabela filtrada. O cotador analisa o histórico de preços e o catálogo resumido para selecionar os melhores candidatos.
4. **Consulta do Perfil do Fornecedor:** O cotador clica no fornecedor escolhido. A tela de detalhes exibe os dados cadastrais e o(s) contato(s) direto(s).
5. **Acesso ao Protocolo de Comunicação:** Na mesma tela (ou aba lateral), é exibido o **Template de Solicitação**. O sistema, de forma ideal, já substitui as variáveis pelo nome do fornecedor e contato automaticamente, se a ferramenta permitir.
6. **Cópia e Disparo:**
   - O cotador copia o endereço de e-mail do contato.
   - Copia o *Assunto* e o *Corpo do E-mail* do template.
   - Cola as informações em seu Microsoft Outlook corporativo.
   - Preenche manualmente as variáveis de itens (lista de produtos) e o prazo de resposta.
   - Realiza o envio.

## 4. Exemplos de Scripts e Templates

### Script de Apresentação (Para Contato Telefônico Prévio ou WhatsApp)
> "Olá, bom dia/boa tarde. Meu nome é **[Nome do Cotador]**, falo da **Mabus Empresarial LTDA**. Somos uma empresa que atua com fornecimento para órgãos governamentais e gostaríamos de incluí-los no nosso painel de fornecedores para futuras compras. Teria um e-mail para qual eu possa encaminhar nossa solicitação de orçamento atual?"

### Template de Solicitação de Orçamento (E-mail)

**De:** (E-mail corporativo do cotador ou `cotacao@mabus.com.br`)
**Para:** `[E-mail_do_Fornecedor]`
**Assunto:** Cotação de Produtos/Serviços - Mabus Empresarial LTDA - Prazo: `[DD/MM/AAAA]`

**Corpo da Mensagem:**

> Prezado(a) **[Nome_do_Contato]** / Equipe Comercial,
>
> Somos da **Mabus Empresarial LTDA**, fornecedores de produtos e serviços para entidades governamentais.
>
> Gostaríamos de solicitar a cotação com a melhor condição comercial (preço e prazo de entrega) para os itens abaixo listados:
>
> 1. [Descrição do Item 1 - Quantidade - Especificações]
> 2. [Descrição do Item 2 - Quantidade - Especificações]
> 3. [Descrição do Item n...]
>
> **Condições da Cotação:**
> *   **Prazo limite para resposta:** `[DD/MM/AAAA]` até às `[HH:MM]`.
> *   Por favor, informar na proposta os prazos de entrega, validade da proposta e condições de pagamento aceitas.
> *   Os valores devem incluir todos os impostos e frete para o CEP: [Seu CEP / Cidade].
>
> Ficamos no aguardo da sua proposta e à disposição para eventuais dúvidas.
>
> Atenciosamente,
>
> **[Nome do Cotador]**
> Departamento de Compras | Mabus Empresarial LTDA
> [Seu Telefone]
> www.mabus.com.br

## 5. Sugestão de Ferramentas (No-Code / Low-Code)

Abaixo estão as opções recomendadas considerando o orçamento enxuto, velocidade de implementação e necessidade de controle de acesso simples.

### Opção 1: Airtable (Recomendação Principal)
*   **Por que escolher:** Funciona como uma planilha turbinada misturada com banco de dados. É excelente para criar relações entre tabelas (Fornecedores -> Contatos -> Interações) e oferece um recurso nativo de "Interfaces" onde é possível criar um dashboard amigável e restrito para os cotadores (apenas visualização), separando-os da base de dados bruta gerida pelos gestores.
*   **Prós:** Visualização em galeria/cards, filtros potentes, recurso de "Interfaces" nativo para gestão de permissões de leitura, curva de aprendizado baixa para criar a estrutura.
*   **Contras:** O plano gratuito tem limite de registros (1.000 por base). Para controle de permissões mais rigoroso de edição/leitura por usuário, pode exigir o plano pago (Team).

### Opção 2: Glide (A Melhor Experiência de Usuário / App)
*   **Por que escolher:** Permite transformar uma planilha do Google Sheets, Excel ou Airtable em um aplicativo (web/mobile) com visual extremamente polido em minutos.
*   **Prós:** Experiência "app-like" excelente para os cotadores buscarem dados rapidamente no celular ou PC. É muito fácil configurar que o app seja apenas de visualização. Permite botão de "copiar para a área de transferência" o que agiliza muito o fluxo dos templates.
*   **Contras:** Custo pode aumentar se houver muitos usuários ou atualizações constantes, dependendo da estrutura de preços (focado em MAUs - Monthly Active Users ou atualizações de linhas).

### Opção 3: Notion (A Mais Flexível e Documental)
*   **Por que escolher:** Ideal se a Mabus já utiliza ou planeja utilizar uma Wiki interna para processos. Os "Databases" do Notion são poderosos e permitem mesclar os dados tabulares com documentos ricos.
*   **Prós:** Custo muito acessível (plano Plus atende perfeitamente). Excelente para armazenar não só a tabela de fornecedores, mas também guias, manuais e POPs (Procedimento Operacional Padrão) da Mabus. Fácil de compartilhar páginas em modo "read-only".
*   **Contras:** Pode ficar um pouco lento ou desorganizado se a base de fornecedores crescer para milhares de registros. A interface tabular é menos "rígida" que o Airtable.

### Opção 4: NocoDB / Baserow (Alternativas Self-Hosted / Código Aberto)
*   **Por que escolher:** Se o foco é fugir completamente de mensalidades por usuário e a Mabus tem uma pessoa técnica (TI) para hospedar a aplicação num servidor próprio (ex: AWS, DigitalOcean).
*   **Prós:** Controle total dos dados, custo restrito apenas ao servidor (infraestrutura), não há limite de usuários ou registros em planos self-hosted. Baserow é muito parecido com Airtable.
*   **Contras:** Exige conhecimento técnico para instalar, configurar, fazer backups e manter o servidor rodando em segurança.

### Veredito / Próximo Passo
Para o cenário da Mabus Empresarial LTDA, iniciar com o **Airtable** criando um dashboard simples via "Airtable Interfaces", ou utilizar o **Glide** (conectado a uma base no Google Sheets) para ter um portal de cotadores com botões de "Copiar Template", trará o maior retorno em agilidade com o menor esforço inicial de implementação.
