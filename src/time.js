(function() {
    "use strict";

    var KeePass = window.KeePass = window.KeePass || {};

    KeePass.Time = KeePass.Time || {};

    KeePass.Time.readTime = function (data, pos) {
        var bytes = struct.Unpack('<5B', data, pos),
            year, month, day, hour, minute, second;
        // Unpack 5 byte structure to date & time
        year = (bytes[0] << 6) | (bytes[1] >> 2);
        month = ((bytes[1] & 3) << 2) | (bytes[2] >> 6);
        day = (bytes[2] >> 1) & 0x1f;
        hour = ((bytes[2] & 1) << 4) | (bytes[3] >> 4);
        minute = ((bytes[3] & 0xf) << 2) | (bytes[4] >> 6);
        second = bytes[4] & 0x3f;

        return new Date(year, month, day, hour, minute, second);
    };

    KeePass.Time.serializeTime = function (date) {
        var year = date.getFullYear(),
            month = date.getMonth(),
    	day = date.getDay(),
    	hour = date.getHours(),
    	minute = date.getMinutes(),
    	second = date.getSeconds();

        return [
            (year >> 6) & 0x3f,
            ((year & 0x3f) << 2) | ((month >> 2) & 3),
            ((month & 3) << 6) | ((day & 0x1f) << 1) | ((hour >> 4) & 1),
            ((hour & 0xf) << 4) | ((minute >> 2) & 0xf),
            ((minute & 3) << 6) | (second & 0x3f)
        ];
    };

}());