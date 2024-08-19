export class CronParser {
    private cronExpression: string;

    constructor(cronExpression: string) {
        this.cronExpression = cronExpression;
    }

    getMinutes(): number[] {
        const minuteField = this.cronExpression.split(' ')[0];
        return this.parseField(minuteField, 0, 59);
    }

    getHours(): number[] {
        const hourField = this.cronExpression.split(' ')[1];
        return this.parseField(hourField, 0, 23);
    }

    private parseField(field: string, min: number, max: number): number[] {
        const result: Set<number> = new Set();

        // Wildcard case
        if (field === '*') {
            return Array.from({ length: max - min + 1 }, (_, i) => i + min);
        }

        // Handle intervals (e.g., */5 or 0-10/2)
        if (field.includes('/')) {
            const [base, interval] = field.split('/');
            const step = parseInt(interval, 10);

            if (base === '*') {
                // * / interval
                for (let i = min; i <= max; i += step) {
                    result.add(i);
                }
            } else {
                // Range or single value / interval
                const start = this.parseRangeOrSingle(base, min, max);
                for (let i = start; i <= max; i += step) {
                    result.add(i);
                }
            }
            return Array.from(result).filter(n => n >= min && n <= max);
        }

        // Handle lists (e.g., 0,5,10-15)
        if (field.includes(',')) {
            const parts = field.split(',');
            parts.forEach(part => {
                if (part.includes('-')) {
                    this.parseRange(part, min, max).forEach(num => result.add(num));
                } else {
                    result.add(this.parseRangeOrSingle(part, min, max));
                }
            });
            return Array.from(result).sort((a, b) => a - b);
        }

        // Handle ranges (e.g., 5-15)
        if (field.includes('-')) {
            return this.parseRange(field, min, max);
        }

        // Handle single value
        return [this.parseRangeOrSingle(field, min, max)];
    }

    private parseRangeOrSingle(value: string, min: number, max: number): number {
        const num = parseInt(value, 10);
        if (isNaN(num)) return NaN;
        return Math.max(min, Math.min(max, num));
    }

    private parseRange(range: string, min: number, max: number): number[] {
        const [start, end] = range.split('-').map(value => this.parseRangeOrSingle(value, min, max));
        if (isNaN(start) || isNaN(end) || start > end) return [];
        return Array.from({ length: end - start + 1 }, (_, i) => start + i).filter(n => n >= min && n <= max);
    }
}
