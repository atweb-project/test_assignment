

    
    function PaintWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)
        
        var allowColors = true
        var allowLinewidths = true
                
        
         this.choiceOfpalette = function()
        {

        	//alert ("button clicked")
            this.myRegisterUniquePropEvent(  [{ 'prop': 'allowColors', 'ov': allowColors, 'nv': $('#allowColors').prop('checked') }])
            //alert(this.myRegisterUniquePropEvent())


        },
        
        this.choiceOfLinewidths = function()
        {

        	//alert ("button clicked")
            this.myRegisterUniquePropEvent(  [{ 'prop': 'allowLinewidths', 'ov': allowLinewidths, 'nv': $('#allowLinewidths').prop('checked') }])


        },
        
        this.propChange= function (param) {

            // alert ("button prop change "+this.getId()+" param "+param.length)

        	 for (var i = 0; i < param.length; i++) {
                   
                 if (param[i].prop == 'allowColors') allowColors = param[i].value
                 //alert(allowColors+"change")
                 
                 if (param[i].prop == 'allowLinewidths') allowLinewidths = param[i].value

             }
        	 
        	 $('#'+this.getId() ).attr( 'allowcolors', allowColors == true ? 1:0);
        	 $('#'+this.getId() ).attr( 'allowlinewidths', allowLinewidths == true ? 1 : 0);
        	 
        	 $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; });


         },
         
         this.selectionChanged=function()  {

        	 $('#allowColors').prop('checked', allowColors )
        	 
        	 $('#allowLinewidths').prop('checked', allowLinewidths )  

            }

        this.createElement= function (param) {
        	
        	 var url = "canvas/paint.html"
          
            if (typeof (param) !== 'undefined') {

                if (typeof (param.url) !== 'undefined') url = param.url
                
                if (typeof (param.allowColors) !== 'undefined') allowColors = param.allowColors
                //alert(allowColors +"+create")
                
                if (typeof (param.allowLinewidths) !== 'undefined') allowLinewidths = param.allowLinewidths

            }


        	 return '<iframe width="100%" id="' + this.getId() + '" class="gcanvas" height="100%" src="' + url + '" frameborder="0" allowcolors="'+ (allowColors == true ? 1 : 0) +
        	 '" allowlinewidths="'+ (allowLinewidths == true ? 1 : 0) +'"></iframe>'
        	
        },
        
		this.initElement = function(param){
        	

		},
				
        this.createJSON = function() {
			//alert ("json allowColors " + allowColors )
			 return { 'allowColors': allowColors,'allowLinewidths':allowLinewidths }
        }
        
         
    }

// static variables/functions

PaintWidget.init = function () {
	
	$("#paintMenu").append("<br>Allow choice of colours<input type='checkbox' id='allowColors' name='allowColors' value='colors' onclick='appGlobals.currentObject().choiceOfpalette()'>")

    $("#paintMenu").append("<br>Allow choice of line sizes<input type='checkbox' id='allowLinewidths' name='allowLinewidths' value='linewidths' onclick='appGlobals.currentObject().choiceOfLinewidths()'>")
   
   
}
PaintWidget.buttomImage='images/brush_painting.png'
PaintWidget.typeId= 'Paint'
PaintWidget.myClass= 'paintWidget'
PaintWidget.initialWidth='550'
PaintWidget.initialHeight= '300'
PaintWidget.actionsSectionId='paintMenu'
	