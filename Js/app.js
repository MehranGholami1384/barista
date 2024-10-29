$(document).ready(function () {
    String.prototype.toPersianDigit = function () {
        var find = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var replace = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        var replaceString = this;
        var regex;
        for (var i = 0; i < find.length; i++) {
            regex = new RegExp(find[i], "g");
            replaceString = replaceString.replace(regex, replace[i]);
        }
        return replaceString;
    };

    function convertAllDigitsToPersian() {
        $("*:not(script):not(style)").each(function() {
            if ($(this).children().length === 0) {
                $(this).text($(this).text().toPersianDigit());
            }
        });

        $("input").each(function() {
            $(this).val($(this).val().toPersianDigit());
        });
    }

    convertAllDigitsToPersian()
});