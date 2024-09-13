import { select, input, checkbox } from '@inquirer/prompts';

const goals = [
    {
        value: 'Tomar 2L de água',
        checked: false
    }
];

const registerGoal = async () => {
    const goal = await input({ message: 'Digite a meta: ' });

    if (goal.length === 0) {
        console.log('A meta não pode ser vazia.');
        return;
    }

    goals.push({ value: goal, checked: false })
}

const listGoals = async () => {
    const answers = await checkbox({
        message: "Use as setas para mudas de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices: [...goals],
        instructions: false
    });

    goals.forEach(goal => goal.checked = false)

    if (answers.length === 0) {
        console.log('Nenhuma meta selecionada!');
        return;
    }

    answers.forEach(response => {
        const goal = goals.find(goal => goal.value === response);

        goal.checked = true;
    })

    console.log('Meta(s) marcada(s) como concluída(s)');

}

const goalsAccomplished = async() => {
    const accomplished = goals.filter(goal => goal.checked === true);

    if (accomplished.length === 0) {
        console.log('Não exitem metas realizadas :(');
        return;
    }
    
    await select({
        message: "Metas Realizadas",
        choices: [...accomplished]
    })
} 

const start = async () => {

    while (true) {

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
                    name: "Sair",
                    value: "sair"
                },
            ]
        })

        switch (option) {
            case "cadastrar":
                await registerGoal();
                console.log(goals);
                break;
            case "listar":
                await listGoals();
                break;
            case "realizadas":
                goalsAccomplished();
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