interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Image;
  resourceURI: string;
  comics: ComicList;
  series: SeriesList;
  stories: StoryList;
  events: EventList;
  urls: Url[];
}

interface ComicList {
  available: number;
  collectionURI: string;
  items: ComicSummary[];
  returned: number;
}

interface ComicSummary {
  resourceURI: string;
  name: string;
}

interface SeriesList {
    available: number;
    collectionURI: string;
    items: SeriesSummary[];
    returned: number;
}

interface SeriesSummary {
    resourceURI: string;
    name: string;
}

interface StoryList {
    available: number;
    collectionURI: string;
    items: StorySummary[];
    returned: number;
}

interface StorySummary {
    resourceURI: string;
    name: string;
    type: string;
}

interface EventList {
    available: number;
    collectionURI: string;
    items: EventSummary[];
    returned: number;
}

interface EventSummary {
    resourceURI: string;
    name: string;
}