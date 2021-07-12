class ScoreScript {
    threats = 0;

    defeatedThreats = 0;

    score = 0;

    treasures = 0;

    addThreat(): void {
        this.threats++;
    }

    removeThreat(): void {
        this.threats--;
        this.defeatedThreats++;
    }

    allGoneThreat(): boolean {
        return this.threats <= 0;
    }

    treasurePickup(): void {
        this.score += 100;
        this.treasures++;
    }

    returnScore(): number {
        return this.score;
    }

    returnTreasure(): number {
        return this.treasures;
    }

    returnThreats(): number {
        return this.defeatedThreats;
    }
}

const Score = new ScoreScript();

export default Score;
