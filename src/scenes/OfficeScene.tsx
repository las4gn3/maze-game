import React, { Fragment } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import PizzaPickup from '../entities/PizzaPickup';
import ZombiePlant from '../entities/ZombiePlant';
import Player from '../entities/Player';
import Workstation from '../entities/Workstation';
import spriteData from '../spriteData';
import { Score } from '../scripts/score';
import { Room } from '../scripts/mazeRooms';

Room.seedNewRoom();

const str = Room.returnCurrentRoom();
const mapData = mapDataString(str);

function countThreatsInScene(map) {
    Score.reset();
    const arr = map.split('');
    for (const a in arr) {
        if (['W', 'Z'].some(e => e.includes(arr[a]))) Score.addThreat();
    }
}
countThreatsInScene(str);
const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.objects} state="floor" />
        </GameObject>
    );

    switch (type) {
        case '·':
            return floor;
        case 'o':
            return (
                <Fragment key={key}>
                    {floor}
                    <PizzaPickup {...position} />
                </Fragment>
            );
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        case 'W':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        case 'Z':
            return (
                <Fragment key={key}>
                    {floor}
                    <ZombiePlant {...position} />
                </Fragment>
            );
        default:
            return null;
    }
};

export default function OfficeScene() {
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={16} y={5}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="exit"
                    enterDirection={[-1, 0]}
                    target="other/start"
                    controlled
                />
            </GameObject>
            <Player x={6} y={3} />
        </>
    );
}
