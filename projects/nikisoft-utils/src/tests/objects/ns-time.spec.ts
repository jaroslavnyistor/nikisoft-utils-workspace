import { NsTime } from '../../lib/objects/ns-time';

describe('NsTime', () => {
  it('should parse correctly when input contains all informationt', function () {
    const timeString = '01:02:03.999';
    const time = NsTime.parse(timeString);

    expect(time.hour).toBe(1);
    expect(time.minute).toBe(2);
    expect(time.seconds).toBe(3);
    expect(time.milliseconds).toBe(999);
  });

  it('should parse correctly when milliseconds is missing', function () {
    const timeString = '01:02:03';
    const time = NsTime.parse(timeString);

    expect(time.hour).toBe(1);
    expect(time.minute).toBe(2);
    expect(time.seconds).toBe(3);
    expect(time.milliseconds).toBe(0);
  });

  it('should parse correctly when hours and minutes are present', function () {
    const timeString = '01:02';
    const time = NsTime.parse(timeString);

    expect(time.hour).toBe(1);
    expect(time.minute).toBe(2);
    expect(time.seconds).toBe(0);
    expect(time.milliseconds).toBe(0);
  });

  it('should parse correctly when hour is present only', function () {
    const timeString = '01';
    const time = NsTime.parse(timeString);

    expect(time.hour).toBe(1);
    expect(time.minute).toBe(0);
    expect(time.seconds).toBe(0);
    expect(time.milliseconds).toBe(0);
  });

  it('should parse correctly when input string is empty', function () {
    const timeString = '';
    const time = NsTime.parse(timeString);

    expect(time).toBe(null);
  });

  it('should parse correctly when input is null', function () {
    const timeString = null;
    const time = NsTime.parse(timeString);

    expect(time).toBe(null);
  });
});
