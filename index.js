import { select } from '@inquirer/prompts';

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
                    name: "Sair",
                    value: "sair"
                },
            ]
        })

        switch (option) {
            case "cadastrar":
                console.log('Vamos cadastrar');
                break;
            case "listar":
                console.log('Vamos listar');
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