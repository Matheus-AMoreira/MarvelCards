interface Story {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: string;
  thumbnail: Image | null; // Pode ser nulo
  creators: CreatorList;
  characters: CharacterList;
  series: SeriesList;
  comics: ComicList;
  events: EventList;
  originalIssue: ComicSummary;
}