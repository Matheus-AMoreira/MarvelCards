interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: SeriesSummary;
  variants: ComicSummary[];
  collections: ComicSummary[];
  collectedIssues: ComicSummary[];
  dates: ComicDate[];
  prices: ComicPrice[];
  thumbnail: Image;
  images: Image[];
  creators: CreatorList;
  characters: CharacterList;
  stories: StoryList;
  events: EventList;
}

interface ComicDate {
  type: string;
  date: string;
}

interface ComicPrice {
  type: string;
  price: number;
}

interface CreatorList {
    available: number;
    collectionURI: string;
    items: CreatorSummary[];
    returned: number;
}

interface CreatorSummary {
    resourceURI: string;
    name: string;
    role: string;
}

interface CharacterList {
    available: number;
    collectionURI: string;
    items: CharacterSummary[];
    returned: number;
}

interface CharacterSummary {
    resourceURI: string;
    name: string;
}