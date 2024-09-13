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
        choices: [...goals],
        instructions: false
    });

    goals.forEach(goal => goal.checked = false)

    if (answers.length === 0) {
        message = 'Nenhuma meta selecionada!';
        return;
    }

    answers.forEach(response => {
        const goal = goals.find(goal => goal.value === response);

        goal.checked = true;
    })

    message = 'Meta(s) marcada(s) como concluída(s)';

}

const goalsAccomplished = async () => {
    const accomplished = goals.filter(goal => goal.checked);

    if (accomplished.length === 0) {
        message = 'Não exitem metas realizadas :(';
        return;
    }

    await select({
        message: `Metas Realizadas ${accomplished.length}`,
        choices: [...accomplished]
    })
}

const goalsOpen = async () => {
    const open = goals.filter(goal => !goal.checked);

    if (open.length === 0) {
        message = 'Nenhuma meta aberta :)';
        return;
    }

    await select({
        message: `Metas Abertas ${open.length}`,
        choices: [...open]
    })
}

const deleteGoals = async () => {
    if (goals.length === 0) {
        message = 'Nenhuma meta cadastrada';
        return;
    }

    const unmarkedGoals = goals.map(goal => ({value: goal.value, checked: false}))

    const itensToDelete = await checkbox({
        message: "Selecione item para deletar.",
        choices: [...unmarkedGoals],
        instructions: false
    });

    if (itensToDelete.length === 0) {
        message = 'Nenhum item para deletar.';
        return;
    }

    itensToDelete.forEach(item => {
        goals = goals.filter(goal => goal.value !== item)
    })

    message = 'Meta(s) deleta(s) com sucesso.';
}

const showMessage = () => {
    console.clear();

    if (message !== '') {
        console.log(message);
        console.log("");
        message = '';
    }
}

const start = async () => {
    await loadGoals();

    while (true) {
        showMessage();
        await saveGoals();

        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                },
            ]
        })

        switch (option) {
            case "cadastrar":
                await registerGoal();
                break;
            case "listar":
                await listGoals();
                break;
            case "realizadas":
                await goalsAccomplished();
                break;
            case "abertas":
                await goalsOpen();
                break;
            case "deletar":
                await deleteGoals();
                break;
            case "sair":
                console.log('Até a próxima');
                return;
            default:
                break;
        }
    }
}

start()