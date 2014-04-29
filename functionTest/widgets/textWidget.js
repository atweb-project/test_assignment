
/* NOTES
The browser has its own undo list, when this control is active it has own undo/redo buttons controlled by the browser because of this text edit 
event don't get put in app event que. When double click to edit, the widget will remember the current html (in textbeforeEdit) and then when it 
is unselected the orignal content when double clicked and content now is compared, if there is a difference a text event is put in 
app undo que,(so there is 1 text edit generated when you unselect no matter how much you changed the text when it was selected) if edit text then delete element
the delete saves the current text so problems there

This text editor is based on a example from the mozilla website
https://developer.mozilla.org/en/docs/Rich-Text_Editing_in_Mozilla



*/

function TextWidget(pid, ptype) {


	MyWidget.call(this,pid,ptype)

	//var showHTML = false
	var oDoc
	var inEditingMode = false
	var textBeforeEdit = ''
	
	// tempText used to add text after content editable has been set so html code are not converted to &lt;
	var tempText =''
		// called to create object may or may nor have parameters ( parameters will be its own json )	
        this.createElement= function (param) {

            var text = 'text goes <i>here!</i>'

            if (typeof (param) !== 'undefined') {

                if (typeof (param.text) !== 'undefined') text = param.text

            }
 
			tempText = text  
         
            return '<div id="' + this.getId()  +  '" style="width:100%; height:100%" class="textEditBox" contenteditable="true"  ></div>'

        },
		
		this.initElement = function(param){
		
			 oDoc = document.getElementById( this.getId() );
			 this.setDocMode(true);
			 // text is set here so it will be not converted into &lt by setDocMode;
			 this.setHTML(tempText)	
		},
		
		
		this.formatDoc = function(sCmd, sValue) {
			document.execCommand(sCmd, false, sValue); oDoc.focus(); 
		},
		
		
		this.setDocMode = function(bToSource) {
		
			var oContent;
			if (bToSource) {
				oContent = document.createTextNode(oDoc.innerHTML);
				oDoc.innerHTML = "";
				var oPre = document.createElement("pre");
				oDoc.contentEditable = false;
				oPre.id = "sourceText"+this.getId() ;
				oPre.className ='sourceText'
				oPre.contentEditable = true;
				oPre.appendChild(oContent);
				oDoc.appendChild(oPre);
			} else {
			if (document.all) {
				oDoc.innerHTML = oDoc.innerText;
			} else {
				oContent = document.createRange();
				oContent.selectNodeContents(oDoc.firstChild);
				oDoc.innerHTML = oContent.toString();
			}
			oDoc.contentEditable = true;
			}
		oDoc.focus();
		},
		
		
		this.getHTML = function () {
		
			var t = $('#sourceText'+this.getId() )
			return t.html()
		
		},
		
		this.setHTML = function (html) {
		
			var t = $('#sourceText'+this.getId() )
			t.html(html)
			
		},
		
		this.wasDoubleClicked = function() {
		
			if(inEditingMode == false) {
				alert(inEditingMode)
				inEditingMode = true
			
				//alert ("i was double clicked")
				// remember text to see if changed later
			
				//alert (" was double clicked "+ this.getHTML() )
			
				textBeforeEdit = this.getHTML() 
		
				oDoc.focus();
				
			}
		
		}
		
		
		this.unselected = function () {
		
			if(inEditingMode == true) { 
				inEditingMode = false
			
				//alert ("unselected")
			
				if(textBeforeEdit != this.getHTML() ) {
					//alert ("TEXT CHANGED, was '"+textBeforeEdit+"' now is '"+ this.getHTML() ) 
			
					this.myRegisterUniquePropEvent( [{ 'prop': 'text', 'ov': textBeforeEdit, 'nv': this.getHTML() }])
      
				}
				//else alert ("nothing changed")
				
				$('#sourceText'+this.getId() ).blur() 
			}
			
		},
		
		// used to save info about the control
		// will be fed back to createElement
        this.createJSON = function() {
			
			//alert ( oDoc.innerText )
            return { 'text': this.getHTML() }

        },
        /*
        this.changeLabel= function() {
			// cannot just change value, things need to be recorded so can be undone
			// propChange will be called with the prop as parameter and that will do the changing
            this.myRegisterUniquePropEvent( [{ 'prop': 'text', 'ov': $('#' + this.getId()  ).html(), 'nv': $('#newButtonText').prop('value') }])
             
        }, */

        this.propChange= function (param) {
			// does not bother to check what the param is because there is only one param, see youtube control for more complex examples
			// param will be prop, value and  will be arrays
			//alert ( param[0].value )
			
           this.setHTML ( param[0].value )

        },

		// this is called when the control is selected or propChange is called on a selected object
        this.selectionChanged=function()  {

          //  alert(" button selection changed " + $(currentID).html())
 
            //$('#newButtonText').prop('value', $('#' + this.getId()  ).html())
              
         }
        
}


TextWidget.init = function () {

	$("#textMenu").append(" <div id='' style=''>"
	
+"<select onchange=\"appGlobals.currentObject().formatDoc('formatblock',this[this.selectedIndex].value);this.selectedIndex=0;\">"
+"<option selected>- formatting -</option>"
+"<option value=\"h1\">Title 1 &lt;h1&gt;</option>"
+"<option value=\"h2\">Title 2 &lt;h2&gt;</option>"
+"<option value=\"h3\">Title 3 &lt;h3&gt;</option>"
+"<option value=\"h4\">Title 4 &lt;h4&gt;</option>"
+"<option value=\"h5\">Title 5 &lt;h5&gt;</option>"
+"<option value=\"h6\">Subtitle &lt;h6&gt;</option>"
+"<option value=\"p\">Paragraph &lt;p&gt;</option>"
+"<option value=\"pre\">Preformatted &lt;pre&gt;</option>"
+"</select>"

+"<select onchange=\"appGlobals.currentObject().formatDoc('fontname',this[this.selectedIndex].value);this.selectedIndex=0;\">"
+"<option class=\"heading\" selected>- font -</option>"
+"<option>Arial</option>"
+"<option>Arial Black</option>"
+"<option>Courier New</option>"
+"<option>Times New Roman</option>"
+"</select>"
+"<select onchange=\"appGlobals.currentObject().formatDoc('fontsize',this[this.selectedIndex].value);this.selectedIndex=0;\">"
+"<option class=\"heading\" selected>- size -</option>"
+"<option value=\"1\">Very small</option>"
+"<option value=\"2\">A bit small</option>"
+"<option value=\"3\">Normal</option>"
+"<option value=\"4\">Medium-large</option>"
+"<option value=\"5\">Big</option>"
+"<option value=\"6\">Very big</option>"
+"<option value=\"7\">Maximum</option>"
+"</select>"
+"<select onchange=\"appGlobals.currentObject().formatDoc('forecolor',this[this.selectedIndex].value);this.selectedIndex=0;\">"
+"<option class=\"heading\" selected>- color -</option>"
+"<option value=\"red\">Red</option>"
+"<option value=\"blue\">Blue</option>"
+"<option value=\"green\">Green</option>"
+"<option value=\"black\">Black</option>"
+"</select>"
+"<select onchange=\"appGlobals.currentObject().formatDoc('backcolor',this[this.selectedIndex].value);this.selectedIndex=0;\">"
+"<option class=\"heading\" selected>- background -</option>"
+"<option value=\"red\">Red</option>"
+"<option value=\"green\">Green</option>"
+"<option value=\"black\">Black</option>"
+"</select>"
+"</div>" )



    $("#textMenu").append(' <div><img class="intLink" title="Undo" onclick="appGlobals.currentObject().formatDoc(\'undo\');" src="data:image/gif;base64,R0lGODlhFgAWAOMKADljwliE33mOrpGjuYKl8aezxqPD+7/I19DV3NHa7P///////////////////////yH5BAEKAA8ALAAAAAAWABYAAARR8MlJq7046807TkaYeJJBnES4EeUJvIGapWYAC0CsocQ7SDlWJkAkCA6ToMYWIARGQF3mRQVIEjkkSVLIbSfEwhdRIH4fh/DZMICe3/C4nBQBADs=" />'
+'<img class="intLink" title="Redo" onclick="appGlobals.currentObject().formatDoc(\'redo\');" src="data:image/gif;base64,R0lGODlhFgAWAMIHAB1ChDljwl9vj1iE34Kl8aPD+7/I1////yH5BAEKAAcALAAAAAAWABYAAANKeLrc/jDKSesyphi7SiEgsVXZEATDICqBVJjpqWZt9NaEDNbQK1wCQsxlYnxMAImhyDoFAElJasRRvAZVRqqQXUy7Cgx4TC6bswkAOw==" />'
+'<img class="intLink" title="Remove formatting" onclick="appGlobals.currentObject().formatDoc(\'removeFormat\')" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9oECQMCKPI8CIIAAAAIdEVYdENvbW1lbnQA9syWvwAAAuhJREFUOMtjYBgFxAB501ZWBvVaL2nHnlmk6mXCJbF69zU+Hz/9fB5O1lx+bg45qhl8/fYr5it3XrP/YWTUvvvk3VeqGXz70TvbJy8+Wv39+2/Hz19/mGwjZzuTYjALuoBv9jImaXHeyD3H7kU8fPj2ICML8z92dlbtMzdeiG3fco7J08foH1kurkm3E9iw54YvKwuTuom+LPt/BgbWf3//sf37/1/c02cCG1lB8f//f95DZx74MTMzshhoSm6szrQ/a6Ir/Z2RkfEjBxuLYFpDiDi6Af///2ckaHBp7+7wmavP5n76+P2ClrLIYl8H9W36auJCbCxM4szMTJac7Kza////R3H1w2cfWAgafPbqs5g7D95++/P1B4+ECK8tAwMDw/1H7159+/7r7ZcvPz4fOHbzEwMDwx8GBgaGnNatfHZx8zqrJ+4VJBh5CQEGOySEua/v3n7hXmqI8WUGBgYGL3vVG7fuPK3i5GD9/fja7ZsMDAzMG/Ze52mZeSj4yu1XEq/ff7W5dvfVAS1lsXc4Db7z8C3r8p7Qjf///2dnZGxlqJuyr3rPqQd/Hhyu7oSpYWScylDQsd3kzvnH738wMDzj5GBN1VIWW4c3KDon7VOvm7S3paB9u5qsU5/x5KUnlY+eexQbkLNsErK61+++VnAJcfkyMTIwffj0QwZbJDKjcETs1Y8evyd48toz8y/ffzv//vPP4veffxpX77z6l5JewHPu8MqTDAwMDLzyrjb/mZm0JcT5Lj+89+Ybm6zz95oMh7s4XbygN3Sluq4Mj5K8iKMgP4f0////fv77//8nLy+7MCcXmyYDAwODS9jM9tcvPypd35pne3ljdjvj26+H2dhYpuENikgfvQeXNmSl3tqepxXsqhXPyc666s+fv1fMdKR3TK72zpix8nTc7bdfhfkEeVbC9KhbK/9iYWHiErbu6MWbY/7//8/4//9/pgOnH6jGVazvFDRtq2VgiBIZrUTIBgCk+ivHvuEKwAAAAABJRU5ErkJggg==">'
+'<img class="intLink" title="Bold" onclick="appGlobals.currentObject().formatDoc(\'bold\');" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAInhI+pa+H9mJy0LhdgtrxzDG5WGFVk6aXqyk6Y9kXvKKNuLbb6zgMFADs=" />'
+'<img class="intLink" title="Italic" onclick="appGlobals.currentObject().formatDoc(\'italic\');" src="data:image/gif;base64,R0lGODlhFgAWAKEDAAAAAF9vj5WIbf///yH5BAEAAAMALAAAAAAWABYAAAIjnI+py+0Po5x0gXvruEKHrF2BB1YiCWgbMFIYpsbyTNd2UwAAOw==" />'
+'<img class="intLink" title="Underline" onclick="appGlobals.currentObject().formatDoc(\'underline\');" src="data:image/gif;base64,R0lGODlhFgAWAKECAAAAAF9vj////////yH5BAEAAAIALAAAAAAWABYAAAIrlI+py+0Po5zUgAsEzvEeL4Ea15EiJJ5PSqJmuwKBEKgxVuXWtun+DwxCCgA7" />'
+'<img class="intLink" title="Left align" onclick="appGlobals.currentObject().formatDoc(\'justifyleft\');" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JMGELkGYxo+qzl4nKyXAAAOw==" />'
+'<img class="intLink" title="Center align" onclick="appGlobals.currentObject().formatDoc(\'justifycenter\');" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIfhI+py+0Po5y02ouz3jL4D4JOGI7kaZ5Bqn4sycVbAQA7" />'
+'<img class="intLink" title="Right align" onclick="appGlobals.currentObject().formatDoc(\'justifyright\');" src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JQGDLkGYxouqzl43JyVgAAOw==" />'
+'<img class="intLink" title="Numbered list" onclick="appGlobals.currentObject().formatDoc(\'insertorderedlist\');" src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAADljwliE35GjuaezxtHa7P///////yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKSespwjoRFvggCBUBoTFBeq6QIAysQnRHaEOzyaZ07Lu9lUBnC0UGQU1K52s6n5oEADs=" />'
+'<img class="intLink" title="Dotted list" onclick="appGlobals.currentObject().formatDoc(\'insertunorderedlist\');" src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAAB1ChF9vj1iE33mOrqezxv///////yH5BAEAAAcALAAAAAAWABYAAAMyeLrc/jDKSesppNhGRlBAKIZRERBbqm6YtnbfMY7lud64UwiuKnigGQliQuWOyKQykgAAOw==" />'
+'<img class="intLink" title="Quote" onclick="appGlobals.currentObject().formatDoc(\'formatblock\',\'blockquote\');" src="data:image/gif;base64,R0lGODlhFgAWAIQXAC1NqjFRjkBgmT9nqUJnsk9xrFJ7u2R9qmKBt1iGzHmOrm6Sz4OXw3Odz4Cl2ZSnw6KxyqO306K63bG70bTB0rDI3bvI4P///////////////////////////////////yH5BAEKAB8ALAAAAAAWABYAAAVP4CeOZGmeaKqubEs2CekkErvEI1zZuOgYFlakECEZFi0GgTGKEBATFmJAVXweVOoKEQgABB9IQDCmrLpjETrQQlhHjINrTq/b7/i8fp8PAQA7" />'
+'<img class="intLink" title="Add indentation" onclick="appGlobals.currentObject().formatDoc(\'outdent\');" src="data:image/gif;base64,R0lGODlhFgAWAMIHAAAAADljwliE35GjuaezxtDV3NHa7P///yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKCQG9F2i7u8agQgyK1z2EIBil+TWqEMxhMczsYVJ3e4ahk+sFnAgtxSQDqWw6n5cEADs=" />'
+'<img class="intLink" title="Delete indentation" onclick="appGlobals.currentObject().formatDoc(\'indent\');" src="data:image/gif;base64,R0lGODlhFgAWAOMIAAAAADljwl9vj1iE35GjuaezxtDV3NHa7P///////////////////////////////yH5BAEAAAgALAAAAAAWABYAAAQ7EMlJq704650B/x8gemMpgugwHJNZXodKsO5oqUOgo5KhBwWESyMQsCRDHu9VOyk5TM9zSpFSr9gsJwIAOw==" />'
+"<img class='intLink' title='Hyperlink' onclick='var sLnk=prompt(\'Write the URL here\',\'http:\/\/\');if(sLnk&&sLnk!=''&&sLnk!=\'http://\'){appGlobals.currentObject().formatDoc(\'createlink\',sLnk)}' src='data:image/gif;base64,R0lGODlhFgAWAOMKAB1ChDRLY19vj3mOrpGjuaezxrCztb/I19Ha7Pv8/f///////////////////////yH5BAEKAA8ALAAAAAAWABYAAARY8MlJq7046827/2BYIQVhHg9pEgVGIklyDEUBy/RlE4FQF4dCj2AQXAiJQDCWQCAEBwIioEMQBgSAFhDAGghGi9XgHAhMNoSZgJkJei33UESv2+/4vD4TAQA7' />"
+'<img class="intLink" title="Cut" onclick="appGlobals.currentObject().formatDoc(\'cut\');" src="data:image/gif;base64,R0lGODlhFgAWAIQSAB1ChBFNsRJTySJYwjljwkxwl19vj1dusYODhl6MnHmOrpqbmpGjuaezxrCztcDCxL/I18rL1P///////////////////////////////////////////////////////yH5BAEAAB8ALAAAAAAWABYAAAVu4CeOZGmeaKqubDs6TNnEbGNApNG0kbGMi5trwcA9GArXh+FAfBAw5UexUDAQESkRsfhJPwaH4YsEGAAJGisRGAQY7UCC9ZAXBB+74LGCRxIEHwAHdWooDgGJcwpxDisQBQRjIgkDCVlfmZqbmiEAOw==" />'
+'<img class="intLink" title="Copy" onclick="appGlobals.currentObject().formatDoc(\'copy\');" src="data:image/gif;base64,R0lGODlhFgAWAIQcAB1ChBFNsTRLYyJYwjljwl9vj1iE31iGzF6MnHWX9HOdz5GjuYCl2YKl8ZOt4qezxqK63aK/9KPD+7DI3b/I17LM/MrL1MLY9NHa7OPs++bx/Pv8/f///////////////yH5BAEAAB8ALAAAAAAWABYAAAWG4CeOZGmeaKqubOum1SQ/kPVOW749BeVSus2CgrCxHptLBbOQxCSNCCaF1GUqwQbBd0JGJAyGJJiobE+LnCaDcXAaEoxhQACgNw0FQx9kP+wmaRgYFBQNeAoGihCAJQsCkJAKOhgXEw8BLQYciooHf5o7EA+kC40qBKkAAAGrpy+wsbKzIiEAOw==" />'
+'<img class="intLink" title="Paste" onclick="appGlobals.currentObject().formatDoc(\'paste\');" src="data:image/gif;base64,R0lGODlhFgAWAIQUAD04KTRLY2tXQF9vj414WZWIbXmOrpqbmpGjudClFaezxsa0cb/I1+3YitHa7PrkIPHvbuPs+/fvrvv8/f///////////////////////////////////////////////yH5BAEAAB8ALAAAAAAWABYAAAWN4CeOZGmeaKqubGsusPvBSyFJjVDs6nJLB0khR4AkBCmfsCGBQAoCwjF5gwquVykSFbwZE+AwIBV0GhFog2EwIDchjwRiQo9E2Fx4XD5R+B0DDAEnBXBhBhN2DgwDAQFjJYVhCQYRfgoIDGiQJAWTCQMRiwwMfgicnVcAAAMOaK+bLAOrtLUyt7i5uiUhADs=" /> </div>'
    )
}

TextWidget.buttomImage = 'images/input-box.png' // image used in the widget list
TextWidget.typeId= 'Text'
TextWidget.myClass= 'textWidget'
TextWidget.initialWidth='100' // the initial width of the object when made
TextWidget.initialHeight= '100' // the initial height of the object when made
TextWidget.actionsSectionId='textMenu'	// unique name of the container	used to hold controls 

TextWidget.disableDragOnDblClick = true   




