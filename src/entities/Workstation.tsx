import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import spriteData from '../spriteData';
import ThreatScript from './ThreatInteraction';

function WorkstationScript() {
    const { getRef } = useGameObject();

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        ThreatScript()
            .then(() => {
                getRef().setDisabled(true);
            })
            .catch(err => {
                console.log(err);
            });
        return null;
    });
    return null;
}

export default function Workstation(props: GameObjectProps) {
    const name = `workstation-${props.x}-${props.y}`;
    return (
        <GameObject {...props} name={name} persisted>
            <Sprite {...spriteData.objects} state="workstation-1" />
            <Collider />
            <Interactable />
            <WorkstationScript />
        </GameObject>
    );
}
