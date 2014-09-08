
/*
 * Qr Code and 1d(barcode) Widget
 */

function QrCodeWidget (pid, ptype)
{
       
     MyWidget.call(this,pid,ptype) 
     
     var QRPlugin = "qrcode"
              
      //QR code plugin
    	var TypeQrcode = "text"
     	var QrcodeText = 'This is the text to embed'
     	var NumBer = '6957218212'
     	var EmaIL = 'dikostaras@yahoo.gr'
     	var SuBject = 'this is the subject to embed'
     	var Latitude = '51.5286416'
     	var Longitude = '-0.1015987'
     	var AddRess = '1st Floor, Elizabeth House, York Road, London, SE1 7NQ, United Kingdom'
     	var NaMe = 'Inspired Mobile'
     	var url = "http://inspired-mobile.com/"
     
     //Barcode plugin
     	var BarcodeNumber = '1234567890128'
       	
       // alert (" this.id is "+ this.getId() )
        this.createElement = function (param) {
    	             
            if( typeof(param) !== 'undefined') {
            	
            	if( typeof (param.QRPlugin) !== 'undefined') QRPlugin = param.QRPlugin
            	
            	if( typeof (param.TypeQrcode) !== 'undefined') TypeQrcode = param.TypeQrcode
            	
            	if( typeof (param.QrcodeText) !== 'undefined') QrcodeText = param.QrcodeText
            	
            	if( typeof (param.NumBer) !== 'undefined') NumBer = param.NumBer
            	
            	if( typeof (param.EmaIL) !== 'undefined') EmaIL = param.EmaIL
            	
            	if( typeof (param.SuBject) !== 'undefined') SuBject = param.SuBject
            	
            	if( typeof (param.Latitude) !== 'undefined') Latitude = param.Latitude
            	
            	if( typeof (param.Longitude) !== 'undefined') Longitude = param.Longitude
            	
            	if (typeof (param.AddRess) !== 'undefined') AddRess = param.AddRess
            	
            	if (typeof (param.NaMe) !== 'undefined') NaMe = param.NaMe

                if ( typeof (param.url) !== 'undefined') url = param.url

                if (typeof (param.BarcodeNumber) !== 'undefined') BarcodeNumber = param.BarcodeNumber

                //alert(" param.url "+param.url+"  param.allowFullscreen " + param.allowFullscreen + " number of params " + param.length)
                	alert(QRPlugin)
             }
            

            return '<div id="' + this.getId() + '">'+
            		'<div  id="qr-' + this.getId() + '" class="code" style="width:100%; height:100%;"></div>'+
            		'<iframe width="100%" id="barcode-' + this.getId() + '" height="100%" style="display:none;" src="qrcode/1dWidget.html" scrolling="no" frameborder="0" allowTransparency="true" barcodenumber="'+BarcodeNumber+'"></iframe></div>'
       
        },

        this.propChange = function (param) {


            for (var i = 0; i < param.length; i++) {
            	
            	if (param[i].prop == 'QRPlugin') QRPlugin =  param[i].value
            	
            	if (param[i].prop == 'TypeQrcode') TypeQrcode =  param[i].value
            	
            	if (param[i].prop == 'QrcodeText') QrcodeText =  param[i].value
            	
            	if (param[i].prop == 'NumBer') NumBer = param[i].value
            	
            	if( param[i].prop == 'EmaIL' ) EmaIL = param[i].value
            	
            	if( param[i].prop == 'SuBject' ) SuBject = param[i].value
            	
            	if( param[i].prop == 'Latitude' ) Latitude = param[i].value
            	
            	if( param[i].prop == 'Longitude' ) Longitude = param[i].value
            	
            	if( param[i].prop == 'AddRess' ) AddRess = param[i].value
            	
            	if( param[i].prop == 'NaMe' ) NaMe = param[i].value

                if (param[i].prop == 'url') url =  param[i].value 
                  
                if (param[i].prop == 'BarcodeNumber') BarcodeNumber = param[i].value

            }
                        
            if ( QRPlugin == 'barcode' ) {
            	
            	$('#barcode-' + this.getId()).attr('barcodenumber', BarcodeNumber)
            	
            	$('#barcode-' + this.getId()).attr( 'src', function ( i, val ) { return val; })
            }

        },

       this.selectionChanged = function()  {

            //alert (" button selection changed")
        	
        	$('#codetype').prop('value', QRPlugin )
        	
        	$('#qrtype').prop('value', TypeQrcode )
        	
        	$('#newqrText').prop('value', QrcodeText )
        	
        	$('#number').prop('value', NumBer )
        	
        	$('#emailText').prop('value', EmaIL )
        	
        	$('#subjectText').prop('value', SuBject )
        	
        	$('#latitude').prop('value', Latitude )
        	
        	$('#longitude').prop('value', Longitude )
        	
        	$('#address').prop('value', AddRess )
        	
        	$('#name').prop('value', NaMe )

            $('#newURLText').prop('value', url )
            
            $('#barcodenumber').prop('value', BarcodeNumber )
            
            if (QRPlugin === 'qrcode') {
            	
            	$('#qroption').show()
                
            	$('#qr-' + this.getId()).show()
            	
            	$('#barcode-' + this.getId()).hide()
            	
            	$('#barcode').hide()
            }   
            if (QRPlugin === 'barcode') {
            	
            	$('#qroption').hide()
                
            	$('#qr-' + this.getId()).hide()
            	
            	$('#barcode-' + this.getId()).show()
            	
            	$('#barcode').show()
            }
                   // alert(TypeQrcode)
       },

       this.initElement = function()
       {
    	  // if ((appGlobals.isInDesignMode() == false))
    	       	   
    	   if (QRPlugin === 'qrcode') {
    		   
    	   $('#barcode-' + this.getId()).hide()  
    	     	   
    	   $('#qr-' + this.getId()).ClassyQR({
    		    create: true,
    		    type: TypeQrcode,
    		    text: QrcodeText,
    		    number: NumBer,
    		    email: EmaIL,
    		    subject: SuBject,
    		    latitude: Latitude,
    		    longitude: Longitude,
    		    address: AddRess,
    		    name: NaMe,
    		    url: url
    		});  
    	   
    	   }
    	   
    	   if (QRPlugin === 'barcode') {
    		 
    		   $('#barcode-' + this.getId()).show()
    		   
    		   $('#qr-' + this.getId()).hide()
    	   }
    	   
    	   //alert(QRPlugin)
            	
       },
       
       this.getCodeType = function ()
       {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'QRPlugin', 'ov': QRPlugin, 'nv': $('#codetype').prop('value') }])

       },
       
       this.getQrType = function ()
       {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'TypeQrcode', 'ov': TypeQrcode, 'nv': $('#qrtype').prop('value') }])

       },
       
       this.changeLabel = function()
       {
    	   this.myRegisterUniquePropEvent(  [{ 'prop': 'QrcodeText', 'ov': QrcodeText, 'nv': $('#newqrText').prop('value') }])
       },
        
       this.changeURL = function ()
       {
            this.myRegisterUniquePropEvent(  [{ 'prop': 'url', 'ov': url, 'nv': $('#newURLText').prop('value') }])

       },

       this.getNumber = function()
       {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'NumBer', 'ov': NumBer, 'nv': $('#number').prop('value') }])

       },
        
       this.getEmail = function()
       {
        	this.myRegisterUniquePropEvent(  [{ 'prop': 'EmaIL', 'ov': EmaIL, 'nv': $('#emailText').prop('value') }])

       },

        this.getEmailSubject = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'SuBject', 'ov': SuBject, 'nv': $('#subjectText').prop('checked') }])

        },
        
        this.getLatitude = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'Latitude', 'ov': Latitude, 'nv': $('#latitude').prop('value') }])

        },
        
        this.getLongitude = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'Longitude', 'ov': Longitude, 'nv': $('#longitude').prop('value') }])

        },
        
        this.getAddress = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'AddRess', 'ov': AddRess, 'nv': $('#address').prop('value') }])

        },
        
        this.getName = function ()
        {

            this.myRegisterUniquePropEvent(  [{ 'prop': 'NaMe', 'ov': NaMe, 'nv': $('#name').prop('value') }])

        },

        this.getBarcodenumber = function ()
        {
             
            this.myRegisterUniquePropEvent(  [{ 'prop': 'BarcodeNumber', 'ov': BarcodeNumber, 'nv': $('#barcodenumber').prop('value') }])

        },
         
       this.createJSON = function () {
         

				 return {
					'QRPlugin' : QRPlugin,
					'TypeQrcode' : TypeQrcode,
					'QrcodeText' : QrcodeText,
					'NumBer' : NumBer,
					'EmaIL' : EmaIL,
					'SuBject' : SuBject,
					'url' : url,
					'Latitude' : Latitude,
					'Longitude' : Longitude,
					'AddRess' : AddRess,
					'NaMe' : NaMe,
					'BarcodeNumber' : BarcodeNumber
				} 
        }
        


    }
   

QrCodeWidget.buttomImage= 'images/button_icon.png'
QrCodeWidget.typeId= 'qr-1dcode'
QrCodeWidget.myClass= 'widget_qrcode'
QrCodeWidget.initialWidth= '230'
QrCodeWidget.initialHeight= '230'
QrCodeWidget.actionsSectionId= 'qrcodeMenu'


QrCodeWidget.init = function () {
	
	$("#qrcodeMenu").append(
			"<div id='choosecode'>Choose the type of code<select id='codetype' onchange='appGlobals.currentObject().getCodeType()'>"+
			"<option value='qrcode'>QR</option>"+
			"<option value='barcode'>Barcode</option>"+
			"</select></div>")
	
	$("#qrcodeMenu").append(
			"<div id='qroption'>Choose the type of qr code<select id='qrtype' onchange='appGlobals.currentObject().getQrType()'>"+
			"<option value='text'>Text</option>"+
			"<option value='email'>Email</option>"+
			"<option value='location'>Location</option>"+
			"<option value='sms'>Sms</option>"+
			"<option value='call'>Call</option>"+
			"<option value='url'>Url</option>"+
			"<option value='wifi'>Wifi</option>"+
			"<option value='contact'>Contact</option>"+
			"</select><br>"+
			
			"Text:<input type='text' id='newqrText'><button onclick='appGlobals.currentObject().changeLabel()'>Update</button>"+
			
			"<br>Number:<br><input type='number' id='number'><br><button onclick='appGlobals.currentObject().changeNumber()'>Update</button>"+
			
			"<br>Email:<input type='email' id='emailText'><button onclick='appGlobals.currentObject().getEmail()'>Update</button>"+
			
			"<br>Email Subject:<input type='text' id='subjectText'><button onclick='appGlobals.currentObject().getEmailSubject()'>Update</button>"+
			
			"<br>Latitude:<br><input type='number' id='latitude'><br><button onclick='appGlobals.currentObject().getLatitude()'>Update</button>"+
			
			"<br>Longitude:<br><input type='number' id='longitude'><br><button onclick='appGlobals.currentObject().getLongitude()'>Update</button>"+
			
			"<br>Address:<input type='text' id='address'><button onclick='appGlobals.currentObject().getAddress()'>Update</button>"+
			
			"<br>Name:<input type='text' id='name'><button onclick='appGlobals.currentObject().getName()'>Update</button>"+
			
			"<br>URL<input type='text' id='newURLText'><button onclick='appGlobals.currentObject().changeURL()'>Update</button></div>")
    
   $("#qrcodeMenu").append("<div id='barcode'>Barcode Number:<br><input type='number' id='barcodenumber'><br><button onclick='appGlobals.currentObject().getBarcodenumber()'>Update</button></div>")		
    
}

