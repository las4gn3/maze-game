class ThreatCounter {
    threats = 0;

    add(): void {
        this.threats++;
        console.log(`added. remaining: ${this.threats}`);
    }

    remove(): void {
        this.threats--;
        console.log(`removed. remaining: ${this.threats}`);
    }

    allGone(): boolean {
        return this.threats <= 0;
    }

    print(): void {
        console.log(`Remaining threats: ${this.threats}`);
    }

    reset(): void {
        this.threats = 0;
    }
}

export const Threats = new ThreatCounter();
