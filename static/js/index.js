//var videoUrls = [ 'videos/ident.mp4', 'videos/trans.mp4', 'videos/story (online-video-cutter.com).mp4', 'videos/second_trans.mp4', 'videos/second_story (online-video-cutter.com) (2).mp4', 'videos/outro.mp4' ];
var videoUrls = [ './static/videos/1-Intro-Outro.webm', './static/videos/trans.mp4', './static/videos/story (online-video-cutter.com).mp4', './static/videos/second_trans.mp4', './static/videos/second_story (online-video-cutter.com) (2).mp4', './static/videos/outro.mp4' ];
var settings = {
    videos: [],
};

settings.videos.next = function () {

    if ( this.currenIndex === this.length - 1 ) {

        this.currenIndex = 0;
        return this[ 0 ];

    }

    return this[ ++this.currenIndex ];

};
settings.videos.currenIndex = 0;
$ ( document ).ready ( function () {

    window.videoContainer = $ ( '#videos-container' );

    let videosCount = videoUrls.length;

    for ( var i = 0; i < videosCount; i++ ) {

        var video = $ ( '<video class="' + i + '"  width="100%" height="100%" muted>' +
            '<source src="' + videoUrls[ i ] + '" type="video/mp4"></source>' +
            '</video>' );

        var videoParent = $ ( '<div class="video-div' + (i > 0?' is-hidden':'') + '"></div> ' ).append ( video );
        if ( i === 1 ) {
            videoParent.append ( $ ( '<div id="wrapper"><span id="word_one"><p>WHAT' + '\'' + 'S</p></span><span id="word_two"><p>UP</p></span></div>' ) );
        }

        if ( i === 3 ) {
            videoParent.append ( $ ( '<div id="wrapper-3"><span id="word_one"><p>Quote<br> of </p></span><span id="word_two"><p>UP</p></span></div>' ) );
        }

        settings.videos.push ( video[ 0 ] );

        videoContainer.append ( videoParent[ 0 ] );

        video.on ( 'ended', function () {

            settings.videos[ settings.videos.currenIndex ].parentElement.classList.add ( 'is-hidden' );
            var nextVideo = settings.videos.next ();
            nextVideo.currentTime = 0.15;
            nextVideo.play ();
            nextVideo.parentElement.classList.remove ( 'is-hidden' );
        } );
    };


    console.log( settings );

    runAll();

} );


function runAll () {

    console.log( settings )

    settings.videos.forEach ( function ( video ) {

        video.play ();

    } );
    setTimeout ( function () {

        settings.videos.forEach ( function ( video, index ) {

            if ( index !== 0 ) {
                video.pause ();
                video.currentTime = 0.15;
            }

            if ( index === 1 ) {
                video.currentTime = 0;
                video.ontimeupdate = function () {

                    if ( this.currentTime > 0.1 ) {

                        $ ( '#wrapper' ).css ( { display: 'block' } );

                        if ( this.currentTime >= (this.duration - 0.5) ) {
                            $ ( '#wrapper' ).css ( { display: 'none' } );
                        }

                    }
                };

            }

            if ( index === 3 ) {
                video.currentTime = 0;
                video.ontimeupdate = function () {

                    if ( this.currentTime > 3 ) {

                        $ ( '#wrapper-3' ).css ( { display: 'block' } );

                        if ( this.currentTime >= (this.duration - 0.5) ) {
                            $ ( '#wrapper-3' ).css ( { display: 'none' } );
                        }

                    }
                };

            }


        } );
    }, 500 );


    console.log( settings );

    settings.videos[ 0 ].currentTime = 0.15;
    settings.videos[ 0 ].play ();



}


