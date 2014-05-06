


// for youtube videos the wmode is importand otherwise youtube video appears over top of everything else

// and cannot drag the item anymore
// setting wmode="Opaque" at prop does not work on firefox so needs to be added to URL
// http://helpx.adobe.com/x-productkb/multi/swf-file-ignores-stacking-order.html
//http://stackoverflow.com/questions/3820325/overlay-opaque-div-over-youtube-iframe

function YoutubeWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype)       
        
        var allowFullscreen = true
        var start = 0
        var showRel = true
        var clipEnd = 0
        var autoplay = false

       // alert (" this.id is "+ this.getId() )

        this.changeURL = function ()
        {

            // alert ("button clicked")
            //var c = cleanedUpCurrent()   
            // alert (  ' currentId '+currentID+" text "+ $('#newButtonText').prop('value') )
            //  alert ( "id "+ currentID  +" current url "+ $(currentID).attr('src')+" new URL "+ $('#newYoutubeURLText').prop('value')  )
            // NEEDS ERROR CHECKING
            // turn youtube links to embed links would be nice
             
           // $(currentID).attr('src', $('#newYoutubeURLText').prop('value')+ '?wmode=opaque' )
          //  alert(' chnage url ' + $('#newYoutubeURLText').prop('value'))

            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': this.cleanSource(), 'nv': $('#newYoutubeURLText').prop('value') }])


        },


    

        this.propChange = function (param) {

            // alert ("prop change "+id+" param "+param.length)

            // $('#'+id).html( param[0].value  )

          //  alert ('prop chnage '+  param[0].value )
            var urlWithoutParam = this.cleanSource(  )

       //     var allowFullscreen = this.wantFs(id)



            for (var i = 0; i < param.length; i++) {

                if (param[i].prop == 'url') urlWithoutParam =  param[i].value 
                  
                if (param[i].prop == 'allowFullscreen') allowFullscreen = param[i].value

                if( param[i].prop == 'start' ) start = param[i].value

                if (param[i].prop == 'end') clipEnd = param[i].value

                if( param[i].prop == 'showRel') showRel = param[i].value

                if( param[i].prop =='autoplay') autoplay = param[i].value

                    //$('#'+id).attr('allowfullscreen', param[i].value )

            }


            $('#'+this.getId() ).attr( 'src',  urlWithoutParam+"?wmode=opaque&fs=" + ( allowFullscreen ==true ? 1:0) +"&start="+start+""+this.endParameter()+''+this.relatedParameter()+''+this.autoplayParameter()  )

            
        },


        this.autoplayParameter = function()
        {
            if( (appGlobals.isInDesignMode() == false) && ( autoplay == true )) return '&autoplay=1'
             
            return ''

        },


        this.endParameter = function ()
        {
            if (clipEnd == 0) return ''

            return '&end='+clipEnd

        },


        this.toggleFullscreen = function()
        {


            this.myRegisterUniquePropEvent(  [{ 'prop': 'allowFullscreen', 'ov': allowFullscreen, 'nv': $('#allowFullscreenYoutube').prop('checked') }])


        },


        this.selectionChanged = function()  {

            //alert (" button selection changed")

            $('#newYoutubeURLText').prop('value', this.cleanSource( ) )
              

            //if($(currentID).attr('allowfullscreen') == 'true')
           // alert(   $(currentID).attr('allowfullscreen') == 'true' ? 'first' : 'second'   )
          //  alert ('allow fs'+ this.wantFs( cleanedUpCurrent () )    )

            $('#allowFullscreenYoutube').prop('checked', allowFullscreen )


            $('#autoplayYoutube').prop('checked', autoplay )



            $('#startYoutube').spinner('value', start)

            $('#endYoutube').spinner('value', clipEnd)



            $('#showRelatedYoutube').prop('checked', showRel )


          //  alert( $(currentID).attr('allowfullscreen'))


        },


        this.createElement = function (param) {
   
            var url = "http://www.youtube.com/embed/ClCk6LljEAU"
           // var allowFullscreen = true


            if( typeof(param) !== 'undefined') {

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.allowFullscreen) !== 'undefined') allowFullscreen = param.allowFullscreen

                if (typeof (param.start) !== 'undefined') start = param.start

                if (typeof (param.end) !== 'undefined') clipEnd = param.end

                if( typeof (param.showRel) !== 'undefined') showRel = param.showRel

                if( typeof (param.autoplay) !== 'undefined') autoplay = param.autoplay

                //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)

             }
              

            return '<iframe width="100%" id="' + this.getId() + '" height="100%" src="' + url + '?wmode=opaque&fs=' + (allowFullscreen == true ? 1 : 0) + '&start=' + start + ''+ this.endParameter()+''+ this.relatedParameter() + ''+ this.autoplayParameter()  +'" frameborder="0"  ></iframe>'

        },

        this.initElement = function()
        {

            
        },


        this.relatedParameter = function()
        {

            return '&rel='+ (showRel == true? 1  : 0  )
        }



        this.cleanSource = function() {
            var s =  $('#'+this.getId() ).attr('src')
            var i = s.indexOf("?") // get rid of question mark as not mark as url 
            return s.substring(0,i) 
        },


        this.showRelatedToggle = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'showRel', 'ov': showRel, 'nv': $('#showRelatedYoutube').prop('checked') }])

        },


        this.autoplayToggle = function ()
         {
             
            this.myRegisterUniquePropEvent(  [{ 'prop': 'autoplay', 'ov': autoplay, 'nv': $('#autoplayYoutube').prop('checked') }])

         },


        this.changeStartTime = function () {

         //   alert (" start time " + $('#startYoutube').spinner( "value" )   )

            var ns = $('#startYoutube').spinner( "value" )

            if (ns != null) {

                this.myRegisterUniquePropEvent(  [{ 'prop': 'start', 'ov': start, 'nv': ns }])

            } 
            else {

                alert ("Numbers only")
            }


        },


         this.changeEndTime = function () {

             //   alert (" start time " + $('#startYoutube').spinner( "value" )   )

             var ns = $('#endYoutube').spinner( "value" )

             if (ns != null) {

                 this.myRegisterUniquePropEvent( [{ 'prop': 'end', 'ov': clipEnd, 'nv': ns }])

             }
             else {

                 alert ("Numbers only")
             }


         },


       this.createJSON = function () {

         //  alert ("json allowfullscreen " + allowFullscreen )
             
            return { 'url':  this.cleanSource(),'allowFullscreen': allowFullscreen,'start': start, 'end':clipEnd, 'showRel': showRel, 'autoplay': autoplay } 
        }
        


    }
   

YoutubeWidget.buttomImage= 'images/youtube.png'
YoutubeWidget.typeId= 'youtube'
YoutubeWidget.myClass= 'widget_youtube'
YoutubeWidget.initialWidth= '400'
YoutubeWidget.initialHeight= '300'
YoutubeWidget.actionsSectionId= 'youtubeMenu'


YoutubeWidget.init= function () {

    $("#youtubeMenu").append("URL<input type='text' id='newYoutubeURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")

    $("#youtubeMenu").append("<br>Allow Fullscreen<input type='checkbox' id='allowFullscreenYoutube' name='allowFullscreen' value='fullscreen' onclick='appGlobals.currentObject().toggleFullscreen()'>")

    $("#youtubeMenu").append("<br>Show related videos<input type='checkbox' id='showRelatedYoutube' name='allowFullscreen' value='fullscreen' onclick='appGlobals.currentObject().showRelatedToggle()'>")

    $("#youtubeMenu").append("<br>Autoplay<input type='checkbox' id='autoplayYoutube' name='autoplay' value='' onclick='appGlobals.currentObject().autoplayToggle()'>")


    $("#youtubeMenu").append("<br>Start<input type='edit' id='startYoutube' name='startYoutube' value='0' >")

    $("#startYoutube").spinner({ min: 0, change: function (event, ui) { appGlobals.currentObject().changeStartTime() } });

    $("#youtubeMenu").append("<br>End<input type='edit' id='endYoutube' name='endYoutube' value='0' >")

    $("#endYoutube").spinner({ min: 0, change: function (event, ui) { appGlobals.currentObject().changeEndTime() } });
   

}

