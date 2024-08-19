"use strict";
exports.__esModule = true;
exports.CronParser = void 0;
var CronParser = /** @class */ (function () {
    function CronParser(cronExpression) {
        this.cronExpression = cronExpression;
    }
    CronParser.prototype.getMinutes = function () {
        var minuteField = this.cronExpression.split(' ')[0];
        return this.parseField(minuteField, 0, 59);
    };
    CronParser.prototype.getHours = function () {
        var hourField = this.cronExpression.split(' ')[1];
        return this.parseField(hourField, 0, 23);
    };
    CronParser.prototype.getDayOfMonth = function () {
        var dayOfMonthField = this.cronExpression.split(' ')[2];
        return this.parseField(dayOfMonthField, 1, 31);
    };
    CronParser.prototype.getMonth = function () {
        var monthField = this.cronExpression.split(' ')[3];
        return this.parseField(monthField, 1, 12);
    };
    CronParser.prototype.getDayOfWeek = function () {
        var dayOfWeekField = this.cronExpression.split(' ')[4];
        return this.parseField(dayOfWeekField, 0, 6);
    };
    CronParser.prototype.parseField = function (field, min, max) {
        var _this = this;
        var result = new Set();
        if (field === '*') {
            return Array.from({ length: max - min + 1 }, function (_, i) { return i + min; });
        }
        if (field.includes('/')) {
            var _a = field.split('/'), base = _a[0], interval = _a[1];
            var step = parseInt(interval, 10);
            if (base === '*') {
                for (var i = min; i <= max; i += step) {
                    result.add(i);
                }
            }
            else {
                var start = this.parseRangeOrSingle(base, min, max);
                for (var i = start; i <= max; i += step) {
                    result.add(i);
                }
            }
            return Array.from(result).filter(function (n) { return n >= min && n <= max; });
        }
        if (field.includes(',')) {
            var parts = field.split(',');
            parts.forEach(function (part) {
                if (part.includes('-')) {
                    _this.parseRange(part, min, max).forEach(function (num) { return result.add(num); });
                }
                else {
                    result.add(_this.parseRangeOrSingle(part, min, max));
                }
            });
            return Array.from(result).sort(function (a, b) { return a - b; });
        }
        if (field.includes('-')) {
            return this.parseRange(field, min, max);
        }
        return [this.parseRangeOrSingle(field, min, max)];
    };
    CronParser.prototype.parseRangeOrSingle = function (value, min, max) {
        var num = parseInt(value, 10);
        if (isNaN(num))
            return NaN;
        return Math.max(min, Math.min(max, num));
    };
    CronParser.prototype.parseRange = function (range, min, max) {
        var _this = this;
        var _a = range.split('-').map(function (value) { return _this.parseRangeOrSingle(value, min, max); }), start = _a[0], end = _a[1];
        if (isNaN(start) || isNaN(end) || start > end)
            return [];
        return Array.from({ length: end - start + 1 }, function (_, i) { return start + i; }).filter(function (n) { return n >= min && n <= max; });
    };
    CronParser.prototype.print = function () {
        var minutes = this.getMinutes().join(' ');
        var hours = this.getHours().join(' ');
        var dayOfMonth = this.getDayOfMonth().join(' ');
        var month = this.getMonth().join(' ');
        var dayOfWeek = this.getDayOfWeek().join(' ');
        var command = this.cronExpression.split(' ').slice(5).join(' ');
        return "minute ".concat(minutes, "\n") +
            "hour ".concat(hours, "\n") +
            "day of month ".concat(dayOfMonth, "\n") +
            "month ".concat(month, "\n") +
            "day of week ".concat(dayOfWeek, "\n") +
            "command ".concat(command);
    };
    return CronParser;
}());
exports.CronParser = CronParser;
