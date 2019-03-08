$(document).ready(function () {
    const encode_text = $('#encode_text');
    const decode_text = $('#decode_text');
    $('#encode').on('click', function () {
        $.post('http://localhost:3000/encrypt', {'text' : encode_text.val()}).done(function (response) {
            decode_text.val(response.msg);
        });
    });
    $('#decode').on('click', function () {
        $.post('http://localhost:3000/decrypt', {'text' : decode_text.val()}).done(function (response) {
            encode_text.val(response.msg);
        });
    });
});