import React from 'react';
import Collider from '../@core/Collider';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import Moveable from '../@core/Moveable';
import ThreatScript from './ThreatInteraction';

function ZombiePlantScript() {
    const { getRef } = useGameObject();

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        ThreatScript('zombie plant', 'trim')
            .then(() => {
                getRef().setDisabled(true);
            })
            .catch(err => {
                console.log(err);
            });
    });

    return null;
}

export default function ZombiePlant(props: GameObjectProps) {
    const name = `plant-${props.x}-${props.y}`;
    return (
        <GameObject layer="obstacle" name={name} persisted {...props}>
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
