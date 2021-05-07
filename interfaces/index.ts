export interface ProjectCardData {
  id: number;
  title: string;
  slug: string;
  coverImage: {
    url: string;
  };
  description: string;
  githubLink: string;
  liveLink: string;
}

export interface PostCardData {
  id: number;
  title: string;
  slug: string;
  coverImage: {
    url: string;
  };
  content: string;
  publicationTime: Date;
  description: string;
}

export interface PostData extends PostCardData {}

export interface ProjectData {
  id: number;
  title: string;
  slug: string;
  coverImage: {
    url: string;
  };
  description: string;
  content: string;
  githubLink: string;
  liveLink: string;
}

export interface Slug {
  slug: string;
}

export interface Cursor {
  cursor: string;
}

export type LinksType = {
  id: number;
  title: string;
  route: string;
};
