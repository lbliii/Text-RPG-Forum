declare namespace App {
  interface Locals {}
  interface PageData {}
  interface Error {}

  interface Platform {
    cookie(name: string): string | undefined;
    cookie(name: string, value: string, options?: {
      domain?: string;
      expires?: Date;
      httpOnly?: boolean;
      maxAge?: number;
      path?: string;
      sameSite?: 'strict' | 'lax';
      secure?: boolean;
      signed?: boolean;
    }): void;
  }
}
