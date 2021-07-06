import React from 'react';
import Collider, { TriggerEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import spriteData from '../spriteData';
import Score from '../scripts/score';

function DisableOnTriggerScript() {
    const { getRef } = useGameObject();

    useGameObjectEvent<TriggerEvent>('trigger', other => {
        if (other.name === 'player') {
            getRef().setDisabled(true);
            Score.treasurePickup();
        }
    });

    return null;
}

export default function PizzaPickup(props: GameObjectProps) {
    const name = `pizza-${props.x}-${props.y}`; // fallback name required for persisted flag
    return (
        <GameObject name={name} persisted {...props}>
            <Sprite {...spriteData.objects} state="pizza" />
            <Collider isTrigger />
            <DisableOnTriggerScript />
        </GameObject>
    );
}
