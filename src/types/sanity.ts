export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
};

export type LocalizedString = { fr: string; en: string };
export type LocalizedText = { fr: string; en: string };

export type TeamMember = {
  _id: string;
  name: string;
  role: LocalizedString;
  photo?: SanityImage;
  bio?: LocalizedText;
  linkedin?: string;
  order: number;
};

export type Event = {
  _id: string;
  title: LocalizedString;
  slug: { current: string };
  date: string;
  category: "conference" | "formation" | "networking" | "autre";
  description: LocalizedText;
  image?: SanityImage;
  registerUrl?: string;
};

export type Partner = {
  _id: string;
  name: string;
  logo: SanityImage;
  tier: "gold" | "silver" | "bronze";
  url?: string;
  description?: LocalizedText;
};
