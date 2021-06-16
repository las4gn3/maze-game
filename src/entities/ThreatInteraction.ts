import { Threats } from '../scripts/threatCounter';

const actions = ['club', 'disarm', 'run', 'trim', 'debug'];

export default function ThreatScript(name = 'workstation', correctAction = 'debug') {
    return new Promise((resolve, reject) => {
        const inputMessage = `** Interaction with ${name} ** \n
            Type a valid action from the list and press OK. \n
            Press cancel or type run to run away. \n
            Actions: ${actions.join(', ')}`;
        let input = prompt(inputMessage).toLowerCase();
        let outputMessage = '';
        while (!input || !actions.includes(input)) {
            let err = null;
            if (input === null) input = 'run';
            if (!actions.includes(input)) err = 'Invalid action';
            if (input === '') err = 'Input cannot be empty';
            if (err) input = prompt(`ERROR: ${err} \n ${inputMessage}`);
        }

        if (input === 'run') {
            outputMessage = 'User ran away';
            if (Math.random() < 0.1) return resolve(outputMessage);
            return reject(outputMessage);
        }
        if (input === correctAction) {
            outputMessage = `Correct action: ${input}`;
            Threats.remove();
            return resolve(outputMessage);
        }
        const error = `Wrong action: ${input}`;
        return reject(error);
    });
}
