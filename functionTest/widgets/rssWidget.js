

    
    function RssWidget (pid, ptype ){

        
        MyWidget.call(this, pid, ptype)

        var url = "http://feeds.reuters.com/reuters/oddlyEnoughNews"
        var Limit = 3
        var offSet = 1
        var rssDate = true
        var Content = true
        var sniPpet = true
        var Media = true
        var sortAsc = true
        var animationValue = $('#animation').prop('value')

        this.createElement= function (param) {

            if (typeof (param) !== 'undefined') {

                if (typeof (param.url) !== 'undefined') url = param.url
                
                if (typeof (param.Limit) !== 'undefined') Limit = param.Limit
                
                if (typeof (param.offSet) !== 'undefined') offSet = param.offSet
                
                if (typeof (param.rssDate) !== 'undefined') rssDate = param.rssDate
                
                if (typeof (param.Content) !== 'undefined') Content = param.Content
                
                if (typeof (param.sniPpet) !== 'undefined') sniPpet = param.sniPpet
                
                if (typeof (param.Media) !== 'undefined') Media = param.Media
                
                if (typeof (param.sortAsc) !== 'undefined') sortAsc = param.sortAsc

            }

           
            return '<div id="' + this.getId()  +  '" style="width:100%; height:100%"></div>'

        },
        
        this.initElement = function(param) {
			
        	var selector = '#'+ this.getId() + ' ul'
        	var animationValue = $('#animation').prop('value') //choose animation value in order to choose rss animations
        	//alert(animationValue);
        	
        	switch (animationValue) { 
		     case '1' : 

		    	 $('#'+ this.getId() ).rssfeed(url,{
		    		 	limit: Limit,
		        		offset: offSet,
		        		header: false,
		        		titletag: 'div',
		        		date: rssDate == true ? 1 : 0,
		        		content: Content  == true ? 1 : 0,
		        		snippet: sniPpet == true ? 1 : 0,
		        		media: Media == true ? 1 : 0,
		        		sort: 'date',
		        		sortasc: sortAsc == true ? 1 : 0
		        		}, function(e){
		        			
		        			  $.zazar.ticker({selector: selector}) 
		        		});
		    	 
		         break;
		     case '2' : 
		    	 
		    	 $('#'+ this.getId() ).rssfeed(url,{
		    		 	limit: Limit,
		        		offset: offSet,
		        		header: false,
		        		titletag: 'div',
		        		date: rssDate == true ? 1 : 0,
		        		content: Content  == true ? 1 : 0,
		        		snippet: sniPpet == true ? 1 : 0,
		        		media: Media == true ? 1 : 0,
		        		sort: 'date',
		        		sortasc: sortAsc == true ? 1 : 0
		        		}, function(e){
		        			
		        			  $.zazar.slider({selector: selector}) 
		        		});
			 
		         break;
		     case '3' : 
		    	 
		    	 $('#'+ this.getId() ).rssfeed(url,{
		    		 	limit: Limit,
		        		offset: offSet,
		        		header: false,
		        		titletag: 'div',
		        		date: rssDate == true ? 1 : 0,
		        		content: Content  == true ? 1 : 0,
		        		snippet: sniPpet == true ? 1 : 0,
		        		media: Media == true ? 1 : 0,
		        		sort: 'date',
		        		sortasc: sortAsc == true ? 1 : 0
		        		}, function(e){
		        			
		        			  $.zazar.rotate({selector: selector}) 
		        		});
			
		         break;      
		     default:
		    	 $('#'+ this.getId() ).rssfeed(url,{
		        		limit: Limit,
		        		offset: offSet,
		        		header: false,
		        		titletag: 'div',
		        		date: rssDate == true ? 1 : 0,
		        		content: Content  == true ? 1 : 0,
		        		snippet: sniPpet == true ? 1 : 0,
		        		media: Media == true ? 1 : 0,
		        		sort: 'date',
		        		sortasc: sortAsc == true ? 1 : 0
		        		});
		         
        	}

        },
        
        this.getAnimationValue = function() {

        	//alert('change')
        	var newValue = $('#animation').prop('value')
        	//alert(animationValue)
        	//alert(newValue)
        	
        	this.myRegisterUniquePropEvent( [{ 'prop': 'animationValue', 'ov': animationValue, 'nv': newValue }])
        	
        	if ((appGlobals.isInDesignMode() == false))
        	this.initElement()
        	
        	
        	
        },
        
        this.propChange= function (param) {
        	
        	

        	for (var i = 0; i < param.length; i++) {

				if (param[i].prop == 'url') url = param[i].value
				
				if (param[i].prop == 'Limit') Limit = param[i].value
				
				if (param[i].prop == 'offSet') offSet = param[i].value

				if (param[i].prop == 'rssDate') rssDate = param[i].value
				
				if (param[i].prop == 'Content') Content = param[i].value
				
				if (param[i].prop == 'sniPpet') sniPpet = param[i].value
				
				if (param[i].prop == 'Media') Media = param[i].value

				if (param[i].prop == 'sortAsc') sortAsc = param[i].value
				
				if (param[i].prop == 'animationValue') animationValue = param[i].value


			}

         },
        
        this.changeURL= function()
         {

            this.myRegisterUniquePropEvent( [{ 'prop': 'url', 'ov': url, 'nv': $('#newurl').prop('value') }])
             
        },
        
        this.changeFeedlimit = function () {

               var ns = $('#feedNumber').spinner( "value" )

               if (ns != null || ns != 0) {

                   this.myRegisterUniquePropEvent(  [{ 'prop': 'Limit', 'ov': Limit, 'nv': ns }])

               } 
               else {

                   alert ("Numbers only and after the number 1")
               }


        },
        
        this.changeoffSet = function () {

            var ns = $('#offSet').spinner( "value" )

            if (ns != null || ns != 0) {

                this.myRegisterUniquePropEvent(  [{ 'prop': 'offSet', 'ov': offSet, 'nv': ns }])

            } 
            else {

                alert ("Numbers only and after the number 1")
            }


        },
        
        this.choiceOfDate = function() {

			this.myRegisterUniquePropEvent([ {'prop' : 'rssDate', 'ov' : rssDate, 'nv' : $('#rssDate').prop('checked')} ])

		},
		
		this.choiceOfContent = function() {

			this.myRegisterUniquePropEvent([ {'prop' : 'Content', 'ov' : Content, 'nv' : $('#Content').prop('checked')} ])

		},
		
		this.choiceOfsniPpet = function() {

			this.myRegisterUniquePropEvent([ {'prop' : 'sniPpet', 'ov' : sniPpet, 'nv' : $('#sniPpet').prop('checked')} ])

		},
		
		this.choiceOfMedia = function() {

			this.myRegisterUniquePropEvent([ {'prop' : 'Media', 'ov' : Media, 'nv' : $('#Media').prop('checked')} ])

		},
		
		this.choiceOfsortAsc = function() {

			this.myRegisterUniquePropEvent([ {'prop' : 'sortAsc', 'ov' : sortAsc, 'nv' : $('#sortAsc').prop('checked')} ])

		},


        this.selectionChanged=function()  {
        	
        	$('#newurl').prop('value', url)

        	$('#feedNumber').spinner('value', Limit)
        	
        	$('#offSet').spinner('value', offSet)
        	
        	$('#rssDate').prop('checked', rssDate)
        	
        	$('#Content').prop('checked', Content)
        	
        	$('#sniPpet').prop('checked', sniPpet)
        	
        	$('#Media').prop('checked', Media)
        	
        	$('#sortAsc').prop('checked', sortAsc)
        	
        	$('#animation').prop('value', animationValue)
        	
        	

        },
         
        this.createJSON = function() {

             return { 'url': url, 'Limit': Limit, 'offSet': offSet, 'rssDate': rssDate, 'Content': Content, 'sniPpet': sniPpet, 'Media': Media, 'sortAsc': sortAsc, 'animationValue': animationValue }

         }
        
    }

// static variables/functions

    RssWidget.init = function () {
    $("#rssMenu").append("Rss URL<br><input type='text' id='newurl'><button onclick='appGlobals.currentObject().changeURL()'>Update</button>")
    $("#rssMenu").append("<br>Number of feeds to return<input type='edit' id='feedNumber' name='feedNumber' value='3' >")
    $("#feedNumber").spinner({ min: 1, max: 100, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeFeedlimit() } });
    $("#rssMenu").append("<br>Feed item to start<input type='edit' id='offSet' name='offSet' value='1' >")
    $("#offSet").spinner({ min: 1, max: 100, change: function (event, ui) { if (event.originalEvent) appGlobals.currentObject().changeoffSet() } });
    $("#rssMenu").append("<br>Include date<input type='checkbox' id='rssDate' name='rssDate' value='rssDate' onclick='appGlobals.currentObject().choiceOfDate()'>")
    $("#rssMenu").append("<br>Show content<input type='checkbox' id='Content' name='Content' value='Content' onclick='appGlobals.currentObject().choiceOfContent()'>")
    $("#rssMenu").append("<br>Show a short description<input type='checkbox' id='sniPpet' name='sniPpet' value='sniPpet' onclick='appGlobals.currentObject().choiceOfsniPpet()'>")
    $("#rssMenu").append("<br>Display media files(when available)<input type='checkbox' id='Media' name='Media' value='Media' onclick='appGlobals.currentObject().choiceOfMedia()'>")
    $("#rssMenu").append("<br>Sorting(ascending or descending by date)<input type='checkbox' id='sortAsc' name='sortAsc' value='sortAsc' onclick='appGlobals.currentObject().choiceOfsortAsc()'>")
    $("#rssMenu").append("<div>Rss Animations<select id='animation' onchange='appGlobals.currentObject().getAnimationValue()'>"+
    		"<option>Choose feed animation</option>"+
    		"<option value='1'>Ticker</option>"+
    		"<option value='2'>Slider</option>"+
    		"<option value='3'>Rotate</option>"+
    		"</select></div>")
}
RssWidget.buttomImage='images/button_icon.png'
RssWidget.typeId= 'rss'
RssWidget.myClass= 'widget_rss'
RssWidget.initialWidth='500'
RssWidget.initialHeight= '350'
RssWidget.actionsSectionId='rssMenu'
