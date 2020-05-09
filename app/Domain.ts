export type SideQuest = {
  index: number;
  title: string;
  checked: boolean;
  chapter: number;
  link: string;
};

export type DiscoveryQuest = {
  index: number;
  title: string;
  checked: boolean;
  chapter: number;
  link: string;
};

export interface Quest {
  index: number;
  title: string;
  checked: boolean;
  chapter: number;
  link: string;
}

export type Weapon = {
  index: number;
  name: string;
  character: string;
  chapter: number;
  location: string;
  link: string;
  checked: boolean;
};

export type Stats = {
  total: number;
  checked: number;
};

export interface CollectionToStats {
  [Key: string]: Stats;
}
