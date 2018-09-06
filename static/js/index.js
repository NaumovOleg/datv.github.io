

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

settings.videos.getNextIndex = function () {

    var length = this.length - 1;
    var currentIndex = this.currenIndex;

    if ( currentIndex === length ) {

        return 0;

    }

    return currentIndex + 1;

};


$ ( document ).ready ( function () {

    var videoContainers = $ ( '#videos-container' ).children ();

    for ( var i = 0; i < videoContainers.length; i++ ) {
        var videoItem = videoContainers[ i ].childNodes[ 1 ];
        settings.videos.push ( videoItem );

        var video = settings.videos[ i ];

        video.addEventListener ( 'ended', function () {

            settings.videos[ settings.videos.currenIndex ].parentElement.classList.add ( 'is-hidden' );
            settings.videos.next ();

        } );

    }


    runAll ();

} );


function runAll () {
    settings.videos.forEach ( function ( video ) {

        video.play ();

    } );
    setTimeout ( function () {

        settings.videos.forEach ( function ( video, index ) {

            if ( index !== 0 ) {
                video.pause ();
                video.currentTime = 0;
            }

            video.ontimeupdate = function () {
                if ( this.currentTime >= (this.duration - 0.7) ) {
                    settings.videos[ settings.videos.getNextIndex () ].parentElement.classList.remove ( 'is-hidden' );
                    settings.videos[ settings.videos.getNextIndex () ].play ();
                }
                ;
                if ( index === 1 ) {
                    if ( this.currentTime > 0.2 ) {
                        $ ( '#wrapper' ).css ( { display: 'block' } );
                        if ( this.currentTime >= ( this.duration - 0.5) ) {
                            $ ( '#wrapper' ).css ( { display: 'none' } );
                        }
                    }
                }
                ;

                if ( index === 2 ) {
                    var line = $ ( '.line-animation__with-timer' )[ 0 ];
                    if ( this.currentTime > 13 ) {
                        line.style.display = 'block';
                        if ( this.currentTime >= (this.duration - 0.5) ) {
                            line.style.display = 'none';
                        }
                    }
                }

                if ( index === 3 ) {
                    if ( this.currentTime > 2.5 ) {
                        $ ( '.animation__3' )[ 0 ].style.display = 'block';

                        if ( this.currentTime >= ( this.duration - 0.5) ) {
                            $ ( '.animation__3' )[ 0 ].style.display = 'none';
                        }
                    }
                }
                ;
            };
        } );
    }, 500 );

    settings.videos[ 0 ].currentTime = 0.15;
    settings.videos[ 0 ].play ();

}