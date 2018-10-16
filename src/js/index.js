/*
 * @Author: 黄彦松 
 * @Date: 2018-10-15 09:26:04 
 * @Last Modified by: 黄彦松
 * @Last Modified time: 2018-10-15 09:31:50
 */

require(['jquery', 'handlebars', 'bscroll'], function($, handlebars, bscroll) {
    $.ajax({
        url: '/api/data',
        dataType: 'json',
        success: function(res) {
            var tpl = $('#tpl').html();
            var template = handlebars.compile(tpl);
            var html = template(res);
            $('.main ul').html(html);
        }
    })

    $('.tz').on('click', function() {
        location.href = '../view/nr.html';
    })
})