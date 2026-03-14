import { groq } from "next-sanity";

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    photo,
    bio,
    linkedin,
    order
  }
`;

export const eventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    category,
    description,
    image,
    registerUrl
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    category,
    description,
    image,
    registerUrl
  }
`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(tier asc, name asc) {
    _id,
    name,
    logo,
    tier,
    url,
    description
  }
`;
