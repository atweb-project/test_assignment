
 $(function(){
         
         var LatitudeNew = $(window.frameElement).attr('latitude')
         
         var LongitudeNew = $(window.frameElement).attr('longitude')
         
         var ZoomNew = $(window.frameElement).attr('zoom')
         
         var MapControlNew = $(window.frameElement).attr('mapcontrol')
         
         var PanControlNew = $(window.frameElement).attr('pancontrol')
         
         var RotateControlNew = $(window.frameElement).attr('rotatecontrol')
         
         var StreetViewControlNew = $(window.frameElement).attr('streetviewcontrol')
                           
            function MapControl() {

                if (MapControlNew === 'true'){
               
                    return true
                }
        
                return false
            }
            
            function PanControl() {

                if (PanControlNew === 'true'){
               
                    return true
                }
        
                return false
            }
            
            function RotateControl() {

                if (RotateControlNew === 'true'){
               
                    return true
                }
        
                return false
            }
            
            function StreetViewControl() {

                if (StreetViewControlNew === 'true'){
               
                    return true
                }
        
                return false
            }
                
           function init_map() {
               
                    var var_location = new google.maps.LatLng(LatitudeNew ,LongitudeNew);
             
                    var var_mapoptions = {
                      center: var_location,
                      zoom: parseInt(ZoomNew),
                      mapTypeId: google.maps.MapTypeId.ROADMAP,
                      mapTypeControl: MapControl(),
                      panControl:PanControl(),
                      rotateControl:RotateControl(),
                      streetViewControl: StreetViewControl()
                    };
             
                    var var_marker = new google.maps.Marker({
                        position: var_location,
                        map: var_map,
                        title:"London"});
             
                    var var_map = new google.maps.Map(document.getElementById("map-container"),
                        var_mapoptions);
             
                    var_marker.setMap(var_map);   
                    
                    //Resize Function
                    google.maps.event.addDomListener(window, "resize", function() {
                    var center = var_map.getCenter();
                    google.maps.event.trigger(var_map, "resize");
                    var_map.setCenter(center);
                    }); 
             
                  }
                  //google.maps.event.addDomListener(window, 'resize', init_map);
                 google.maps.event.addDomListener(window, 'load', init_map);
        });
