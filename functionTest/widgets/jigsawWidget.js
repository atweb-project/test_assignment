

    
    function JigsawWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var numberOfPieces = 6
        var aspectH = 2

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

            	if (typeof (param.numberOfPieces) !== 'undefined') numberOfPieces = param.numberOfPieces
                
                if (typeof (param.aspectH) !== 'undefined') aspectH = param.aspectH

            }
       
            /*return '<div id="' + this.getId() + '" style="width: 80%;margin: 0px auto;"><div class="iframe-container" style="height: 0;width: 100%;padding-bottom: 56.25%;overflow: hidden;position: relative;">'+
            		'<iframe width="100%" height="100%" style=" position: absolute;top:0;left: 0;" src="jigsaw/jigsawWidget.html" numberOfPieces="'+ 
            			numberOfPieces +'" numberOfRows="'+ aspectH +'" frameborder="0"></iframe><div></div>'*/
            return '<iframe id="' + this.getId()  +  '" width="100%" height="100%" src="jigsaw/jigsawWidget.html" numberOfPieces="'+ 
			numberOfPieces +'" numberOfRows="'+ aspectH +'" frameborder="0"></iframe><div>'
            
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
        
        this.numberOfRows = function () {

            var ns = $('#numberOfRows').spinner( "value" )

            if (ns != null) {

                this.myRegisterUniquePropEvent(  [{ 'prop': 'aspectH', 'ov': aspectH, 'nv': ns }])

            } 
            else {

                alert ("Numbers only")
            }


        },
        
        this.initElement = function(param){
        	

		},
        
        this.propChange= function (param) {

        	for (var i = 0; i < param.length; i++) {

				if (param[i].prop == 'numberOfPieces') numberOfPieces = param[i].value
				
				if (param[i].prop == 'aspectH') aspectH = param[i].value
        	}
        	
        	$('#'+this.getId() ).attr( 'numberOfPieces', numberOfPieces);
       	 	$('#'+this.getId() ).attr( 'numberOfRows', aspectH);
       	 	$('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });

        },

        this.selectionChanged=function()  {

        	$('#numberOfPieces').spinner('value', numberOfPieces)
        	
        	$('#numberOfRows').spinner('value', aspectH)
              

         },
         
         this.createJSON = function() {

             return { 'numberOfPieces': numberOfPieces,'aspectH':aspectH}

         }
        
    }

// static variables/functions

JigsawWidget.init = function () {
	$("#jigsawMenu").append("<br>Number of pieces to divide<input type='edit' id='numberOfPieces' name='numberOfPieces' value='6' >")

    $("#numberOfPieces").spinner({ min: 0, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().numberOfPieces() } });

    $("#jigsawMenu").append("<br>Number of rows to divide(Please make sure that the number of pieces with number of rows divides exactly)<br><input type='edit' id='numberOfRows' name='numberOfRows' value='2' >")

    $("#numberOfRows").spinner({ min: 0, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().numberOfRows() } });
}
JigsawWidget.buttomImage='images/button_icon.png'
JigsawWidget.typeId= 'jigsaw'
JigsawWidget.myClass= 'widget_jigsaw'
JigsawWidget.initialWidth='650'
JigsawWidget.initialHeight= '350'
JigsawWidget.actionsSectionId='jigsawMenu'

