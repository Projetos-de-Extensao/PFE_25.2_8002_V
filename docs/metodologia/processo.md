# Nosso Processo de Desenvolvimento

## Metodologia Scrum Adaptada

Para garantir um desenvolvimento ágil e transparente, adotamos a metodologia **Scrum** como base para nosso fluxo de trabalho. No entanto, adaptamos o processo para a nossa realidade acadêmica, focando nos artefatos e cerimônias que nos trazem mais valor.

- **Scrum Master:** O responsável por guiar a equipe na metodologia é **João Gabriel**, cuja familiaridade com o Scrum é fundamental para o sucesso do projeto.
- **Sprints:** Nosso trabalho será organizado em ciclos, mas com a particularidade de que **não haverá reuniões diárias** (*daily meetings*). A comunicação será majoritariamente assíncrona para dar mais flexibilidade à equipe.

## O Quadro de gestão no GitHub Projects

Utilizamos o **GitHub Projects** como nossa principal ferramenta para visualizar e gerenciar o fluxo de trabalho. Nosso quadro é dividido nas seguintes colunas:

### 1. Backlog

O repositório de todas as funcionalidades e ideias. As tarefas são criadas aqui com base em análises de necessidade dos usuários (alunos e coordenação).

### 2. To Do (A Fazer)

As histórias de usuário que foram refinadas, priorizadas e estão prontas para o desenvolvimento. Para garantir a qualidade, cada história deve seguir o acrônimo **I.N.V.E.S.T.**:

#### **I — Independent (Independente)**
> Uma história deve ser autocontida, ou seja, não pode ter dependência direta de outra história. Isso permite que elas sejam desenvolvidas e entregues em qualquer ordem, dando mais flexibilidade ao planejamento.
> 
> **Na prática:** Evitamos criar uma história "Parte 1" e outra "Parte 2". Se a funcionalidade de "login com email" depende da de "cadastro de usuário", podemos ou juntá-las em uma única história maior (se for pequena o suficiente) ou dividi-las de forma que a primeira possa ser concluída e testada sem a segunda.

#### **N — Negotiable (Negociável)**
> A história não é um contrato rígido, mas sim um convite para uma conversa. Ela deve descrever o "o quê" e o "porquê", mas deixar espaço para que a equipe de desenvolvimento negocie o "como" será implementado. Detalhes técnicos são definidos em conjunto.
> 
> **Na prática:** A história pode dizer "Como aluno, quero ver meus horários de monitoria de forma clara", mas não precisa especificar "deve ser uma tabela com 5 colunas e bordas cinzas". Esses detalhes são discutidos entre o time e o Product Owner.

#### **V — Valuable (Valiosa)**
> Cada história deve entregar valor real para o usuário final ou para o cliente. Se uma história não agrega valor perceptível, devemos questionar sua necessidade. Isso evita o desenvolvimento de funcionalidades que ninguém usará.
> 
> **Na prática:** Uma história como "Refatorar o banco de dados" não tem valor direto para o usuário. Uma história melhor seria "Otimizar a busca de monitores para que o resultado apareça em menos de 1 segundo", cujo valor é claro (melhora na performance).

#### **E — Estimable (Estimável)**
> A equipe de desenvolvimento precisa ter informações suficientes para fazer uma estimativa do esforço necessário para completar a história. Se a história é muito vaga ou grande demais, a equipe não conseguirá estimá-la.
> 
> **Na prática:** Uma história como "Criar a página inicial" é muito vaga. Uma boa história seria "Criar a seção de cabeçalho da página inicial com logo, menu de navegação e botão de login".

#### **S — Small (Pequena)**
> A história deve ser pequena o suficiente para ser concluída dentro de um ciclo de trabalho (Sprint). Histórias grandes, também conhecidas como "épicos", devem ser quebradas em histórias menores. Isso facilita o planejamento e permite entregas de valor mais rápidas e constantes.
> 
> **Na prática:** "Implementar o sistema de perfil do usuário" é um épico. Histórias menores seriam: "Permitir que o usuário edite seu nome e foto", "Permitir que o usuário altere sua senha", etc.

#### **T — Testable (Testável)**
> A história deve ter critérios de aceite claros para que possa ser testada e validada. Se não soubermos como testar se a história foi concluída com sucesso, não saberemos quando ela está realmente "Done".
> 
> **Na prática:** Para uma história de login, os critérios de aceite poderiam ser:
> * *Dado que* o usuário informa email e senha corretos, *ele deve ser* redirecionado para o painel principal.
> * *Dado que* o usuário informa uma senha incorreta, *ele deve ver* a mensagem "Email ou senha inválidos".

A prioridade é definida nas reuniões de planejamento (*Planning*), com os itens mais importantes no topo da coluna.

### 3. Doing (Em Andamento)

Tarefas que estão sendo ativamente desenvolvidas por um membro da equipe.

### 4. In Review (Em Revisão)

Quando o desenvolvimento é concluído, a tarefa passa por uma revisão de código por pares. Esta etapa é crucial para garantir a qualidade e a padronização do projeto.


### 5. Done (Concluído)

Uma tarefa é considerada concluída somente após ser aprovada na etapa de revisão por outro desenvolvedor e atender a todos os seus critérios de Done.

!!! check "Critérios de Done"

    - **Padrão de Código:** O código deve ser limpo, legível e seguir as melhores práticas.
    - **Padrão de Nomenclatura:**
        - **JavaScript (variáveis, funções):** `snake_case`
        - **JavaScript (metódos):** `CamelCase`
        - **JavaScript (classes):** `lowerCamelCase`
        - **CSS (classes, IDs) e HTML (atributos):** `kebab-case`