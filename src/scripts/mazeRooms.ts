import config from '../../config';
import { seedEntities } from '../../seedEntities';

class Rooms {
    base = config;

    currentRoom: string;

    oldRoom: string;

    seedNewRoom(): void {
        if (this.currentRoom) this.oldRoom = this.currentRoom;
        this.currentRoom = seedEntities(this.base);
    }

    returnCurrentRoom(): string {
        return this.currentRoom;
    }

    returnOldRoom(): string {
        return this.oldRoom;
    }
}

export const Room = new Rooms();
