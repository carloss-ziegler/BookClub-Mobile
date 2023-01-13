export interface UserProps {
  id: string;
  username: string;
  profilePic?: string;
  email: string;
  city?: string;
  country?: string;
  name: string;
}

export interface IGenresProps {
  id: string;
  label: string;
  type: string;
}
[];

export interface BookProps {
  id: string;
  author: string;
  title: string;
  stars: number;
  thumbnail: string;
  description: string;
  author_description: string;
}
[];
