var widgetlist = [] 


   var acceptlist = "";


    var activePage = 1;
	
	var createdElements = []
	
	 var currentID = ""; //ID of the currently selected widget (with hash)
	

	
	        function MyGlobals () {

                var screenWidth = 768
                var screenHeight = 910
                
                var designMode = true

                var maxZ = 9999

                this.getScreenWidth = function () { return screenWidth }
                this.getScreenHeight = function () { return screenHeight }

                this.getCurrentSelected = function () { return cleanedUpCurrent() }

                this.currentObject = function () { return createdElements[holderFromElement(this.getCurrentSelected())] }

                this.isInDesignMode = function () {  return designMode  } 

                this.setDesignMode = function (p) { designMode = p }

                this.getMaxZ = function () { return maxZ }  
				
				this.getMedia = function () { return 'images/brush_painting.png' } 
				

            }
	
	
			    var appGlobals = new MyGlobals()
				
				
			function myPreview() {
                    

                    $('#myPreviewDiv').css('width', appGlobals.getScreenWidth()+60)
                    $('#myPreviewDiv').css('height', appGlobals.getScreenHeight()+80)


                    $('#myInnerPreviewDiv').css('width', appGlobals.getScreenWidth() )
                    $('#myInnerPreviewDiv').css('height', appGlobals.getScreenHeight() )


                    var previewElements = []


                    $('#myPreviewDiv').dialog({
                        autoOpen: false,
                        width: appGlobals.getScreenWidth()+60,
                        height: appGlobals.getScreenHeight()+80,
                        resizable: false, 
                        modal: true,

                        close: function () {

                          
                            // kill any preview elements tell them first tho
                            for (a in previewElements) {

                                var t= previewElements[a]

                                if (typeof (t.destroyElement) != "undefined") t.destroyElement()

                            }
                             
                            // wipe all html in one go
                            $('#myInnerPreviewDiv').html('')
                             
                            //alert(" closing ")
                        }



                    } )

                  //  alert(' number of elements ' + Object.keys(createdElements).length)

                    // create copy of orignals as behavior may be different when in preview mode, for complex controls cannot just copy and dump the html

                    var previewElementNumber = 0

                    // better trap error other a error may cause app to run in preview mode all the time?
                    appGlobals.setDesignMode(false)

                        for (a in createdElements) {

                            var json = jsonObject( elementFromHolder (a ) )
                         
                            var id = 'preview' + previewElementNumber

                            var ne = new widgetlist[json.type](id, widgetlist[json.type] )

                             var extendedZ = appGlobals.getMaxZ() + parseInt(json.common.z) 
                             
                            $('#myInnerPreviewDiv').append('<div style="position:absolute; left:' + json.common.left +
                                'px;top:' + json.common.top + 'px;width:' + json.common.width + 'px; height:' + json.common.height + 'px; z-index:' + extendedZ +
                                ';">' + ne.createElement(json.extra) +
                                '   </div>')

                             if (typeof (ne.initElement) != "undefined") ne.initElement()

                             $('#myInnerPreviewDiv #'+id).css('background-color',  json.common.background_color )

                             previewElements[id] = ne

                             previewElementNumber++
                        }
                     
                    appGlobals.setDesignMode(true)

                     
                    $('#myPreviewDiv').dialog('open')



                };
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	  //function to update information in properties tab   
    var refresh_attributes = function () {
        current = this;

        // enable/disable controls based on if anything selected   
        
        var left =""
        var top =""
        var width = ""
        var height =""
        var z = ""

       // var borderStyle =""
        var backgroundColor =''
         

        if (currentID != '') {

            var holder = holderFromElement(currentID)

            $('#tabs').find('input, textarea, button, select').prop('disabled', false);
            left = parseFloat($('#' + holder).css('left')).toFixed(2) + 'px'
            top =  parseFloat($('#' + holder).css('top')).toFixed(2) + 'px'

            width =  parseFloat($('#'+holder).css('width')).toFixed(2) + 'px';
            height = parseFloat($('#'+holder).css('height')).toFixed(2) + 'px';
            z = parseInt($('#' + holder).css('z-index'))

        //    borderStyle = $( currentID).css('border-style')
          //  alert (' current id '+currentID+' border style '+borderStyle)
            //  alert($(currentID).data('myBackgroundColor'))

            // background color kept in data, not read from browser because browsers don't store in same way
            backgroundColor = $(currentID).data('background-color') 

        }
        else
            $('#tabs').find('input, textarea, button, select').prop('disabled', true);


        //alert ("z is "+z )
        /*
        $('input#activePage').val(activePage);
        $('#tabs-2').find("#textfield1").val(currentID);
        $('#tabs-2').find("#textfield1").val(currentID);
        */
        //if(
        //alert("hi " + holderFromElement(currentID) )
      //  alert ( parseFloat($('#'+  holderFromElement(currentID) ).css('left')).toFixed(2) + 'px' )
         
        $('#tabs-2').find("#textfieldLeft").val(left);
        $('#tabs-2').find("#textfieldTop").val(top);


        $('#tabs-2').find("#textfield3").val(width);
        $('#tabs-2').find("#textfield4").val(height);
        $('#tabs-2').find("#textfieldz").val(z);


      //  borderStyleAction(borderStyle)


        $('#backgroundColorEdit').val( backgroundColor );

        /*
        $('.properties_area').find('.font_size_select').val($(currentID).css('font-size'));
        $('.properties_area').find('.font_family_select').val($(currentID).css('font-family')+'px');
        $('.properties_area').find('#corner_radio').val($(currentID).css('border-radius')+'px');
        $('.resizable').resizable();

        $('.replace_widget').html(findWidgetClass[0]);
        */
    };

	 
	 function destroyElement(c) {

        var ce = createdElements[c]

        //    alert(" c is " + ce)

        var eid = elementFromHolder(c)

       // var t = widgetlist[ce]

        //  alert (" t.id is "+ t.id )  

        if (typeof (ce.destroyElement) != "undefined") ce.destroyElement(  )


        $('#' + c).remove();
         
        delete createdElements[c]


        if (currentID == '#' + eid) {
            currentID = ''
            $(".actionsForWidget").hide()
            refresh_attributes()
           // alert ("selected was deleted")
        }

    }
	
	 function getSharedAsJson(t)
    {

       return { 
            'left': parseInt(t.css('left') ),
            'top': parseInt( t.css('top') ),
            'width': parseInt( t.css('width') ),
            'height': parseInt(t.css('height')),
            'z': parseInt(t.css('z-index')),
           'background_color':  $('#'+elementFromHolder( t.attr('id') ) ).data('background-color')
        }


    }


    function getElementExtra(c,id)
    {

        var extra = {}

        if (typeof (c.createJSON) != "undefined") extra = c.createJSON()

        return extra

    }
	
	
	
	
	
	
	    function jsonObject(id)
    {

        var conId = holderFromElement(id)


        var myJson = getSharedAsJson(  $('#'+conId) )

       
       // alert ('myJson z is '+myJson.z) 

     //   alert (" id "+ id+" conId "+conId)


        var e = createdElements[conId]

       // var c = widgetlist[e]


        var extra = getElementExtra(e,   id  )

        var endResult = { 'common': myJson, 'type': e.getType(), 'extra': extra }

        return endResult

    }

	
	
	
	
	  var remove_widget = function () {
        if (confirm('Are you sure?') == true) {


           // var c = holderFromElement(cleanedUpCurrent(currentID) )

           // alert(" c is " + c ) 

          //   destroyElement(c)

            var ne = new destroyObjectEvent(cleanedUpCurrent(currentID))

            ne.action()

            eventManager.addEvent ( ne ) 


           // alert ("destroying")

          //  alert("findWidgetClass" + cleanedUpCurrent(currentID) )

          //  $('#info_table').find('tr.' + cleanedUpCurrent(currentID)).remove();


        }
    };
	
	
	
	
	
	    function cleanedUpCurrent()
    {

        if(currentID =='') return ''

        return 'element'+ getNumberAtEnd(currentID)

    }
	
	
	
	

	 function MyWidget(pid, ptype)
    {

        var id = pid
        var myType = ptype

        //alert("my widget con called with id of " + this.id + " and class type " + this.myType)

        this.getId = function() { return id }
        this.getType = function () { return myType }

        this.myRegisterUniquePropEvent = function (param) { registerUniquePropEvent(this.getId(), param) }



    }

 
	
	   var update_prop = function (value,propName) {

        var t = $('#' + holderFromElement(currentID))

       // var ne = new SharedPropEvent(cleanedUpCurrent(), [ { 'ov': t.css(propName), 'nv': value, 'prop':propName }  ] )

        addUndoableEvent (cleanedUpCurrent (),  [ { 'ov': t.css(propName), 'nv': value, 'prop':propName }  ]   )



       // t.css(propName, value);

     //   alert( eventManager.numberOfEvents() ) 

        return false;
    };
	
	
	
	
	

	
	function showWidgets()
	{
  // alert (widgetlist.length)
        var c= 0
        for (t in widgetlist) {

            var x = widgetlist[t]

            //alert(x.typeId)

            $('#widget_container').prepend('<li id="' + x.typeId + '" class="' + x.myClass + ' widget draggable icon" style="background:url(' + x.buttomImage + ') transparent center center no-repeat;" ><span class="text">' + x.typeId + '</span></li>');
             
			// alert ( $('#widget_container') )

            acceptlist += "#" + x.typeId;
            if (c < Object.keys(widgetlist).length - 1) {
                acceptlist += ", ";
            }

            c++
        }
        // Attach handlers for moving initial widget icons
        $(".draggable.icon").draggable({ revert: 'true', stack: '.widget', helper: "clone" });

	}




 function widgetSetup(t)
    {

        if (t.actionsSectionId != 'undefined') $("#widgetActions").append("<div id='" + t.actionsSectionId + "' class='actionsForWidget' style='display:none'> </div>") 
          

     //   alert (t.init)
        if (   typeof(t.init) != "undefined") t.init();

      //  alert (t.buttomImage)
         
        widgetlist[t.typeId] = t


     //   var e = new  widgetlist[t.id]

      //  alert ("(widgetSeetup) e.id "+e.testV)

    }



    function EventManager () {

        var myEvents = new Array()
        var currentEvent= 0

        this.undo= function () {

          //  alert ("current event is "+currentEvent)

            if (currentEvent == 0) { alert("nothing to undo"); return; }

            myEvents[currentEvent - 1].unaction()

            currentEvent--

            refresh_attributes()

        },
         

        this.addEvent =function(e)
        {

          // user has undoed then create new events so delete the events down the line
            if (currentEvent < myEvents.length) {

                //alert("currentEvent " + currentEvent + " myEvents " + myEvents.length)

                myEvents.splice(currentEvent, myEvents.length-currentEvent)
            }


            myEvents.push(e)
            currentEvent++

        //    alert (" number of events "+myEvents.length)

        },


        this.redo = function () {

           // alert (" current event "+currentEvent+" number of events "+myEvents.length)  

            if (currentEvent >= myEvents.length ) { alert('nothing to redo'); return; }

            myEvents[currentEvent].action()

            currentEvent++

            refresh_attributes()


        }
        ,


        this.numberOfEvents =  function() {

            return myEvents.length
        }


    }


    var eventManager = new EventManager()
	
	
	

    function SharedPropEvent(pId, param ) // pov, pnv,pPropName)
    {
    
        var id = pId

        var myParam = param
        
     //   var nv = pnv
      //  var t =  $("#"+id)
     //   var ov = pov;// t.css(pPropName)
       // var propName = pPropName

        

        this.doChange = function (prop, nv) {


          //  alert(" id is " + id + " propName is " + prop + " nv " + nv)

            var t = $("#" + holderFromElement(id))

            if (prop == 'background-color') {
                $('#' + id).data('background-color', nv)
                $('#'+id ).css(prop,nv)

            }


            else t.css(prop, nv)


           

        },


        this.action = function () {

            //alert (" inside action left is "+left)
           
            for (var a = 0; a < myParam.length; a++) {

              //  alert("prop "+myParam[a].prop+" nv "+myParam[a].nv )

                this.doChange(myParam[a].prop, myParam[a].nv)
                
            }
        }

        ,


        this.unaction = function () {

         //   alert ("undo number of css in event "+  myParam.length) 

            for (var a = 0; a < myParam.length; a++) {
            //    alert(" prop " + myParam[a].prop + " ov " + myParam[a].ov)
                this.doChange(myParam[a].prop, myParam[a].ov)

            }
           

        }


    }


    function widgetFromId(id)
    {

        var conId = holderFromElement(id)


     //   alert(" conId " + conId )//+ " type " + t.getType())


        var t = createdElements[ conId ]

      
        return widgetlist[  t.getType()   ]
    }


    // param needs to be array 
    function registerUniquePropEvent(pId, param)
    {



        var ne = new UniquePropEvent(pId, param)

        ne.action()

        eventManager.addEvent(ne)


    }


    function UniquePropEvent(pId, param) // pov, pnv,pPropName)
    {

        var id = pId

        var myParam = param

        // this was the source of bug when trying to access deleted object events
        // var el = createdElements[ holderFromElement(id)  ]

       // alert("uniquepropevent " + id + " param length " + param.length)

        // control prop has chnaged and it is current


        this.controlsUpdateIfNeeded = function () {


            var el = createdElements[holderFromElement(id)]

          //  var t = widgetFromId(id)
           //  alert ("id is "+id+" cuc "+cleanedUpCurrent() )

            if (id == cleanedUpCurrent()) {
                // should be a prop changed now update because it props may be visible
                if (typeof (el.selectionChanged ) !== 'undefined') el.selectionChanged(id)
            }


        },



        this.action = function () {

            var el = createdElements[holderFromElement(id)]

           // var t = widgetFromId(id)


          //  alert(" inside action  id is " + id+" t is "+el.getId() )


            // only send back the new values
            var nv = []


           // alert (" id is "+id +" currentID is "+currentID )

            for (var a = 0; a < myParam.length; a++) {

                nv.push({ 'prop': myParam[a].prop, 'value': myParam[a].nv })
                 
               // alert ("prop "+ myParam[a].prop+" nv "+myParam[a].nv)  

            }


         //   alert( 'before prop change'+JSON.stringify( el.createJSON() , null, 4) )



            if (typeof (el.propChange) !== 'undefined') {
               // alert ("called prop change") 

                el.propChange( nv)
                
                this.controlsUpdateIfNeeded()
            }
          
          //  alert('after prop change' + JSON.stringify(el.createJSON(), null, 4))
          //  alert (" NOW IN ACTION CHECK AGAIN") 
          //  Save() 

        }

        ,


        this.unaction = function () {

            //alert (" inside action left is "+left)
          //  var t = widgetFromId(id)


           // alert(" id is " + id + " currentID is " + currentID)

            var el = createdElements[holderFromElement(id)]


            // only send back the old values
            var ov = []
            for (var a = 0; a < myParam.length; a++) {

                ov.push({ 'prop': myParam[a].prop, 'value': myParam[a].ov })

                //alert("prop " + myParam[a].prop + " ov " + myParam[a].ov)
            }  

            if (typeof (el.propChange) !== 'undefined') {
                el.propChange( ov)

                this.controlsUpdateIfNeeded()
            }
        }


    }



    function generate(conId,id,t, x, y,z, width, height,backgroundColor, content, makerClass)
    {

        $('.page#page' + activePage + ' .content').append('<div id="' + conId + '" class="resizable elementContainer draggable" style="border:1px dashed black; position:absolute; left:' +
           x + 'px; top:' + y + 'px; width:' + width + 'px; height:' + height + 'px;   z-index:'+ z  +'">'

                    + ' <div class="blocker" style=" position:absolute;   width:100%; height:100%"> </div>'

                   + content


                   + ' </div>')

        // all elements have no border
       // $('#'+id).css('border-style','none')

        $('#' + id).data('background-color', backgroundColor)
        $('#'+ id ).css ('background-color', backgroundColor)

     //   alert (" border style "+ $('#'+id).css('border-style')+ " width "+$('#'+id).css('border-width')+" colour "+$('#'+id).css('border-color') )

        // blocker need to come after element to block youtube videos???
        // if blocker is tranparent makes difference rgba(255,0,0,0.5)
        // blocker needs to be done with image???

        //  alert (  typeof(t.initElement) )
        if (typeof (t.initElement) != "undefined") t.initElement(id)

       // widgetlist[tid]

       // alert ("typeid "+ makerClass.typeId )

        attachHandlers(conId, makerClass.typeId,t)




    }



    
    function CreateObject(pid,ptid,px,py,pz) {

        var id = pid
        var tid = ptid
        var x = px
        var y = py
        var z = pz



        this.action = function () {

            //alert ("create element id "+id+" of tid "+tid+" x "+x+" y "+y )

            var t = new widgetlist[tid](id,tid)

            var tc = widgetlist[tid]

            var conId = holderFromElement(id)

            //var e = new t()

           // alert(" (create object ) t id is " + t.message)

            generate(conId, id, t, x, y, z, tc.initialWidth, tc.initialHeight, '', t.createElement(), widgetlist[tid])

       


        },

        this.unaction = function () {

            var conId = holderFromElement(id)

            destroyElement(conId) 

   
        }


    }



    function destroyObjectEvent(pid) {

        var id = pid

       // alert(" destroy id " + id)

        var tid = createdElements[holderFromElement(id)]

       
        var jsonInfo = jsonObject( id ) 
         
       // alert(JSON.stringify(jsonInfo, null, 4))

       // alert (" destroy id "+id+" tid "+tid)
//
        this.action = function () {

         //   alert ("destroy action "+ id)

            destroyElement( holderFromElement(id) )

        },

        this.unaction = function () {
            //alert("destroy unaction ")


          //  alert(JSON.stringify(jsonInfo.extra, null, 4))

            var t = new widgetlist[ tid.getType() ](id,tid.getType() )
           // alert('json common z ' + jsonInfo.common.z)
              
            generate(holderFromElement(id), id, t,  jsonInfo.common.left  , 
                         jsonInfo.common.top, jsonInfo.common.z,
                         jsonInfo.common.width, jsonInfo.common.height,
                         jsonInfo.common.background_color,
                         t.createElement( jsonInfo.extra), widgetlist[tid.getType()] )

            
        }



    }


	 
	 function addUndoableEvent(id,pne)
    {

        var ne = new SharedPropEvent(id,  pne )

        ne.action()

        eventManager.addEvent(ne)

    }
	


    function attachHandlers(conId,widgetId, newControl)
    {


       var elementId = elementFromHolder( conId )

        $("#" + conId).draggable({

            start: function () {
                setAndUpdate(this);
                // remember initial position for undo
                var top = $(this).position().top;
                var left = $(this).position().left;
                $(this).data('orgTop', top);
                $(this).data('orgLeft', left);
            },

            drag: function () { setAndUpdate(this) },

            stop: function (e, ui) {
                var left = $(this).data('orgLeft')
                var top = $(this).data('orgTop')



                addUndoableEvent(elementId, [{ 'prop': 'left', 'ov': left, 'nv': $("#" + conId).css('left') },
                    { 'prop': 'top', 'ov': top, 'nv': $("#" + conId).css('top') }])

                //  alert ("left "+left+" top "+top) 

            }
        })


        $("#" + conId).resizable({
            start: function () {
                setAndUpdate(this);
                var width = $(this).css('width')
                var height = $(this).css('height');
                $(this).data('orgWidth', width);
                $(this).data('orgHeight', height);

            },
            resize: function () { setAndUpdate(this) },

            stop: function (e, ui) {
                var width = $(this).data('orgWidth')
                var height = $(this).data('orgHeight')


                addUndoableEvent(elementId, [{ 'prop': 'width', 'ov': width, 'nv': $("#" + conId).css('width') },
                    { 'prop': 'height', 'ov': height, 'nv': $("#" + conId).css('height') }])

                //  alert ("left "+left+" top "+top) 

            }



        })


        $('#' + conId).click(function () {
            setAndUpdate(this)
        })

        $('#' + conId).dblclick(function () {

            //alert("double click" + getNumberAtEnd($(this).attr('id') ))

            var cId = $(this).attr('id')
            var eId = 'element' + getNumberAtEnd(cId)


            var et = createdElements[cId]


            //  alert ("et is "+et)

            //alert( "element of type "+ widgetlist[et].disableDragOnDblClick) 

			//alert ( " et " + et.getType() )
            
            if (widgetlist[ et.getType() ].disableDragOnDblClick == true) {
                $("#" + cId).draggable({ disabled: true });
				
				// disable container is for some reason making it transparent need to change it
				$('#' + cId).css ('opacity','1')
				//$('#' + cId).css ('filter','')
				
				
                $("#" + cId + " .blocker").hide()

				
				if( typeof( et.wasDoubleClicked) !== 'undefined')  et.wasDoubleClicked() 
				
				/*
                // if user leaves make draggable again
                $("#" + eId).blur(function () {
                    // stupid bug
                     alert ("blur") 
                    $("#" + cId).draggable({ disabled: false })
                    $("#" + cId + " .blocker").show()

                    //alert("done") 
                })*/



            }


        })



        // refresh_attributes();

       // alert(" con id is " + conId + " widgetId " + widgetId + " createdElemnts length" + createdElements.length)
        createdElements[conId] = newControl


      //  alert(" (after) createdElements length" + createdElements.length)
    }



	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
     var elementNum = 0
	
	
	
	
	  function holderFromElement(id)
    {
        var num = getNumberAtEnd(id)
        var con = 'container'+num

        return con
    }


    function elementFromHolder(id)
    {
        var num = getNumberAtEnd(id)
        var ele = 'element' + num

        return ele
    }
	
	
	
	
    function getNumberAtEnd(s)
    {
        return parseInt(s.match(/\d+$/)[0], 10);
    }


    function setAndUpdate(e) {

        var id = $(e).attr('id')
        var num = getNumberAtEnd( id )
       
        //alert ("currentID "+currentID  )

		// if change in object selection
        if (currentID != '#' + 'element' + num) {

			// if old selected object already selected need to tell it that it has been unselected
			if(currentID != '') {
				var ocid = appGlobals.getCurrentSelected()
				var oc = createdElements[ holderFromElement( ocid ) ] 
				//alert ("old selection is "+ oc )
			
				if (  typeof ( oc.unselected ) !== 'undefined' )  {
					oc.unselected()
				}
				 
				 // if disableDragOnDblClick is true then user may have double clicked which would have disabled drag and blocker
				 // so need to re-enable them again 
				 
				// alert (" disableDragOnDblClick is "+ widgetlist[ oc.getType() ].disableDragOnDblClick  )       
				  
				if (  widgetlist[ oc.getType() ].disableDragOnDblClick  == true){ 
				    
					var cid = holderFromElement( ocid )
					// make draggable and enable blocker again
					$('#'+cid).draggable({ disabled: false })
					$('#'+cid+' .blocker').show()
				}
				
				
			}
		
		
            currentID = '#' + 'element' + num


            $("#widgetActions .actionsForWidget").hide()

            var t = createdElements[id]


        //    alert(" " + id + " number of created elements " + Object.keys(createdElements).length + " type " + t.getType() )



            //alert ( id )
            //alert ( " id is "+ id +" "+ createdElements[ id ] ) 

            var tw =  widgetlist[ t.getType()   ]
            
            var controlsId =  tw.actionsSectionId

            var selectionChanged = t.selectionChanged


             
       //     alert(" " + id + " number of created elements " + Object.keys(createdElements).length + " type " + t.getType() + " controlsId " + controlsId + " selectionchnaged " + selectionChanged)


            if (typeof (controlsId) != 'undefined') $("#widgetActions #" + controlsId).show()


            if (typeof (selectionChanged) != 'undefined') t.selectionChanged()


            //  $('#info_table td:contains(' + 'element' + num + ')').parent().addClass('activeRow').siblings().removeClass('activeRow');
            // alert( currentID )
           

           // alert ("changed selection") 
        }

        // this is outside the if bacause of drag calls this so needs to update
        refresh_attributes();

    }
	
	
	function setupSystem() {

	 //alert ( acceptlist )

	  $("#drop_area").droppable({
            accept: acceptlist,
            drop: function (event, ui) {

             //   alert ("dropping")

                //find the ID of dropped widget
                var widgetId = $(ui.draggable).attr("id");
              //  $('.page#page' + activePage + ' .content').css('display', 'block');


                var pos = $(ui.draggable).offset(), dPos = $(this).offset();

                var dTop = parseInt ( (event.pageY - $(this).offset().top) )

                var dLeft = parseInt((event.pageX - $(this).offset().left))

                var z = 1

                /*
                alert("nodeid: " + $(ui.draggable).data("noteid") +
                      ", ui Left: " + $(ui.draggable).offset().left +
                      ", ui Top: " + $(ui.draggable).offset().top + 
                      " this.left "+$(this).offset().left+
                      " this.top " +$(this).offset().top+
                      " e.pageX "+ event.pageX+
                      " e.pageY "+event.pageY+
                      " left "+dLeft+
                      " top "+dTop);   
                      */


				
                var t = widgetlist[widgetId]

                var conId = 'container'+ elementNum

                var elementId = 'element'+elementNum

				
                var ne = new CreateObject(elementId, widgetId, dLeft, dTop,z)
                
				
				ne.action()
				
                eventManager.addEvent ( ne )

                 

                // need to be after added item to createdElements 
                setAndUpdate($('#' + conId))
   

                elementNum++
				

            }
        }); //Close droppable function
	
	
	
		}
	
	
	
	 $(document).ready( function () {    
	 
		 $("#tabs").tabs();
                

                $('#backgroundColorEdit').ColorPicker({
                    onSubmit: function (hsb, hex, rgb, el) {
                        $(el).val(hex);
                        $(el).ColorPickerHide();
                       // currentBorderChange()
                        // alert (" hex "+ hex+" rgb "+rgb+" hsb "+hsb )
                          

                        addUndoableEvent(  cleanedUpCurrent()  , [{ 'prop': 'background-color', 'ov': $(currentID).data('background-color')
                                                        , 'nv': '#'+hex  } ] )
                       // alert ("hex "+hex)

                        //$(currentID).css('background-color', '#' + hex)
                       // $(currentID).data('myBackgroundColor', '#' + hex) 



                    },
                    onBeforeShow: function () {
                        $(this).ColorPickerSetColor(this.value);
                    }
                })
                .bind('keyup', function () {
                    $(this).ColorPickerSetColor(this.value);
                    //alert ("keyup")
                });
	 
	 
	 
	 }  )
	
	