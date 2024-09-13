# App de Metas

Bem-vindo ao App de Metas! Desenvolvi na NLW 17 trilha para iniciante. Este aplicativo permite que você registre, liste e gerencie suas metas de forma simples e eficiente.

## Instalação

1. Clone o repositório:
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_REPOSITORIO>
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

## Uso

### Menu Principal

Ao iniciar o aplicativo, você verá um menu principal com as seguintes opções:
- Carregar Metas
- Salvar Metas
- Registrar Meta
- Listar Metas
- Deletar Meta
- Sair

### Carregar Metas

Para carregar as metas salvas no arquivo `goals.json`, o aplicativo utiliza a função `loadGoals`.

### Salvar Metas

Para salvar as metas no arquivo `goals.json`, o aplicativo utiliza a função `saveGoals`.

### Registrar Meta

Para registrar uma nova meta, o aplicativo utiliza a função `registerGoal`. Você será solicitado a digitar a meta desejada.

### Listar Metas

Para listar as metas cadastradas, o aplicativo utiliza a função `listGoals`. Você poderá marcar ou desmarcar metas utilizando as setas e a barra de espaço.

### Deletar Meta

Para deletar uma meta, o aplicativo utiliza a função `deleteGoal`. Você poderá selecionar a meta que deseja deletar a partir da lista de metas cadastradas.

## Estrutura do Código

```javascript
import { select, input, checkbox } from '@inquirer/prompts';
import { promises as fs } from 'fs';

let message = 'Bem-Vindo ao App de Metas';

let goals;

const loadGoals = async () => {
    try {
        const data = await fs.readFile("goals.json", "utf-8");
        goals = JSON.parse(data);
    } 
    catch (error) {
        goals = [];
    }
}

const saveGoals = async () => {
    await fs.writeFile("goals.json", JSON.stringify(goals, null, 2));
}

const registerGoal = async () => {
    const goal = await input({ message: 'Digite a meta: ' });

    if (goal.length === 0) {
        message = 'A meta não pode ser vazia.';
        return;
    }

    goals.push({ value: goal, checked: false });

    message = "Meta cadastrada com sucesso!";
}

const listGoals = async () => {
    if (goals.length === 0) {
        message = 'Nenhuma meta cadastrada';
        return;
    }

    const answers = await checkbox({
        message: "Use as setas para mudas de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
    });
}

const deleteGoal = async () => {
    if (goals.length === 0) {
        message = 'Nenhuma meta cadastrada';
        return;
    }

    const goalToDelete = await select({
        message: 'Selecione a meta que deseja deletar:',
        choices: goals.map((goal, index) => ({ name: goal.value, value: index })),
    });

    goals.splice(goalToDelete, 1);

    message = 'Meta deletada com sucesso!';
}