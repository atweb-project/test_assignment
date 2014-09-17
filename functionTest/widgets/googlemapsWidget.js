
    
    function GoogleMapsWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

      var Latitude = '51.528641'
      var Longitude = '-0.101598'
      var Zoom = 14
      var MapControl = true
      var PanControl = true
      var RotateControl = true
      var StreetViewControl = true
  
        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {
            	
            	if( typeof (param.Latitude) !== 'undefined') Latitude = param.Latitude
            	
            	if( typeof (param.Longitude) !== 'undefined') Longitude = param.Longitude
            	
            	if( typeof (param.Zoom) !== 'undefined') Zoom = param.Zoom
            	
            	if( typeof (param.MapControl) !== 'undefined') MapControl = param.MapControl
            	
            	if( typeof (param.PanControl) !== 'undefined') PanControl = param.PanControl
            	
            	if( typeof (param.RotateControl) !== 'undefined') RotateControl = param.RotateControl
            	
            	if( typeof (param.StreetViewControl) !== 'undefined') StreetViewControl = param.StreetViewControl
      	
            }

           
            return '<iframe width="100%" height="100%" id="' + this.getId() + '" src="googlemaps/googlemapsWidget.html" frameborder="0" '+
             	   'allowfullscreen="true" latitude="'+Latitude+'" longitude="'+Longitude+'" zoom="'+Zoom+'" mapcontrol="'+MapControl+'" '+
             	   'pancontrol="'+PanControl+'" rotatecontrol="'+RotateControl+'" streetviewcontrol="'+StreetViewControl+'"></iframe>'
            	                        
        },
        
        this.initElement = function(param){
        	
		},
		
		this.getLatitude = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'Latitude', 'ov': Latitude, 'nv': $('#latitude').prop('value') }])

        },
        
        this.getLongitude = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'Longitude', 'ov': Longitude, 'nv': $('#longitude').prop('value') }])

        },
		       
        this.changeZoom = function() {
			
            this.myRegisterUniquePropEvent( [{ 'prop': 'Zoom', 'ov': Zoom, 'nv': $('#zoomnumber').prop('value') }])
                         
        },
        
        this.changeMapControl = function() {
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'MapControl', 'ov': MapControl, 'nv': $('#mapcontrol').prop('checked') }])
        
        },   
        
        this.changePanControl = function() {
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'PanControl', 'ov': PanControl, 'nv': $('#pancontrol').prop('checked') }])
        
        }, 
        
        this.chooseRotateControl = function() {
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'RotateControl', 'ov': RotateControl, 'nv': $('#rotatecontrol').prop('checked') }])
        
        }, 
        
        this.changeStreetViewControl = function() {
        	
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'StreetViewControl', 'ov': StreetViewControl, 'nv': $('#streetviewcontrol').prop('checked') }])
        	
        },
               
        this.propChange= function (param) {

           // alert ("button prop change "+this.getId()+" param "+param.length)

        	 for (var i = 0; i < param.length; i++) {
        		 
        		 if( param[i].prop == 'Latitude' ) Latitude = param[i].value
             	
             	 if( param[i].prop == 'Longitude' ) Longitude = param[i].value

                 if (param[i].prop == 'Zoom') Zoom =  param[i].value 
                 
                 if (param[i].prop == 'MapControl') MapControl =  param[i].value 
                 
                 if (param[i].prop == 'PanControl') PanControl =  param[i].value 
                 
                 if (param[i].prop == 'RotateControl') RotateControl =  param[i].value
                   
                 if (param[i].prop == 'StreetViewControl') StreetViewControl = param[i].value
                 
             }
        	 
        	 $('#'+this.getId()).attr('latitude', Latitude )
         	
         	 $('#'+this.getId()).attr('longitude', Longitude )
        	 
        	 $('#'+this.getId() ).attr( 'zoom', Zoom)
        	 
        	 $('#'+this.getId() ).attr( 'mapcontrol', MapControl)
        	 
        	 $('#'+this.getId() ).attr( 'pancontrol', PanControl)
        	 
        	 $('#'+this.getId() ).attr( 'rotatecontrol', RotateControl)   
        	 
        	 $('#'+this.getId() ).attr( 'streetviewcontrol', StreetViewControl)
                	 
        	 $('#'+this.getId() ).attr( 'src', function ( i, val ) { return val; })
        	 
        },

        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())

        	$('#latitude').prop('value', Latitude )
        	
        	$('#longitude').prop('value', Longitude )
        	
        	$('#zoomnumber').prop('value', Zoom)
        	
            $('#mapcontrol').prop('checked', MapControl)
            
            $('#pancontrol').prop('checked', PanControl)
            
            $('#rotatecontrol').prop('checked', RotateControl)
            
            $('#streetviewcontrol').prop('checked', StreetViewControl )
            
        },
         
        this.createJSON = function() {

             return { 'Latitude' : Latitude, 'Longitude' : Longitude,'Zoom': Zoom, 'MapControl': MapControl,'PanControl': PanControl,'RotateControl': RotateControl, 'StreetViewControl': StreetViewControl}

        }
        
    }

// static variables/functionsc

    GoogleMapsWidget.init = function () {
    	
    	$("#googlemapsMenu").append("Latitude:<br><input type='edit' id='latitude'>")
		$("#latitude").spinner({ step: .000001, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().getLatitude() } })
    	$("#googlemapsMenu").append("<br>Longitude:<br><input type='edit' id='longitude'>")
    	$("#longitude").spinner({ step: .000001, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().getLongitude() } })
		$("#googlemapsMenu").append("<br>Zoom<br><input type='edit' id='zoomnumber'>")
    	$("#zoomnumber").spinner({ min: 0, max: 19, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeZoom() } })
		$("#googlemapsMenu").append("<br>Map Type Control<input type='checkbox' id='mapcontrol' onclick='appGlobals.currentObject().changeMapControl()'>")
    	$("#googlemapsMenu").append("<br>Pan Control<input type='checkbox' id='pancontrol' onclick='appGlobals.currentObject().changePanControl()'>")
    	$("#googlemapsMenu").append("<br>Rotate Control<input type='checkbox' id='rotatecontrol' value='' onclick='appGlobals.currentObject().chooseRotateControl()'>")
    	$("#googlemapsMenu").append("<br>Street View Controol<input type='checkbox' id='streetviewcontrol' name='' value='' onclick='appGlobals.currentObject().changeStreetViewControl()'>")
    	
}
GoogleMapsWidget.buttomImage='images/button_icon.png'
GoogleMapsWidget.typeId= 'gmaps'
GoogleMapsWidget.myClass= 'widget_gmaps'
GoogleMapsWidget.initialWidth='480'
GoogleMapsWidget.initialHeight= '270'
GoogleMapsWidget.actionsSectionId='googlemapsMenu'

