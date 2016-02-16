var ad_link = "http://contentvideo." + domain_name + ".com/iframe_video/ad.php?output=json&pr_id=" + publisher_id;
var vast_link = '';
$.getJSON(ad_link, function(data) {
    vast_link = data.vast;
    pub_name = data.pub_name;
});

var data_link_pr = "http://contentvideo." + domain_name + ".com/iframe_video/video.php?output=json&pr_id=" + publisher_id;

$.getJSON(data_link_pr, function(data_pr) {

    var data_link = "http://contentvideo." + domain_name + ".com/iframe_video/video.php?output=json&pl_id=" + data_pr.playlist_id;

    $.getJSON(data_link, function(data) {
        var playlist = [];

        $.each(data, function(key, val) {
            var obj = {};
            // my object
            obj = {
                vid : val.vid,
                src : val.html5_url
            };
            playlist.push(obj);

        });

        window.player = null;

        var index = 0;
        var trackCount = playlist.length;
        //vjs.vad.vpaidFlashswf = '../dist/VPAIDFlash.swf';
        // Personal way of setting html5 or flash, NOT REQUIRED
        techOptions = ["html5", "flash"];
        var ad_configuration = {
            techOrder : techOptions,
            pre_roll : [{
                //vadSWF: '../dist/videojs-vad.swf',
                vadTimeout : -1,
                vadOnTimeInterval : 1000,
                vadGVolume : 0.5,
                //debug: vadFlashDebug,
                techs : ['flash'],
                type : 'adaptv',
                adaptv : {
                    // consult API Reference for more detailed information and character limits for key-values.
                    // -- Required parameters --
                    // parameters about the player clip view
                    key : 'veremediainc', // Your publisher key provided by Adap.tv.
                    // -- Optional parameters --
                    // parameters about the player clip
                    id : '', // The unique identifier of the clip (limit 64 chars)
                    title : '', // The title of the clip
                    duration : '', // The duration of clip in _seconds_, if applicable
                    url : 'http://www.techtimes.com/test/newplayer2.htm', // A valid HTTP or RMTP URL for the clip (often .flv) file.
                    description : '', // description of clip
                    keywords : '', // A comma-delimited list of tags/keywords
                    categories : '', // A comma-delimited list of top level categories
                    videoPlayerId : 'player', // The id attribute of the div that contains the player
                    zid : '', // Name of the zone for this view. Optional.
                    companionId : 'adaptvcompanion', // The id attribute of the div to contain the companion ad
                    pageUrlOv : 'http://www.techtimes.com/test/newplayer2.htm', // page URL override
                    context : {
                        pub_name : pub_name
                    }
                }
            }
            // {
            // vadTimeout : -1,
            // vadOnTimeInterval : 1000,
            // vadGVolume : 0.5,
            // techs : ['html5'],
            // type : 'vast',
            // vast : {
            // url : vast_link
            // }
            // }
            ],

        };

        player_playlist = function(index, player_intern) {

            player_intern.vjsVAD(ad_configuration);
            console.log('video ad init');
            // Dynamically add video source and poster (personal preference, not required)
            player_intern.src({
                src : playlist[index].src,
                type : "video/mp4"
            });
            player_intern.play();

        };

        window.player = videojs("video-playlist", {
            techOrder : techOptions,
            controls : true,
            autoplay : false,
        }, function() {
            this.volume(0.1);
            player_playlist(0, this);
        });

        var error_time = 1;
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        eventer(messageEvent, function(e) {

            var key = e.message ? "message" : "data";
            var data = e[key];
            if (data['key'] == "bsvideos_article_list") {
                error_time = 1;
                window.player.cancelAd();
                player_playlist(data["value"], window.player);
            }

        }, false);

        window.player.on("ended", function() {
            //console.log('on ended');
            index++;
            if (index >= trackCount) {
                //console.log('go to beginning');
                index = 0;
            }
            error_time = 1;
            window.player.cancelAd();
            parent.postMessage({
                value : playlist[index].vid,
                key : "play_next"
            }, "*");
            player_playlist(index, window.player);

        });

        window.player.on("pause", function(event) {
            console.log("[VJS] video pause");
        });

        window.player.on("loadstart", function(event) {
            console.log("[VJS] video loadstart");
        });

        window.player.on("vad_AdLoaded", function(event) {
            console.log("[VJS] ad loaded");
            player.pause();
            player.controlBar.el().style.display = 'none';
        });

        // Start ups
        window.player.on("vad_AdStarted", function(event) {
            console.log("[VJS] ad started");
        });

        // Interactions
        window.player.on("vad_AdClickThru", function(event) {
            console.log("[VJS] ad clickthru");
        });

        // On time
        window.player.on("vad_AdOnTime", function(event) {
            //  console.log("[VJS] ad on time: AdRemainingTime = "+event.data[0]+" | AdDuration"+event.data[1]);
        });

        // Errors

        window.player.on("vad_error", function(event) {
            console.log("[VJS] ad error");
            console.log(event.data.err);
            if (error_time == 1) {
                player_playlist(index, window.player);
                error_time++;
            }
            window.player.controlBar.el().style.display = 'block';

        });

        // Ad Duration
        window.player.on("vad_AdVideoFirstQuartile", function(event) {
            console.log("[VJS] ad first quarter");
        });

        window.player.on("vad_AdVideoMidpoint", function(event) {
            console.log("[VJS] ad midpoint");
        });

        window.player.on("vad_AdVideoThirdQuartile", function(event) {
            console.log("[VJS] ad third quarter");
        });

        window.player.on("vad_AdComplete", function(event) {
            console.log("[VJS] ad complete");
            window.player.play();
            window.player.controlBar.el().style.display = 'block';

        });

        // Ad Playback
        window.player.on("vad_AdPlaying", function(event) {
            console.log("[VJS] ad playing");
        });

        window.player.on("vad_AdPaused", function(event) {
            console.log("[VJS] ad paused");
        });

    });
});

// on ended