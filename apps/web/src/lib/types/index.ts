// apps/web/src/lib/types/index.ts

// ENUMS (los copiamos para usarlos en el frontend)
export enum BookFormat {
  PHYSICAL = 'PHYSICAL',
  DIGITAL = 'DIGITAL',
}

export enum BookType {
  BOOK = 'BOOK',
  MAGAZINE = 'MAGAZINE',
  COMIC = 'COMIC',
  ARTICLE = 'ARTICLE',
  JOURNAL = 'JOURNAL',
  OTHER = 'OTHER',
}

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  LOANED = 'LOANED',
  WISHLIST = 'WISHLIST',
  LOST = 'LOST',
}

export enum ReadStatus {
  UNREAD = 'UNREAD',
  READING = 'READING',
  READ = 'READ',
  DROPPED = 'DROPPED',
}

// INTERFACES DE MODELOS

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Publisher {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  published_year?: number;
  page_count?: number;
  cover_image_url?: string;
  
  // Relaciones (pueden venir incluidas o no)
  owner?: User;
  authors?: Author[];
  genres?: Genre[];
  publisher?: Publisher;

  // Campos de estado
  status: BookStatus;
  read_status: ReadStatus;

  // Otros campos que puedas necesitar mostrar
  [key: string]: any; // Para flexibilidad
}

// Tipo para los datos de sesión
export interface Session {
  user: User | null;
  token: string | null;
}