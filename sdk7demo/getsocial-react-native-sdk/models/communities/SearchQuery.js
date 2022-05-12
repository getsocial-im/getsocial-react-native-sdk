/* eslint-disable max-len */
// @flow
import CommunitiesEntityType from './CommunitiesEntityType';

/**
 * SearchQuery object.
 */
export default class SearchQuery {
  searchTerm: ?string;
  entities: Array<CommunitiesEntityType> = [];
  properties: {[key: string] : string} = {};
  labels: Array<string> = [];

  // eslint-disable-next-line require-jsdoc
  constructor(searchTerm: string) {
      this.searchTerm = searchTerm;
  }

  /**
   * Get all entities.
   *
   * @return {SearchQuery} A new query.
   */
  static all(): SearchQuery {
      return new SearchQuery();
  }

  /**
   * Find entities.
   *
   * @param {string} searchTerm String to search.
   * @return {SearchQuery} A new query.
   */
  static find(searchTerm: string): SearchQuery {
      return new SearchQuery(searchTerm);
  }

  /**
   * Get only trending entities.
   *
   * @param {[CommunitiesEntityType]} entities List of entities to search.
   * @return {SearchQuery} Same query.
   */
  inEntities(entities:CommunitiesEntityType[]): SearchQuery {
      this.entities = entities;
      return this;
  }

  /**
   * Get entities with the specified properties.
   *
   * @param {Object<string, string>} properties Properties.
   * @return {SearchQuery} same query.
   */
  withProperties(properties: {[key: string] : string}): SearchQuery {
      this.properties = properties;
      return this;
  }

  /**
   * Get entities with the specified labels.
   *
   * @param {[string]} labels Labels list.
   * @return {SearchQuery} same query.
   */
  withLabels(labels: string[]): SearchQuery {
      this.labels = labels;
      return this;
  }

  /**
  * Generates JSON string.
  * @return {string} object as json.
  */
  toJSON() {
      return {entities: this.entities ?? null, labels: this.labels ?? null, properties: this.properties ?? null, searchTerm: this.searchTerm ?? null};
  }
}
