export interface Account {
  id: string;
  email: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  language: 'en' | 'de' | 'es' | 'ro';
  supportAccess: boolean;
}

export interface UpdateAccount {
  firstName?: string;
  lastName?: string;
  language?: string;
  supportAccess?: boolean;
}

export interface UpdateAccountAvatar {
  avatar: Blob | null;
}

export interface UpdateAccountEmail {
  email: string;
}

export interface UpdateAccountPassword {
  currentPassword: string;
  newPassword: string;
}
