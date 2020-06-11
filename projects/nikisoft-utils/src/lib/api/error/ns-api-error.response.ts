/**
 * Defines contract for response from API call.
 */
export interface NsApiErrorResponse {
  /**
   * API error code
   */
  code: number;

  /**
   * API error sub-codes.
   */
  subCodes: number[];
}
