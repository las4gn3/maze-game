import React from 'react';
import Collider from '../@core/Collider';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import Moveable from '../@core/Moveable';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';

function ZombiePlantScript() {
    const { getRef } = useGameObject();
    const playSfx = useSound(soundData.eating);

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        const actions = ['club', 'disarm', 'run', 'trim'];
        const name = 'zombie plant';
        const correctAction = 'trim';
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
            getRef().setDisabled(true);
            return outputMessage;
        }
        if (input === correctAction) {
            outputMessage = `Correct action: ${input}`;
            getRef().setDisabled(true);
            playSfx();
            return outputMessage;
        }
        const error = `Wrong action: ${input}`;
        getRef().setDisabled(true);
        playSfx();
        return error;
    });

    return null;
}

export default function ZombiePlant(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Interactable />
            <Sprite
                {...spriteData.objects}
                state="zombie-plant-1"
                offset={{ x: 0, y: 0.25 }}
            />
            <Moveable />
            <ZombiePlantScript />
        </GameObject>
    );
}
