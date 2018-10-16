/*
 * @Author: 黄彦松 
 * @Date: 2018-10-15 09:26:04 
 * @Last Modified by: 黄彦松
 * @Last Modified time: 2018-10-15 10:02:46
 */

require(['jquery', 'handlebars', 'bscroll'], function($, handlebars, bscroll) {
    $('.fh').on('click', function() {
        location.href = '../index.html';
    })
    $('.fs').on('click', function() {
        var bt = $('#h2').val();
        var nr = $('#p').val();
        $.ajax({
            url: '/api/tj',
            data: {
                "h2": bt,
                "p": nr
            },
            dataType: 'json',
            type: 'post',
            success: function(res) {
                if (res.code == 1) {
                    location.href = '../index.html';
                }
            }
        })
    })

})