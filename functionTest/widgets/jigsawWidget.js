 
    function JigsawWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var url = "lake.jpg"
        var numberOfPieces = 3

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {
            	
            	if ( typeof (param.url) !== 'undefined') url = param.url

            	if (typeof (param.numberOfPieces) !== 'undefined') numberOfPieces = param.numberOfPieces
                

            }
       
            return '<iframe id="' + this.getId()  +  '" width="100%" height="100%" src="jigsaw/jigsawWidget.html" numberOfPieces="'+ 
			numberOfPieces +'" puzzleurl="'+ url +'" frameborder="0"></iframe><div>'
            
        },
        
        this.changeURLJigsaw = function() {
			
            this.myRegisterUniquePropEvent( [{ 'prop': 'url', 'ov': url, 'nv': $('#newjigsawURLText').prop('value') }])
                         
        },
        
        this.numberOfPieces = function () {

            var ns = $('#numberOfPieces').spinner( "value" )

            if (ns != null) {

                this.myRegisterUniquePropEvent(  [{ 'prop': 'numberOfPieces', 'ov': numberOfPieces, 'nv': ns }])

            } 
            else {

                alert ("Numbers only")
            }


        },
                
        this.initElement = function(param){
        	
        	 if (appGlobals.isInDesignMode() == false)  
	             
	            	$('#'+this.getId()).attr('parammode','0');

		},
        
        this.propChange= function (param) {

        	for (var i = 0; i < param.length; i++) {

        		if (param[i].prop == 'url') url = param[i].value
        		
        		if (param[i].prop == 'numberOfPieces') numberOfPieces = param[i].value
								
        	}
        	
        	$('#'+this.getId() ).attr( 'puzzleurl', url);
        	$('#'+this.getId() ).attr( 'numberOfPieces', numberOfPieces);
       	 	$('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });

        },

        this.selectionChanged=function()  {

        	$('#newjigsawURLText').prop('value', url)
        	
        	$('#numberOfPieces').spinner('value', numberOfPieces)
        	         
         },
         
         this.createJSON = function() {

             return { 'url':url, 'numberOfPieces': numberOfPieces}

         }
        
    }

// static variables/functions

JigsawWidget.init = function () {
	$("#jigsawMenu").append("Image URL<br><input type='text' id='newjigsawURLText'><button onclick='appGlobals.currentObject().changeURLJigsaw()'>Update</button>")
	
	$("#jigsawMenu").append("<br>Number of pieces to divide(The structure is always a square for example 3x3)<input type='edit' id='numberOfPieces' name='numberOfPieces' value='3' >")

    $("#numberOfPieces").spinner({ min: 0, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().numberOfPieces() } });
}
JigsawWidget.buttomImage='images/button_icon.png'
JigsawWidget.typeId= 'jigsaw'
JigsawWidget.myClass= 'widget_jigsaw'
JigsawWidget.initialWidth='530'
JigsawWidget.initialHeight= '330'
JigsawWidget.actionsSectionId='jigsawMenu'

