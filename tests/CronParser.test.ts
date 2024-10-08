import { CronParser } from "../src/CronParser";


describe('CronParser', () => {
    describe('getMinutes', () => {
        it('should parse the minute field correctly when the interval is 15', () => {
          const cronParser = new CronParser('*/15 * * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([0, 15, 30, 45]);
        });
      
        it('should parse the minute field correctly when specific values are given', () => {
          const cronParser = new CronParser('5,10,15,20 * * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([5, 10, 15, 20]);
        });
      
        it('should parse the minute field correctly when a single value is given', () => {
          const cronParser = new CronParser('30 * * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([30]);
        });
      
        it('should parse the minute field correctly when using the "every" operator', () => {
          const cronParser = new CronParser('*/5 * * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
        });
      
        it('should parse the minute field correctly when using a range', () => {
          const cronParser = new CronParser('10-20 * * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        });
      
        it('should parse the minute field correctly when using mixed specifications', () => {
          const cronParser = new CronParser('0,15,30,45 8-17 * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([0, 15, 30, 45]);
        });
      
        it('should handle the minute field when using the "every" operator with a different interval', () => {
          const cronParser = new CronParser('*/2 * * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58]);
        });
      
        it('should handle complex minute fields with ranges and specific values', () => {
          const cronParser = new CronParser('0,10-15,20 5 * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([0, 10, 11, 12, 13, 14, 15, 20]);
        });
      
        it('should handle minute fields with wildcards', () => {
          const cronParser = new CronParser('* * * * * /usr/bin/find');
          expect(cronParser.getMinutes()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
        });
      
      });


      describe('getHours', () => {
        it('should parse the hour field correctly when the interval is 3', () => {
            const cronParser = new CronParser('0 */3 * * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([0, 3, 6, 9, 12, 15, 18, 21]);
        });

        it('should parse the hour field correctly when specific values are given', () => {
            const cronParser = new CronParser('0 1,5,9,13 * * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([1, 5, 9, 13]);
        });

        it('should parse the hour field correctly when a single value is given', () => {
            const cronParser = new CronParser('0 14 * * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([14]);
        });

        it('should parse the hour field correctly when using the "every" operator', () => {
            const cronParser = new CronParser('0 0-23 * * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
        });

        it('should parse the hour field correctly when using a range', () => {
            const cronParser = new CronParser('0 9-17 * * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
        });

        it('should parse the hour field correctly when using mixed specifications', () => {
            const cronParser = new CronParser('0 1,5,9 10-15 * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([1, 5, 9]);
        });

        it('should handle the hour field when using the "every" operator with a different interval', () => {
            const cronParser = new CronParser('0 0-23/2 * * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
        });

        it('should handle complex hour fields with ranges and specific values', () => {
            const cronParser = new CronParser('0 0,6-9,12 2 * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([0, 6, 7, 8, 9, 12]);
        });

        it('should handle hour fields with wildcards', () => {
            const cronParser = new CronParser('0 * * * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
        });

        it('should handle a cron expression with a single day of the week and specific hours', () => {
            const cronParser = new CronParser('0 8,12,16 * * 1 /usr/bin/find');
            expect(cronParser.getHours()).toEqual([8, 12, 16]);
        });

        it('should handle a cron expression with an interval and specific hours', () => {
            const cronParser = new CronParser('0 0,6,12,18 * * * /usr/bin/find');
            expect(cronParser.getHours()).toEqual([0, 6, 12, 18]);
        });
    });


    describe('getDayOfMonth', () => {
        it('should parse the day of the month field correctly when the interval is 10', () => {
          const cronParser = new CronParser('0 0 */10 * * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([1, 11, 21, 31]);
        });
    
        it('should parse the day of the month field correctly when specific values are given', () => {
          const cronParser = new CronParser('0 0 1,15,30 * * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([1, 15, 30]);
        });
    
        it('should parse the day of the month field correctly when a single value is given', () => {
          const cronParser = new CronParser('0 0 15 * * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([15]);
        });
    
        it('should parse the day of the month field correctly when using the "every" operator', () => {
          const cronParser = new CronParser('0 0 1-15 * * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        });
    
        it('should parse the day of the month field correctly when using a range', () => {
          const cronParser = new CronParser('0 0 5-10 * * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([5, 6, 7, 8, 9, 10]);
        });
    
        it('should parse the day of the month field correctly when using mixed specifications', () => {
          const cronParser = new CronParser('0 0 1,10-15,20 * * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([1, 10, 11, 12, 13, 14, 15, 20]);
        });
    
        it('should handle complex day of the month fields with ranges and specific values', () => {
          const cronParser = new CronParser('0 0 1,5-10,15 5 * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([1, 5, 6, 7, 8, 9, 10, 15]);
        });
    
        it('should handle day of the month fields with wildcards', () => {
          const cronParser = new CronParser('0 0 * * * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        });
    
        it('should handle a cron expression with specific days and months', () => {
          const cronParser = new CronParser('0 0 1,15 * 1 /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([1, 15]);
        });
    
        it('should handle a cron expression with an interval and specific days', () => {
          const cronParser = new CronParser('0 0 1,10,20 * * /usr/bin/find');
          expect(cronParser.getDayOfMonth()).toEqual([1, 10, 20]);
        });
      });


      describe('getMonth', () => {
        it('should parse the month field correctly when the interval is 3', () => {
            const cronParser = new CronParser('0 0 1 */3 * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([1, 4, 7, 10]);
        });

        it('should parse the month field correctly when specific values are given', () => {
            const cronParser = new CronParser('0 0 1 2,5,8,11 * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([2, 5, 8, 11]);
        });

        it('should parse the month field correctly when a single value is given', () => {
            const cronParser = new CronParser('0 0 1 6 * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([6]);
        });

        it('should parse the month field correctly when using the "every" operator', () => {
            const cronParser = new CronParser('0 0 1 1-12 * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        });

        it('should parse the month field correctly when using a range', () => {
            const cronParser = new CronParser('0 0 1 3-6 * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([3, 4, 5, 6]);
        });

        it('should parse the month field correctly when using mixed specifications', () => {
            const cronParser = new CronParser('0 0 1 2,5-8,11 * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([2, 5, 6, 7, 8, 11]);
        });

        it('should handle complex month fields with ranges and specific values', () => {
            const cronParser = new CronParser('0 0 1 1,3-6,9 5 * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([1, 3, 4, 5, 6, 9]);
        });

        it('should handle month fields with wildcards', () => {
            const cronParser = new CronParser('0 0 1 * * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        });

        it('should handle a cron expression with specific months and days of the week', () => {
            const cronParser = new CronParser('0 0 1 1,6 * 0 /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([1, 6]);
        });

        it('should handle a cron expression with an interval and specific months', () => {
            const cronParser = new CronParser('0 0 1 2,5,8 * /usr/bin/find');
            expect(cronParser.getMonth()).toEqual([2, 5, 8]);
        });
    });


    describe('getDayOfWeek', () => {
        it('should parse the day of the week field correctly when specific values are given', () => {
            const cronParser = new CronParser('0 0 * * 1,3,5 /usr/bin/find');
            expect(cronParser.getDayOfWeek()).toEqual([1, 3, 5]); // Monday, Wednesday, Friday
        });

        it('should parse the day of the week field correctly when using the "every" operator', () => {
            const cronParser = new CronParser('0 0 * * */2 /usr/bin/find');
            expect(cronParser.getDayOfWeek()).toEqual([0, 2, 4, 6]); // Sunday, Tuesday, Thursday, Saturday
        });

        it('should parse the day of the week field correctly when a single value is given', () => {
            const cronParser = new CronParser('0 0 * * 1 /usr/bin/find');
            expect(cronParser.getDayOfWeek()).toEqual([1]); // Monday
        });

        it('should parse the day of the week field correctly when using a range', () => {
            const cronParser = new CronParser('0 0 * * 1-5 /usr/bin/find');
            expect(cronParser.getDayOfWeek()).toEqual([1, 2, 3, 4, 5]); // Monday to Friday
        });

        it('should parse the day of the week field correctly when using mixed specifications', () => {
            const cronParser = new CronParser('0 0 * * 1,3-5 /usr/bin/find');
            expect(cronParser.getDayOfWeek()).toEqual([1, 3, 4, 5]); // Monday, Wednesday, Thursday, Friday
        });

        it('should handle complex day of the week fields with ranges and specific values', () => {
            const cronParser = new CronParser('0 0 * * 0,2-4,6 /usr/bin/find');
            expect(cronParser.getDayOfWeek()).toEqual([0, 2, 3, 4, 6]); // Sunday, Tuesday, Wednesday, Thursday, Saturday
        });

        it('should handle day of the week fields with wildcards', () => {
            const cronParser = new CronParser('0 0 * * * /usr/bin/find');
            expect(cronParser.getDayOfWeek()).toEqual([0, 1, 2, 3, 4, 5, 6]); // Every day of the week
        });

        it('should handle a cron expression with an interval and specific days', () => {
            const cronParser = new CronParser('0 0 * * 1,5 /usr/bin/find');
            expect(cronParser.getDayOfWeek()).toEqual([1, 5]); // Monday and Friday
        });
    });


    describe('print', () => {
        it('should correctly format output for "*/15 0 1,15 * 1-5 /usr/bin/find"', () => {
            const cronParser = new CronParser('*/15 0 1,15 * 1-5 /usr/bin/find');
            expect(cronParser.print()).toEqual(
                'minute 0 15 30 45\n' +
                'hour 0\n' +
                'day of month 1 15\n' +
                'month 1 2 3 4 5 6 7 8 9 10 11 12\n' +
                'day of week 1 2 3 4 5\n' +
                'command /usr/bin/find'
            );
        });


        it('should handle "0 */2 1-5 1,6 1-5 /usr/bin/find"', () => {
            const cronParser = new CronParser('0 */2 1-5 1,6 1-5 /usr/bin/find');
            expect(cronParser.print()).toEqual(
                'minute 0\n' +
                'hour 0 2 4 6 8 10 12 14 16 18 20 22\n' +
                'day of month 1 2 3 4 5\n' +
                'month 1 6\n' +
                'day of week 1 2 3 4 5\n' +
                'command /usr/bin/find'
            );
        });

        it('should handle "15 0 1-5 2,8 0,6 /usr/bin/find"', () => {
            const cronParser = new CronParser('15 0 1-5 2,8 0,6 /usr/bin/find');
            expect(cronParser.print()).toEqual(
                'minute 15\n' +
                'hour 0\n' +
                'day of month 1 2 3 4 5\n' +
                'month 2 8\n' +
                'day of week 0 6\n' +
                'command /usr/bin/find'
            );
        });
    });
      
});