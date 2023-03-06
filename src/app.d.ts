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

export interface character {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: 'Androgyne' | 'Cisgender' | 'Bigender' | 'Fluid' | 'Non-Binary' | 'Queer' | 'Transgender' 
  bio: string;
  user_id: string;
  relationship_status: string;
  species: string;
  soul: string;
  avatar: string;
}

  