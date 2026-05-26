export const ROUTES = {
  home: "/",
  events: "/events/",
  event: (slug: string) => `/events/${slug}/`,
  portraits: "/portraits/",
  nightlife: "/nightlife/",
  about: "/about/",
  admin: "/admin/"
} as const;
