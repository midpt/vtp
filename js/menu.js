var maxHeight = 400;

//----------------------------------------------
//---When  tag Dropdown box is selected---
function getTag(){
   //---not sure why, there is a hidden <span class="MenuTag">  which will display
   // selected Tag. So have to ensure that is no span html text   
//   $("span.MenuTag").html("");
//   $('span.MenuTag').css('visibility','hidden');
   
  var selEle=document.getElementById("MenuTag");
  var selText=selEle.options[selEle.selectedIndex].text
  //selEle.value;
	selTag=selEle.value;  // eg  All, True Parents,   Prison ...
	//selTag=selTag.replace(" ","_");//  eg Home Church becomes  Home_Church;  True Parents becomes True_Parents
	//selTag=selTag.replace("_"," ");//Replace only ONE time.  eg Home Church becomes  Home_Church;  True Parents becomes True_Parents
	selTag=selTag.replaceAll("_"," ");//  eg Home Church becomes  Home_Church;  True Parents becomes True_Parents
     //alert(selTag);
      console.log("Ater replacing _ with space. selTag="+selTag);	 
	 
					var canvas = document.getElementById("panel");
					var ctx = canvas.getContext("2d");
					var textSize=24;
                 curTag=selTag; 
		         wdInCurTag=[];
		         setImgInCurTag=[];	
				 
				 
            //---loop thru ALL the WORDS ----
       if (selTag !="All"){			
			for (ix = 0; ix < AllWds.length; ix++) {
				//console.log(AllWds[index]);
			  	  gtWd=AllWds[ix]	
				  curSetImg=AllSetImg[ix];			  
				 if (gtWd.search(new RegExp(curTag, "i")) !=-1) {
					 //---window[] is a built-in  javascript array obj 
					 //  which allows you to reference an array by a variable which is 'curTagWds'
//console.log("curTagWds="+curTagWds+"  curSetImgAry="+curSetImgAry)
                     //---gather all found tag in current Words to array wdInCurTag
					 wdInCurTag.push(gtWd); //  
					 setImgInCurTag.push(curSetImg); // gather the found tag Excel Setimg to array setImgInCurTag
//if (curSetImgAry==="TearsSetImg"){console.log("===="+resn+ "  TearsSetImg.length="+TearsSetImg.length+" TearsSetImg[]="+TearsSetImg[TearsSetImg.length-1]+"  At TearsSetImg[0]="+TearsSetImg[0]);resn++;}					 
					 
				 }						
					
			};//------------end for loop ----		
	   }else{
 	     //---duplicate arrays ----
		 wdInCurTag=AllWds.slice(0); //  
		 setImgInCurTag=AllSetImg.slice(0);          
       }	   
                  // var getWdInx; 
					var imgRdom=Math.floor(Math.random() * imgRndUpper) + 0 ;  // generate 0 to 19
					//totalTFWords=AllWds.length-1;
					//---when first startup, selTag="All"
		//			curSelTagWds=selTag+"Wds"; // curSelTagWds maybe  Home_ChurchWds, True_ParentsWds...
		//			curSelTagSetImg=selTag+"SetImg";
					//---note window[] is js built array which allows you to call an array using variable selTagWds
//				console.log("curSelTagWds="+curSelTagWds);	
  
				//	curSelTagTotal=window[curSelTagWds].length-1; // this is equivalent to  Home_ChurchWds.length
				//	curSelTagTotal=window[curSelTagWds].length; // this is equivalent to  Home_ChurchWds.length

				curSelTagTotal=wdInCurTag.length; // 
					
					//---show the selected dropbox Tag and its total beside the Hamburger bar----
				//	var selTagNoUnder=selTag.replace("_"," ");
				//	var res1=" <i class='fa fa-bars fa-1x'  >"+" "+selTagNoUnder+"</i>"+" "+curSelTagTotal+"/"+totalTFWords;
				//	$("#tagSelStatus").html(res1) ; // display default Tag  All to the right of hamburger bar
					
					
				console.log("Number of found Word in current slected tag. curSelTagTotal="+curSelTagTotal);	
					//-----get the next TF words by random number
					//getWdInx=Math.floor(Math.random() * totalTFWords) + 1 ;
					//getWdInx=Math.floor(Math.random() * curSelTagTotal) + 1 ;
					if (mode==="Random"){
					      getWdInx=Math.floor(Math.random() * (curSelTagTotal-1)) + 1 ; 
					       console.log("random executed") 
					   }
					  else if (mode==="Sequential"){
					          
                             if (seqIncOrDec==="Inc"){
					      console.log("incremental executed") 
									  if ((getWdInx+1)<curSelTagTotal)getWdInx++
										else getWdInx=0
							 }else{
							   //  seqIncOrDec="Dec"
									  if (getWdInx<(curSelTagTotal+1) && getWdInx>0)getWdInx--
										else getWdInx=curSelTagTotal-1;						 
					                console.log("Decremental executed  curSelTagTotal="+curSelTagTotal) 
							 }
					  }					
				console.log("getWdInx="+getWdInx);	
		           //---display current Words index+1/totalSelectTagWords
                   showInxNTotal(selTag, getWdInx,curSelTagTotal);		
					
			

		            curSelTagSetImg=selTag+"SetImg"; 
                    shwBkgndImg();
	
					//console.log("img="+bgi.image[0])
					//----text filled color; NOT used					
				//	ctx.fillStyle =  bgi.color[bgi.image.length-1];
					
                     
					 //nxtWord(AllWds[getWdInx])
					//---note window[] is js built array which allows you to call an array using variable selTagWds
					//   so window[curSelTagWds] can be array AllWds or AdamWds or AbsoluteWds, or Home_ChurchWds ...
					 var res=wdInCurTag[getWdInx]
					 //console.log("res="+res)

	                 nxtWord(res); 

				 

};//---end getTag()

//---display Sequential play or Random play 
function modeShow(){

     
  if (mode==="Random"){
            //  mode="Sequential";
			  seqIncOrDec="Inc"; // default Sequential is Incremental unless Back button is selected then seqIncOrDec="Dec"
			  var res="<a id='mmode' href='#'>"+mode+" "+playStatus+"</a>"
			 // var res="<a id='mmode' href='#'>"+"S"+"</a>"
              //----update status
 		      $(".modeStatus").html(res) ;
				//showInxNTotal(selTag, getWdInx,curSelTagTotal);
              //----update word index/total display and display fontawesome play puase symbol
			  var ele=document.getElementById("tagSelStatus");
			  res=ele.innerHTML;
			  if (playStatus==="playing"){
			    res=res.replace("play","pause")
			  }else res=res.replace("pause","play");
			  ele.innerHTML=res;

				
  }else{
             // mode="Random";
			  var res="<a id='mmode' href='#'>"+mode+" "+playStatus+"</a>"
			 // var res="<a id='mmode' href='#'>"+"R"+"</a>"
              //----update status
 		      $(".modeStatus").html(res) ;	
              //showInxNTotal(selTag, getWdInx,curSelTagTotal)	
              //----update word index/total display and display fontawesome play puase symbol
			  var ele=document.getElementById("tagSelStatus");
			  res=ele.innerHTML;
			  if (playStatus==="playing"){
			    res=res.replace("play","pause")
			  }else res=res.replace("pause","play");
			  ele.innerHTML=res;			  
  
  }
}


//----when mode status is clicked---
$(".modeStatus").on("click", function () { 
 if (mode==="Random") mode="Sequential";
   else  mode="Random"

   modeShow()
});

//----Any area (except mode status, dropbox) clicked, show or hide the mode status
function hideShowPageInx(){
console.log("menuvisible="+menuvisible)
  if (menuvisible==="visible"){
     menuvisible="hide";
	document.getElementById("nxt").style.visibility ="hidden";
	document.getElementById("modeStatus").style.visibility ="hidden";
	document.getElementById("tagSelStatus").style.visibility ="hidden";
	document.getElementById("bk").style.visibility ="hidden";
	document.getElementById("menusTag").style.visibility ="hidden";
	document.getElementById("s-btn").style.visibility ="hidden";

	}else{
	 menuvisible="visible";
	 document.getElementById("nxt").style.visibility ="visible";
	document.getElementById("modeStatus").style.visibility ="visible";
	document.getElementById("tagSelStatus").style.visibility ="visible";
	document.getElementById("bk").style.visibility ="visible";
	document.getElementById("menusTag").style.visibility ="visible";
	document.getElementById("s-btn").style.visibility ="visible";

 
    }
};//--hideShowPageInx()----

var clkArea=document.getElementById("clickArea");
//clkArea.addEventListener('click', clickArea, true); 

	//----------detect swipe left
	$("#wordsbox").on("swipeleft",function(){
		 //alert("swipeleft detected");
	    bckClicked();
	});	
	//----------detect swipe right
	$("#wordsbox").on("swiperight",function(){
		 //alert("swipeleft detected");
	    nxtClicked();
	});	

	//----------detect touch Tap hold. Just tab any area to pause/play Twords
	$("#clickArea").on('click taphold',function(e){
		// alert("e.type="+e.type);
		//---call func to hide/display page index/total
		hideShowPageInx();
		
		//pausePlay();
		console.log("backgnd tap detected....");
	});
	

	
	


     //-----Detect DOUBLE click -----------------	
//	var touchtime = 0;
//	$('#clickArea').click(function() {
//		if(touchtime == 0) {
//			//set first click
//			touchtime = new Date().getTime();
//		} else {
//			//compare first click to this click and see if they occurred within double click threshold
//			if(((new Date().getTime())-touchtime) < 800) {
//				//double click occurred
//				touchtime = 0;
//				//alert("double tap");
//			/*	
//					//---ensure when settings popup, the colour shown is iniWordColor
//					$(".basic").attr("value",iniWordColor)
//					$('#settings').css({
//						'visibility' : 'visible'
//					});	
//				console.log("backgnd DOUBLE tap detected....");	
//				*/
//			} else {
//				//not a double click so set as a new first click
//				//---call func to hide/display page index/total
//				hideShowPageInx();
				
//				//pausePlay();
//				console.log("backgnd tap detected....");				
//			}
//		}
//		return false;
//	});	
 

//--------detect Left and Right Arrow key 
var saveKeys="";
var enterDetected=false;
$("body").keydown(function(e) {
  if(e.keyCode == 37) { // left arrow
     bckClicked();
  }
  else if(e.keyCode == 39) { // right arrow
          nxtClicked();
  }  
  else if(e.keyCode == 38) { // up arrow
          //nxtClicked();
  }
  else if(e.keyCode == 40) { // down arrow
          //nxtClicked();
  }
  else if(e.keyCode == 48){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 49){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 50){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 51){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 52){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 53){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 54){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 55){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 56){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 57){if (saveKeys.length<4){saveKeys+=String.fromCharCode(e.keyCode)}else {saveKeys=""}}
  else if(e.keyCode == 13){
      enterDetected=true;
      console.log("savedKeys="+saveKeys);
     //---saveKeys is numeric
     if (!isNaN(saveKeys)){
	        var shiftPressed=e.shiftKey;
			//---if shift-Enter is pressed-----
      console.log("savedKeys="+saveKeys+"  Shift pressed ? "+shiftPressed);
			
			if (shiftPressed){
				var imInx=parseInt(saveKeys)-1;
				if (imInx<bgi.image.length ){
					$('#backgnd').css({
								'background-image' : 'url(images/'+bgi.image[imInx] + ")"
					});	
					saveKeys="";
				}else{if (saveKeys>bgi.image.length)alert("Entry was greater than "+bgi.image.length)}
           }else{//-----shift key not pressed, so show the words item for the current Tag
                 //----update status
    //  console.log("savedKeys="+saveKeys+"  Shift pressed ? "+shiftPressed);
				var curSelTagWds=selTag+"Wds"; // curSelTagWds maybe  Home_ChurchWds, True_ParentsWds...
			//	curSelTagTotal=window[curSelTagWds].length-1; // this is equivalent to  Home_ChurchWds.length
				curSelTagTotal=window[curSelTagWds].length; // this is equivalent to  Home_ChurchWds.length
				if (saveKeys<=curSelTagTotal && saveKeys>0){
					var res="<a id='mmode' href='#'>"+mode+"</a>"
					$(".modeStatus").html(res) ;
					getWdInx=saveKeys-1;
			   console.log("Enter without Shift key."+ "  getWdInx="+getWdInx +"  current Tag total="+curSelTagTotal);		    
					showInxNTotal(selTag, getWdInx,curSelTagTotal);		
					modeShow();//--show Random play or Random pause or Sequential play or Sequential pause			
					var res=window[curSelTagWds][getWdInx]
					 //console.log("res="+res)
                     shwBkgndImg();					 
					 nxtWord(res);
				 }else {if (saveKeys>curSelTagTotal)alert("Entry was greater than "+curSelTagTotal)}

           }//-----shift key not pressed, so show the words item for the current Tag		   
	 };//---endif (!isNaN(saveKeys))
	 saveKeys=""
  };// else if  e.keycode==13

  

  
});

//----------left swipe----
$("div.backgnd").on("swipeleft",function(){
//alert("swipeleft");
  bckClicked();
});

$("#backgnd").on("swiperight",function(){
//alert("swiperight");
  nxtClicked();
});

$("#s-btn").on("click",function(){
					//---ensure when settings popup, the colour shown is iniWordColor
					$(".basic").attr("value",iniWordColor)
					$('#settings').css({
						'visibility' : 'visible'
					});	
				//console.log("backgnd DOUBLE tap detected....");	
})

function nxtClicked(){

if (enterDetected){enterDetected=false; return}

 //---force mode to sequential
 mode="Sequential";

			  seqIncOrDec="Inc"; // default Sequential is Incremental unless Back button is selected then seqIncOrDec="Dec"
 console.log("In menu.js  nxtClicked...");
              //----update status
			  var res="<a id='mmode' href='#'>"+mode+"</a>"
 		     $(".modeStatus").html(res) ;
			//document.getElementById("mmode").innerHTML=mode;

					var canvas = document.getElementById("panel");
					var ctx = canvas.getContext("2d");
					var textSize=24;
	
                  // var getWdInx; 
					var imgRdom=Math.floor(Math.random() * imgRndUpper) + 0 ;  // generate 0 to 19
					//totalTFWords=AllWds.length-1;
					//---when first startup, selTag="All"
			//		var curSelTagWds=selTag+"Wds"; // curSelTagWds maybe  Home_ChurchWds, True_ParentsWds...
		     //       curSelTagSetImg=selTag+"SetImg"; // curSelTagWds maybe  Home_ChurchSetImg, True_ParentsSetImg...
					//---note window[] is js built array which allows you to call an array using variable selTagWds
//				console.log("!!! curSelTagWds="+curSelTagWds+"  curSelTagSetImg="+curSelTagSetImg+"  TearsSetImg[0]="+TearsSetImg[0]);	
  
					//curSelTagTotal=window[curSelTagWds].length-1; // this is equivalent to  Home_ChurchWds.length
				//	curSelTagTotal=window[curSelTagWds].length; // this is equivalent to  Home_ChurchWds.length
                    curSelTagTotal=wdInCurTag.length; 
					console.log("curSelTagTotal="+curSelTagTotal);	
					//-----get the next TF words by random number
					//getWdInx=Math.floor(Math.random() * totalTFWords) + 1 ;
//alert("current index="+getWdInx+"  Total words for current tag="+curSelTagTotal)

				console.log("Before getWdInx="+getWdInx+"  curSelTagTotal="+curSelTagTotal);	


                   // if ((getWdInx+1)<curSelTagTotal)getWdInx=getWdInx+1
                    //   else getWdInx=0;	
					if (mode==="Random"){
					      getWdInx=Math.floor(Math.random() * (curSelTagTotal-1)) + 1 ; 
					       console.log("random executed") 
					   }
					  else if (mode==="Sequential"){
                            if (seqIncOrDec==="Inc"){
									  if ((getWdInx+1)<curSelTagTotal)getWdInx++
										else getWdInx=0
					      console.log("In menu.js nxtClicked().     Incremented executed") 
 							 }else{
							   //  seqIncOrDec="Dec"
									  if (getWdInx>0)getWdInx--
										else getWdInx=curSelTagTotal-1;						 
					       console.log("Decremental executed") 
 							 }
					  }	
					   
					//getWdInx=Math.floor(Math.random() * curSelTagTotal) + 1 ;
				console.log("after inc  getWdInx="+getWdInx+"  curSelTagTotal="+curSelTagTotal);	
		           //---display current Words index+1/totalSelectTagWords
                   showInxNTotal(selTag, getWdInx,curSelTagTotal);		
					modeShow();//--show Random play or Random pause or Sequential play or Sequential pause			
					
					//------When first load, it always take the LAST image and the last color. 
					//  ***** So if you want to add new images just paste the image file name to array (above) bgi.image  and bgi.color  objects *****
					//document.body.style.backgroundImage = "url(images/"+bgi.image[bgi.image.length-1]+")" ;//"url(bgi.image[0])";
					
					//$('#backgnd').animate({opacity: 0}, 0).css({'background-image': 'url(images/'+bgi.image[bgi.image.length-1]+')'}).animate({opacity: 1}, 2500);
				//	 $('#backgnd').fadeOut(1500,function() {
				//		$('#backgnd').css({
				//			// 'background-image' : 'url(images/'+bgi.image[bgi.image.length-1] + ")"
				//			'background-image' : 'url(images/'+bgi.image[imgRdom] + ")"
				//		});
				//		$('#backgnd').fadeIn(1500);
				//	});	
					//  curSelTagSetImg=selTag+"SetImg"; 
	
					  curSetImg=setImgInCurTag[getWdInx];
//				console.log("!>!>!  getWdInx="+getWdInx+" curSelTagWds="+curSelTagWds+"  curSelTagSetImg="+curSelTagSetImg+"  curSetImg="+curSetImg);	
 // 			    console.log(" TearsSetImg[0]="+TearsSetImg[getWdInx])
                     shwBkgndImg();					
					//console.log("img="+bgi.image[0])
		//			ctx.fillStyle =  bgi.color[bgi.image.length-1];
				
				
				
					// var res=window[curSelTagWds][getWdInx]
					 var res=wdInCurTag[getWdInx];
					 //console.log("res="+res)

				//	$("#MenuTag").css("padding-top", "50px");
					//$("#MenuTag").css("padding-bottom", "50px");
				//	alert("sf");					
				    nxtWord(res);
					//$("#MenuTag").height("50px");


};//---end nxtClicked()

function bckClicked(){
console.log("Inside bckClicked() menu.js");
if (enterDetected){enterDetected=false; return}
 //---force mode to sequential
 mode="Sequential";

			  seqIncOrDec="Dec"; // default Sequential is Incremental unless Back button is selected then seqIncOrDec="Dec"
              console.log("seqIncOrDec="+seqIncOrDec)
              //----update status
			  var res="<a id='mmode' href='#'>"+mode+"</a>"
 		     $(".modeStatus").html(res) ;
			//document.getElementById("mmode").innerHTML=mode;

					var canvas = document.getElementById("panel");
					var ctx = canvas.getContext("2d");
					var textSize=24;

					var imgRdom=Math.floor(Math.random() * imgRndUpper) + 0 ;  // generate 0 to 19
					//totalTFWords=AllWds.length-1;
					//---when first startup, selTag="All"
			//		var curSelTagWds=selTag+"Wds"; // curSelTagWds maybe  Home_ChurchWds, True_ParentsWds...
		  //          curSelTagSetImg=selTag+"SetImg"; // curSelTagWds maybe  Home_ChurchSetImg, True_ParentsSetImg...
					//---note window[] is js built array which allows you to call an array using variable selTagWds
	//			console.log("curSelTagWds="+curSelTagWds);	
  
			//		curSelTagTotal=window[curSelTagWds].length-1; // this is equivalent to  Home_ChurchWds.length
					curSelTagTotal=wdInCurTag.length; // this is equivalent to  Home_ChurchWds.length
				console.log("curSelTagTotal="+curSelTagTotal);	
					//-----get the next TF words by random number
					//getWdInx=Math.floor(Math.random() * totalTFWords) + 1 ;
//alert("current index="+getWdInx+"  Total words for current tag="+curSelTagTotal)

				console.log("Before getWdInx="+getWdInx+"  curSelTagTotal="+curSelTagTotal);	


                   // if ((getWdInx+1)<curSelTagTotal)getWdInx=getWdInx+1
                    //   else getWdInx=0;	
					if (mode==="Random")getWdInx=Math.floor(Math.random() * (curSelTagTotal-1)) + 1 ;
					  else if (mode==="Sequential"){
					      
					       if (getWdInx>0)getWdInx--
						      else getWdInx=curSelTagTotal-1;
				console.log("mode Sequential  seqIncOrDec="+seqIncOrDec+"  Decremented  getWdInx="+getWdInx+"  curSelTagTotal="+curSelTagTotal);	

					   }
					 else{}  
					   
					//getWdInx=Math.floor(Math.random() * curSelTagTotal) + 1 ;
		           //---display current Words index+1/totalSelectTagWords
                   showInxNTotal(selTag, getWdInx,curSelTagTotal);		
				modeShow();//--show Random play or Random pause or Sequential play or Sequential pause			
									
					//------When first load, it always take the LAST image and the last color. 
					//  ***** So if you want to add new images just paste the image file name to array (above) bgi.image  and bgi.color  objects *****
					//document.body.style.backgroundImage = "url(images/"+bgi.image[bgi.image.length-1]+")" ;//"url(bgi.image[0])";
					
					//$('#backgnd').animate({opacity: 0}, 0).css({'background-image': 'url(images/'+bgi.image[bgi.image.length-1]+')'}).animate({opacity: 1}, 2500);
				//	 $('#backgnd').fadeOut(1500,function() {
				//		$('#backgnd').css({
				//			'background-image' : 'url(images/'+bgi.image[imgRdom] + ")"
				//		});
				//		$('#backgnd').fadeIn(1500);
				//	});	
					  curSetImg=setImgInCurTag[getWdInx]
	//			console.log("!>!>! curSelTagWds="+curSelTagWds+"  curSelTagSetImg="+curSelTagSetImg+"  curSetImg="+curSetImg);	
				
					shwBkgndImg();				
					//console.log("img="+bgi.image[0])
				//	ctx.fillStyle =  bgi.color[bgi.image.length-1];
					//ctx.fillStyle =  bgi.color[6];				
				
				
					 var res=wdInCurTag[getWdInx]
					 //console.log("res="+res)

					 nxtWord(res);


};//---end bckClicked()


function tagDropSelected(){

};//----tagDropSelected()



//----when next arrow is clicked---
$("#nnxt").click(function(){
 nxtClicked();
});

//----when backarrow is clicked---
$("#bbk").on("click", function () { 
   bckClicked();	
 });//---end $("a[name=tag]"


 
//==================Setting Popup ================ 

//$( ".draggable" ).draggable();


//--- hide/close Settings popup---
function closeSettings(){
    $('#settings').css({'visibility' : 'hidden'});	
}

 //---------color picker ---
 $(".basic").spectrum({
		color: iniWordColor,
		showInput: true,
		preferredFormat: "hex",
    change: function(color) {
        $("#basic-log").text("Font colour(#dcf442): "+ color.toHexString());
		  savedFontColor=color.toHexString();
	console.log("Font colour changed. new color="+savedFontColor);		
			$('#words').css({'color' : savedFontColor});	


			
    }
});//----color picker

//----------Setting font size to font-slider reading
$(document).on('slidestop', '#font-slider', function(){ 

            var slider_value = $(this).val()
 
	        savedFontSize=(slider_value)/100;

             wdid.setScaledFont(savedFontSize,610/1536);  
 });
 
 //----detect font family selection----
 $(document).on('change', '#settings-ffamily', function(e) {
    console.log(this.options[e.target.selectedIndex].value);
	savedFontFamily=this.options[e.target.selectedIndex].value;
	$('#words').css("font-Family", savedFontFamily);
});

//----------Setting WORDS X position 
$(document).on('slidestop', '#words-slider', function(){ 

            savedWordHor = $(this).val()+"%"
            document.getElementById("wordsbox").style.left=savedWordHor; 
 });

 
 //------save Settings ----
 $("#save-settings").on("click", function () { 

	if (savedFontColor=="" && savedFontSize=="" && savedFontFamily=="" && savedWordHor=="" ){
	   alert("Nothing to save");
	   return;
	}
	 saveJsonDwnLd() 
 
});

//----save Settings into json file
//   ss is a json string
function saveJsonDwnLd(){

    /*  Eg of json objects
			{
			\"savedSettings\": [
			   {
				 \"fontcolor\": \"#ff00ff\",
				 \"fontsize\": \"0.14\",
				 \"fontfamily\": \"Raleway\",
				 \"wordhor\": \"6%\"
				 
				}
			  ]
			}	
	
	    Convert to String becomes
			"settingsData='{
							\"savedSettings\": [
							   {
								 \"fontcolor\": \"#ff00ff\",
								 \"fontsize\": \"0.14\",
				                 \"fontfamily\": \"Raleway\",
				                 \"wordhor\": \"6%\"
								}
							  ]
							}'  "		 
	    Inside file settings.json, you should see the followings in ONE line
		  settingsData='{
							\"savedSettings\": [
							   {
								 \"fontcolor\": \"#ff00ff\",
								 \"fontsize\": \"0.14\",
				                 \"fontfamily\": \"Raleway\",
 				                 \"wordhor\": \"6%\"
								}
							  ]
							}'
	
	*/

	if (savedFontColor=="")savedFontColor=iniWordColor;
	if (savedFontSize=="")savedFontSize=iniWordSize;
	if (savedFontFamily=="")savedFontFamily=iniWordFontFamily;
	if (savedWordHor=="")savedWordHor=iniWordHor;
	
	
	
    var jstrr="settingsData='{\"savedSettings\":[ {\"fontcolor\": \" "+savedFontColor+"\" ,\"fontsize\": \" "+savedFontSize+"\", \"fontfamily\": \" "+savedFontFamily+"\" , \"wordhor\": \" "+savedWordHor+"\" } ] }' "
    var aray = new Array();
    aray[0] = jstrr;

    var blob = new Blob(aray, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "settings.json"); // This should resulted browser Save dialogue.

};//---end saveJsonDwnLd()