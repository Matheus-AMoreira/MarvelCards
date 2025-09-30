interface Series {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Url[];
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
  modified: string;
  thumbnail: Image;
  creators: CreatorList;
  characters: CharacterList;
  stories: StoryList;
  comics: ComicList;
  events: EventList;
  next: SeriesSummary;
  previous: SeriesSummary;
}