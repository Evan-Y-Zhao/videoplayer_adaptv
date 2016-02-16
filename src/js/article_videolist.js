var x = document.getElementById("article_videolist_in_article");

current_iframe = document.createElement('iframe');
current_iframe.setAttribute("id", "article_videolist_iframe_id");
current_iframe.setAttribute("class", "article_videolist_iframe_video");
current_iframe.setAttribute("frameBorder", "0");
current_iframe.setAttribute("width", "100%");
current_iframe.setAttribute("background", "transparent");
current_iframe.setAttribute("allowfullscreen", "true");
current_iframe.setAttribute("webkitallowfullscreen", "true");
current_iframe.setAttribute("mozallowfullscreen", "true");
current_iframe.setAttribute("scrolling", "no");
current_iframe.setAttribute("src", "http://tv.bsvideos.com/html/0.0.3/article_videolist_player.html?domain_name="+domain_name+"&pub_id="+publisher_id);
//current_iframe.setAttribute("src", "test1.html?domain_name="+domain_name+"&pub_id="+publisher_id);

x.appendChild(current_iframe);


var w = $("#article_videolist_in_article").width();

var h = w * 9 / 16;

$('.article_videolist_iframe_video').css({
    width : w,
    height : h
});

var image_w = 140;
var image_h = 79;

var data_link_pr = "http://contentvideo." + domain_name + ".com/iframe_video/video.php?output=json&pr_id=" + publisher_id;

$.getJSON(data_link_pr, function(data_pr) {

    var data_link = "http://contentvideo." + domain_name + ".com/iframe_video/video.php?output=json&pl_id=" + data_pr.playlist_id;

    $.getJSON(data_link, function(data) {

        var items = "";
        var i = 0;
        $.each(data, function(key, val) {
            var image = val.image;
            if (i == 0) {
                var player_on_class = "on";
                var icon_on_class = "off";
            } else {
                var player_on_class = "off";
                var icon_on_class = "on";
            }
            i++;
            items += "<li class='slide'><a class='vjs-track' id='vjs_" + val.vid + "' href='' data-index='" + key + "'><div class='articlevideolist_cimage'><img src='" + image + "?h=" + image_h + "&w=" + image_w + "'><div class='player_on " + player_on_class + "'>Now Playing</div><div class='media__icon " + icon_on_class + "' >" + val.length + "</div></div><h2 class='title_player'>" + val.title + "'</h2></a></li>";
            return;
        });

        $('.slider1').html(items);

        slider = $('.slider1').bxSlider({
            slideWidth : 140,
            minSlides : 2,
            maxSlides : 5,
            slideMargin : 10
        });
        
        
        
        var top = document.getElementById('article_videolist_in_article').offsetTop + 900;
        window.addEventListener("scroll", function() {

            if (document.body.scrollTop == 0) {
                var value = document.documentElement.scrollTop;
            } else {
                var value = document.body.scrollTop;
            }

            if (value >= top) {

                var w = $("." + sidebar_classname).width();
                var h = w * 9 / 16;

                $(".article_videolist_iframe_video").css("width", w);
                $(".article_videolist_iframe_video").css("height", h);

                $('#article_videolist_in_article').css("left", $("." + sidebar_classname).offset().left);
                $('#article_videolist_in_article').addClass("testing_css");
            } else if (value < top) {

                var w = $("." + main_classname).width();

                var h = w * 9 / 16;
                $(".article_videolist_iframe_video").css("width", w);
                $(".article_videolist_iframe_video").css("height", h);

                if ($('#article_videolist_in_article').hasClass("testing_css")) {
                    $('#article_videolist_in_article').removeClass("testing_css");
                }
            }
        });

        var tracks = $(".slider1 .vjs-track"), trackCount = tracks.length;

        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        eventer(messageEvent, function(e) {

            var key = e.message ? "message" : "data";
            var data = e[key];
            if (data['key'] == "play_next") {

                id = "vjs_" + data['value'];

                $(".player_on").removeClass("on");
                $(".player_on").addClass("off");
                $(".media__icon").removeClass("off");
                $(".media__icon").addClass("on");

                $('#' + id + ' .player_on').removeClass("off");
                $('#' + id + ' .player_on').addClass("on");
                $('#' + id + ' .media__icon').removeClass("on");
                $('#' + id + ' .media__icon').addClass("off");
            }

        }, false);

        $.each(tracks, function(i, v) {

            $(this).on("click", function() {
                $(".player_on").removeClass("on");
                $(".player_on").addClass("off");
                $(".media__icon").removeClass("off");
                $(".media__icon").addClass("on");
                
                id = $(this).attr("id");
                $('#' + id + ' .player_on').removeClass("off");
                $('#' + id + ' .player_on').addClass("on");
                $('#' + id + ' .media__icon').removeClass("on");
                $('#' + id + ' .media__icon').addClass("off");

                var iframe = document.getElementById('article_videolist_iframe_id');
                var iframewindow = iframe.contentWindow ? iframe.contentWindow : iframe.contentDocument.defaultView;

                index = parseInt($(this).attr('data-index')) || index;
                iframewindow.postMessage({
                    value : index,
                    key : "bsvideos_article_list"
                }, '*');

                return false;
            });

        });

    });
});

