import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import spriteData from '../spriteData';
import ThreatScript from './ThreatInteraction';
import { useSound } from '../@core/Sound';
import soundData from '../soundData';

function WorkstationScript() {
    const { getRef } = useGameObject();
    const playSfx = useSound(soundData.eating);

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        ThreatScript()
            .then(() => {
                getRef().setDisabled(true);
                playSfx();
            })
            .catch(err => {
                console.log(err);
            });
        return null;
    });
    return null;
}

export default function Workstation(props: GameObjectProps) {
    return (
        <GameObject {...props}>
            <Sprite {...spriteData.objects} state="workstation-1" />
            <Collider />
            <Interactable />
            <WorkstationScript />
        </GameObject>
    );
}
