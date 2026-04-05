export type LinkedInPostEntry = {
  urn: string;
  category: "technical" | "cultural" | "achievements";
};

export const LINKEDIN_POSTS: LinkedInPostEntry[] = [
  // Technical Posts
  {
    urn: "urn:li:share:7321533753795792896",
    category: "technical",
  },
  {
    urn: "urn:li:share:7321542751529963522",
    category: "technical",
  },
  {
    urn: "urn:li:share:7321544094944542721",
    category: "technical",
  },
  {
    urn: "urn:li:share:7346446836670353409",
    category: "technical",
  },
  // Cultural Posts
  {
    urn: "urn:li:share:7108765767520718848",
    category: "cultural",
  },
  {
    urn: "urn:li:share:7215204970718015488",
    category: "cultural",
  },
  {
    urn: "urn:li:share:7346475787040014338",
    category: "cultural",
  },
  {
    urn: "urn:li:share:7347656369916780544",
    category: "cultural",
  },
  // Achievement Posts
  {
    urn: "urn:li:share:7346176279852797953",
    category: "achievements",
  },
  {
    urn: "urn:li:share:7346574361987883008",
    category: "achievements",
  },
  {
    urn: "urn:li:share:7331904944859480064",
    category: "achievements",
  },
  {
    urn: "urn:li:share:7321542751529963522",
    category: "achievements",
  },
  {
    urn: "urn:li:share:7152540167440867328",
    category: "achievements",
  },
];
