interface ApiResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: DataContainer<T>;
}

interface DataContainer<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Character[] | Comic[] | Creator[] | Event[] | Series[] | Story[];
}
