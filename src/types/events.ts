interface Event {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Url[];
  modified: string;
  start: string;
  end: string;
  thumbnail: Image;
  creators: CreatorList;
  characters: CharacterList;
  stories: StoryList;
  comics: ComicList;
  series: SeriesList;
  next: EventSummary;
  previous: EventSummary;
}