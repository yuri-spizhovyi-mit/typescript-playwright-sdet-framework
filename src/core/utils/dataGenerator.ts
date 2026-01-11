export class DataGenerator {
  private static counter = Date.now();

  private static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static uniqueId(): number {
    return this.counter++;
  }

  // -------------------------
  // Existing (unchanged)
  // -------------------------

  static email(): string {
    return `test_${this.uniqueId()}@example.com`;
  }

  static firstName(): string {
    const firstNames = ["Alex", "John", "Maria", "Anna", "Yuri"];
    return firstNames[this.randomNumber(0, firstNames.length - 1)];
  }

  static address(): string {
    const n = this.randomNumber(100, 9999);
    return `${n} Main St, City, State`;
  }

  // -------------------------
  // New (for Web Tables)
  // -------------------------

  static lastName(): string {
    const lastNames = ["Smith", "Brown", "Taylor", "Ivanov", "Petrov"];
    return lastNames[this.randomNumber(0, lastNames.length - 1)];
  }

  static age(min = 18, max = 65): number {
    return this.randomNumber(min, max);
  }

  static salary(min = 3000, max = 15000): number {
    return this.randomNumber(min, max);
  }

  static department(): string {
    const departments = ["QA", "Automation", "DevOps", "Engineering"];
    return departments[this.randomNumber(0, departments.length - 1)];
  }

  // -------------------------
  // Convenience builders
  // -------------------------

  static webTableUser() {
    return {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
      age: this.age(),
      salary: this.salary(),
      department: this.department(),
    };
  }
}
