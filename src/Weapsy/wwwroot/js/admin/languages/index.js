﻿weapsy.admin.languageIndex = weapsy.admin.languageIndex || {};

weapsy.admin.languageIndex = (function ($) {
    $("#languages").sortable({
        placeholder: "placeholder",
        handle: ".handle",
        stop: function (event, ui) {
            var languages = [];

            $("#languages").find('li').each(function () {
                var languageId = $(this).attr("id");
                languages.push(languageId);
            });

            $.ajax({
                url: "/api/language/reorder",
                type: "PUT",
                data: JSON.stringify(languages),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function () {
            });
        }
    });

    var languageIdToDelete;

    $('.delete-language').click(function () {
        languageIdToDelete = $(this).attr("data-id");
    });

    $('#confirmDelete').click(function () {
        $('#deletingPage').show();
        $.ajax({
            url: "/api/language/" + languageIdToDelete,
            type: "DELETE"
        }).done(function () {
            $('#deletingLanguage').hide();
            window.location.href = '/admin/language'; // to do: just remove row
        }).fail(function () {
            $('#deletingLanguage').hide();
        });
    });
}(jQuery));