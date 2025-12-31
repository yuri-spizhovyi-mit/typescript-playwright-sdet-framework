export class DataGenerator {
  static randomString(length: number = 10): string {
    return Math.random().toString(36).substring(2, length + 2);
  }

  static randomEmail(): string {
    return 	est_@example.com;
  }

  static randomNumber(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static fullName(): string {
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie'];
    const lastNames = ['Smith', 'Doe', 'Johnson', 'Brown', 'Wilson'];
    return ${firstNames[this.randomNumber(0, 4)]} ;
  }

  static address(): string {
    return ${this.randomNumber(100, 9999)} Main St, City, State ;
  }
}
