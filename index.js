"use strict";
exports.__esModule = true;
var CronParser_1 = require("./src/CronParser");
function formatField(name, values) {
    var formattedValues = values.join(' ');
    return name.padEnd(14) + formattedValues;
}
function main() {
    if (process.argv.length < 3) {
        console.error('Usage: node cron-format.js "cron-expression"');
        process.exit(1);
    }
    var cronExpression = process.argv[2];
    try {
        var cronParser = new CronParser_1.CronParser(cronExpression);
        console.log(formatField('minute', cronParser.getMinutes()));
        console.log(formatField('hour', cronParser.getHours()));
        console.log(formatField('day of month', cronParser.getDayOfMonth()));
        console.log(formatField('month', cronParser.getMonth()));
        console.log(formatField('day of week', cronParser.getDayOfWeek()));
        console.log('command', cronExpression.split(' ').slice(-1)[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error parsing cron expression:', error.message);
        }
        else {
            console.error('An unknown error occurred');
        }
        process.exit(1);
    }
}
main();
