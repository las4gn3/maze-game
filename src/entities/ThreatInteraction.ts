import { Score } from '../scripts/score';

const actions = ['trim', 'debug', 'run'];

export default function ThreatScript(name = 'workstation', correctAction = 'debug') {
    return new Promise((resolve, reject) => {
        const inputMessage = `
How would you like to interact with the ${name}?

Pick an action from the below list:

${actions.join(', ')}`;
        let input = prompt(inputMessage)?.toLowerCase();
        let outputMessage = '';
        while (!input || !actions.includes(input)) {
            let err = null;
            if (input === null) input = 'run';
            if (!actions.includes(input)) err = 'Invalid action';
            if (input === '') err = 'Input cannot be empty';
            if (err) input = prompt(`Invalid action! Try again. \n ${inputMessage}`);
        }

        if (input === 'run') {
            outputMessage = 'User ran away';
            return reject(outputMessage);
        }
        if (input === correctAction) {
            outputMessage = `Correct action: ${input}!`;
            Score.removeThreat();
            return resolve(outputMessage);
        }
        return reject(alert(`Wrong action: "${input}"! Try again.`));
    });
}
