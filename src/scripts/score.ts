class ScoreScript {
    threats = 0;

    defeatedThreats = 0;

    score = 0;

    treasures = 0;

    addThreat(): void {
        this.threats++;
        console.log(`added. Current: ${this.threats}`);
    }

    removeThreat(): void {
        this.threats--;
        this.defeatedThreats++;
        console.log(`removed. Remaining: ${this.threats}`);
        console.log(`Score: ${this.score}`);
    }

    allGoneThreat(): boolean {
        return this.threats <= 0;
    }

    treasurePickup(): void {
        this.score += 100;
        this.treasures++;
        console.log(`Score: ${this.score}`);
        console.log(`treasures: ${this.treasures}`);
    }

    returnScore(): number {
        console.log(`score: ${this.score}`);
        return this.score;
    }

    returnTreasure(): number {
        console.log(`treasures: ${this.treasures}`);
        return this.treasures;
    }

    returnThreats(): number {
        return this.defeatedThreats;
    }
}

const Score = new ScoreScript();

export default Score;
