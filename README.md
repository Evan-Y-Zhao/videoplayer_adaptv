## videojs-adaptv
The videojs-adaptv plugin is to integrate the adaptv's api with videojs.

## Getting Started
In addition to the video.js library, you'll need two files from this project: videolist_script.js and article_videolist.css. Both are in the src/ directory

## Single Preroll Example
Here's an outline of what a basic ad integration might look like. It only plays a single preroll ad before each content video, but does demonstrate the interaction points offered by the plugin.

	   pub_name = "techopt";
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

Your actual integration will be significantly more complex. 

## Setup

`vagrant up`

`vagrant ssh`

`cd com_bsvideos_tv`

`grunt connect:server:keepalive` - turn on the http server

navigate to http://localtest:8000/demo/test2.html

`grunt` - compile your source

## Test
Suggest to Test on BrowserStack, A wonderful testing tool For mobile.

![Alt text](demo/Logo-01.svg)
