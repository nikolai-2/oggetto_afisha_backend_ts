export class SearchRequest {
  /**
   * Any string - search query
   * Ignored query less 3 symbols (without spaces)
   *
   * @example "Твою дочку ебут"
   */
  query: string;

  /**
   * Sorting params (optional param)
   * Default - popularity
   *
   * @example "popularity"
   */
  sort?: 'popularity';
}
