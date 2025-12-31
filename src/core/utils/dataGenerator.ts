export class DataGenerator {
  private static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static email(): string {
    const n = this.randomNumber(100, 9999);
    return `test_${n}@example.com`;
  }

  static firstName(): string {
    const firstNames = ["Alex", "John", "Maria", "Anna", "Yuri"];
    return firstNames[this.randomNumber(0, firstNames.length - 1)];
  }

  static address(): string {
    const n = this.randomNumber(100, 9999);
    return `${n} Main St, City, State`;
  }
}
