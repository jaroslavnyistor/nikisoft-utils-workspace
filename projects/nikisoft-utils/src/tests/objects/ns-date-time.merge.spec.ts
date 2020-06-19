import { NsDateTime } from '../../lib/objects/ns-date-time';
import { NsDateTimeMerge } from "../../lib/objects/ns-date-time.merge";

describe('NsDateTime - Merge functionality', () => {
  const dateString = '2020-06-18';
  const timeString = '14:00:00.000';
  const dateTimeString = `${dateString}T${timeString}+02:00`;

  const fallbackDateString = '2020-06-18';
  const fallbackTimeString = '10:00:00.000';

  it('should merge date and time with fallback values', function () {
    const expectedDateString = '2020-06-19';
    const expectedTimeString = '13:30:32.562';
    const expected = NsDateTime.from(`${expectedDateString}T${expectedTimeString}+02:00`);

    const actual = NsDateTimeMerge.mergeDateTime(dateTimeString, expectedDateString, expectedTimeString, fallbackDateString, fallbackTimeString);

    expect(actual.isSame(expected)).toBe(true);
  });

  it('should merge date and time from fallback values', function () {
    const expected = NsDateTime.from(`${fallbackDateString}T${fallbackTimeString}+02:00`);

    const actual = NsDateTimeMerge.mergeDateTime(dateTimeString, null, null, fallbackDateString, fallbackTimeString);

    expect(actual.isSame(expected)).toBe(true);
  });

  it('should merge date and time from date only', function () {
    const dateString = '2020-06-19';
    const expected = NsDateTime.from(`${dateString}T${fallbackTimeString}+02:00`);

    const actual = NsDateTimeMerge.mergeDate(dateTimeString, dateString, fallbackDateString);

    expect(actual.isSame(expected)).toBe(true);
  });

  it('should merge date and time from time only', function () {
    const timeString = '15:13';
    const expected = NsDateTime.from(`${fallbackDateString}T${timeString}+02:00`);

    const actual = NsDateTimeMerge.mergeTime(dateTimeString, timeString, fallbackTimeString);

    expect(actual.isSame(expected)).toBe(true);
  });
});
