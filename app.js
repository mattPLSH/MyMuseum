var colorCount = 0;
var heartSelected = false;
var infoCount = 1;

var currentArt;

//this function will determine if someone is logged in and hides either
//log in or log out respectivly
checkStatus();

var clientID = 'bdbd863e19b5f2bd35ca',
    clientSecret = '17a710c7d5f4b5e8a566e943e14db4d0',
    apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
	token;

function RegisterAccount(){
	var data = {
		"username": $("input[name=username]").val(),
		"password": $("input[name=password]").val(),
		"function": "register"
	}

	$.ajax({
		type: "POST",
		url: "login.php",
		data: data,
		dataType: "json",
		success: function (response) {
			$("#errortxt").html("");
			if(response["error"] && response["message"]){
				$("#errortxt").html(response["message"])
			}
			else if(response["success"]){
				window.location = "index.html";
			}
		},
		error: function (err){
			console.log(err);
		}
	});
}

function LogIn(){
	//alert("logged in.");
	var data = {
		"username": $("input[name=username]").val(),
		"password": $("input[name=password]").val(),
		"function": "login"
	}

	$.ajax({
		type: "POST",
		url: "login.php",
		data: data,
		dataType: "json",
		success: function (response) {
			$("#errortxt").html("");
			if(response["error"] && response["message"]){
				$("#errortxt").html(response["message"])
			}
			else{
				window.location = "index.html";
			}
		},
		error: function (err){
			console.log(err);
		}
	});
}

function logout(){
	$.ajax({
		type: "GET",
		url: "logout.php",
		dataType: "json",
		success: function (response) {
			window.location = "index.html"
		}
	});
}

function checkStatus(){
	$.ajax({
		type: "GET",
		url: "checkLoggedIn.php",
		success: function(data){
			if(data==1){
				//user is logged in so button should be log out
				var elem = document.getElementById('signIn');
        if (elem)
        {
    			elem.innerHTML = "sign out";
          elem.onClick = 'logout()';
        }
			}
      else{
				//user is not logged in so button should be log in
				var elem = document.getElementById('signIn');
        if (elem)
        {
          elem.innerHTML = "sign in";
          elem.onClick = "location.href = 'signIn.html';"
        }
			}
		}
	});
}

	//ADDTOFAVORITES has been moved to a jquery click handler at the botton

	// infoModal

/*function infoModal(){

	//var span = $(this).find('span');
	//var popup = span.id;
    //popup.classList.toggle("show");

	//var name = document.$(this).last().id;

	var name = $(this).closest('span').attr(id);

	var popup = document.getElementById(name);
    popup.classList.toggle("show");
}*/

function moreInfo()
{

	var div = document.getElementById("hiddenInfoDiv");
	//div.innerHTML ="this is secret text :3 more words to see how it looks and aligns blah blah with everything";


	if(infoCount % 2 == 0){
		infoCount++;
		div.style.opacity = "1";
	} else {
		infoCount--;
    div.style.opacity = "0";
	}

}

// museum version of removeFavorite
function removeFavoriteMus(artid){
  console.log("remove " +  artid);
	var data = {
		"artid": artid,
		"function": "remove"
	}

	$.ajax({
		type: "POST",
		url: "saveFavorite.php",
		data: data,
		dataType: "json",
		success: function (response) {
			if(response["error"]){
				return false;
			}
			else{
				return true;
			}
		},
		error: function(error){
			console.log(error);
			return false;
		}
	})
  loadMyMuseum();
	return true;
}

function removeFavorite(){
	var data = {
		"artid": currentArt["id"],
		"function": "remove"
	}

	$.ajax({
		type: "POST",
		url: "saveFavorite.php",
		data: data,
		dataType: "json",
		success: function (response) {
			if(response["error"]){
				return false;
			}
			else{
				return true;
			}
		},
		error: function(error){
			console.log(error);
			return false;
		}
	})
	return true;
}

function saveFavorite(){
	if(currentArt){
		var data = {
			"artid": currentArt["id"],
			"imgurl": currentArt["source"],
			"title": currentArt["title"],
			//"author": currentArt["author"],
			"date": currentArt["date"],
			"medium": currentArt["medium"],
			"function": "add"
		}

		$.ajax({
			type: "POST",
			url: "saveFavorite.php",
			data: data,
			dataType: "json",
			success: function (response) {
				if(response["error"]){
					return false;
				}
				else{
					return true;
				}
			},
			error: function(error){
				console.log(error);
				return false;
			}
		});
		return true;
	}
}

function nextArt(){

	colorCount++;

		if(colorCount==1){
			document.getElementById("bdy").style.backgroundColor = "#D5A3DE";
		} else if(colorCount==2){
			document.getElementById("bdy").style.backgroundColor = "#A3B5FD";
		} else if(colorCount==3){
			document.getElementById("bdy").style.backgroundColor = "#E49AAB";
		} else if(colorCount==4){
			document.getElementById("bdy").style.backgroundColor = "#A1D3DA";
			colorCount = 0;
		}
	heartSelected = false;

	document.getElementById('fab').className = document.getElementById('fab').className.replace(/\heartAnimation\b/g, "");

	document.getElementById('fab').innerHTML = 'favorite_border';


	//reset info
	if(infoCount % 2 != 0)
	{
		infoCount--;
	}

	document.getElementById('hiddenInfoDiv').style.opacity = '0';

	//show loading
	document.getElementById('loadingDiv').style.opacity = '1';

	//ajax call to get token from ARTSY API
	$.post(apiUrl, { client_id: clientID, client_secret: clientSecret },
    function(res){

		//token goes out of scope out of this function
		token = res["token"];


		var randArtURL = "https://api.artsy.net/api/artworks?sample=true";

		$.ajax({
			url: randArtURL,
			crossDomain: true,
			headers: {"Accept": "application/vnd.artsy-v2+json", "X-Xapp-Token":token},
			type: "GET",
			success: function(artwork) {

				var minArtwork = {
					title: artwork["title"],
					date: artwork["date"],
					id: artwork["id"],
					medium: artwork["medium"],
					source: artwork["_links"]["image"]["href"]
				};

				//fetchArtistByArtId(minArtwork["id"]);

				//console.log(artwork);

				if(artwork["image_versions"].includes("medium"))
				{
					minArtwork.source = minArtwork.source.replace("{image_version}","medium");

				}else if(artwork["image_versions"].includes("small")){
					minArtwork.source = minArtwork.source.replace("{image_version}","small");
				}

				currentArt = minArtwork;

				document.getElementById("currentArt").style.backgroundImage = "url('" + minArtwork.source + "')";

				var moreInfoString = "Title: " + String(minArtwork.title) + "<br> Date: " + String(minArtwork.date) +
				"<br> Medium: " + String(minArtwork.medium);

				document.getElementById("hiddenInfoDiv").innerHTML = moreInfoString;

				//remove loading text
				document.getElementById('loadingDiv').style.opacity = '0';
			},
			failure: function(data){
				alert("failed");
			}
		 });



	});

}

function loadCuratorMuseum(){
	$.ajax({
		type: "GET",
		url: "GetCuratorMuseum.php",
		dataType: "json",
		success: function (response) {

			//TODO: SAVE THE RETURN DATA TO USE LATER
			if(response["error"]){

			}else{

			}
		},
		error: function (error){
			console.log(error);
		}
	});
}

function loadMyMuseum(){
	$.ajax({
		type: "GET",
		url: "getfavorites.php",
		dataType: "json",
		success: function (response) {

      artArray = response.reverse(); // reverse so most recently saved art is first
      console.log(response);
      var artContainer = document.getElementById('artContainerRow');
      artContainer.innerHTML = "";
      for(var i = 0; i < response.length; i++)
      {

        var minArtwork = {
          title: artArray[i]["title"],
          date: artArray[i]["date"],
          id: artArray[i]["artid"],
          medium: artArray[i]["medium"],
          source: artArray[i]["imgurl"]
        };

        //use appropriate size
        // if(artArray[i]["image_versions"].includes("medium"))
        // {
        //   minArtwork.source = minArtwork.source.replace("{image_version}","medium");
        //
        // }else if(artArray[i]["image_versions"].includes("small")){
        //   minArtwork.source = minArtwork.source.replace("{image_version}","small");
        // }

        artContainer.innerHTML +=   "<div class=\"col-xl-3\">'" +
                  "<div  id=\"zoom\" class=\"museum-art\">" +
                          "<span id=\"a" + i + "\" class=\"info-div\"></span>" +
                  "</div>" +
          "</div>";



        var divs = document.getElementsByClassName("museum-art");
        divs[i].style.backgroundImage =  "url('" + minArtwork.source + "')";

        var moreInfoString = "Title: " + String(minArtwork.title) + "<br> Date: " + String(minArtwork.date) +
        "<br> Medium: " + String(minArtwork.medium);

        var infoDivs = document.getElementsByClassName("info-div");
        infoDivs[i].innerHTML = moreInfoString;
        infoDivs[i].innerHTML +="<br /> <button onclick=\"removeFavoriteMus(\'"+ minArtwork.id + "\')\">remove</button>";


        /*
        var title = String(minArtwork.title);
        var date = String(minArtwork.date);
        var med = String(minArtwork.medium);
        */

      }

      //remove loading text
      if (response.length != 0)
      {
        document.getElementById('loadingDiv').style.opacity = '0';
      }

      else
      {
        document.getElementById('loadingDiv').innerHTML = "looks like you don't have any favorited art!! favorite some art in the find art tab and then come back!!!";
        document.getElementById('loadingDiv').style.color = "#D5A3DE";
        document.getElementById('loadingDiv').style.opacity = '1';
      }


			//TODO: SAVE THE RETURN DATA TO USE LATER
			if(response["error"]){

			}else{

			}
		},
		error: function (error){
			console.log(error);
		}
	});
	//TODO: TAKE DATA TAKEN FROM GetFavoriteArt() AND DYNAMICALLY LOAD PAGE


	//temporary/ filler code starts here
	//ajax call to get token from ARTSY API
	// $.post(apiUrl, { client_id: clientID, client_secret: clientSecret },
	// 	function(res){
  //
	// 		//token goes out of scope out of this function
	// 		token = res["token"];
  //
  //
	// 		var artArrayURL = "https://api.artsy.net/api/artworks?size=4";
  //
	// 		$.ajax({
	// 			url: artArrayURL,
	// 			crossDomain: true,
	// 			headers: {"Accept": "application/vnd.artsy-v2+json", "X-Xapp-Token":token},
	// 			type: "GET",
	// 			success: function(artwork) {
  //
  //
  //
	// 				var artArray = artwork["_embedded"]["artworks"];
	// 				console.log(artArray);
	// 				for(var i = 0; i < 4; i++)
	// 				{
  //
	// 					var minArtwork = {
	// 						title: artArray[i]["title"],
	// 						date: artArray[i]["date"],
	// 						id: artArray[i]["id"],
	// 						medium: artArray[i]["medium"],
	// 						source: artArray[i]["_links"]["image"]["href"]
	// 					};
  //
	// 					//use appropriate size
	// 					if(artArray[i]["image_versions"].includes("medium"))
	// 					{
	// 						minArtwork.source = minArtwork.source.replace("{image_version}","medium");
  //
	// 					}else if(artArray[i]["image_versions"].includes("small")){
	// 						minArtwork.source = minArtwork.source.replace("{image_version}","small");
	// 					}
  //
	// 					var divs = document.getElementsByClassName("museum-art");
	// 					divs[i].style.backgroundImage =  "url('" + minArtwork.source + "')";
  //
	// 					var moreInfoString = "Title: " + String(minArtwork.title) + "<br> Date: " + String(minArtwork.date) +
	// 					"<br> Medium: " + String(minArtwork.medium);
  //
	// 					var infoDivs = document.getElementsByClassName("info-div");
	// 					infoDivs[i].innerHTML = moreInfoString;
  //
	// 					/*
	// 					var title = String(minArtwork.title);
	// 					var date = String(minArtwork.date);
	// 					var med = String(minArtwork.medium);
	// 					*/
  //
	// 				}
  //
	// 				//remove loading text
	// 				document.getElementById('loadingDiv').style.opacity = '0';
	// 			},
	// 			failure: function(data){
	// 				alert("failed");
	// 			}
	// 		 });
  //
	// }
  //
	// //end filler code
	// );
}


$(document).ready(function(){

	$(".heart").hover(function(){
	$(this).text('favorite');
    }, function(){
		if (!heartSelected)
		{
			$(this).text('favorite_border');
		}
});

	// THIS IS NOW ADDTOFAVORITES
	$(".heart").click(function()
	{
		if(!heartSelected){
			if(saveFavorite()){
				document.getElementById('fab').innerHTML = 'favorite';
				$(this).addClass("heartAnimation");
				heartSelected = true;
			}
		} else {
			if(removeFavorite()){
				document.getElementById('fab').innerHTML = 'favorite_border';
				$(this).removeClass("heartAnimation");
				heartSelected = false;
			}
		}
	});

	// info Modal

	$(document).on("click",".museum-art",function(){

		console.log('clicked');

		var name = $(this).children('span').attr('id');

		var popup = document.getElementById(name);
		popup.classList.toggle("show");

	});

});

function fetchArtistByArtId(artId){
	$.post(apiUrl, { client_id: clientID, client_secret: clientSecret },
		function(res){
			//token goes out of scope out of this function
			token = res["token"];


			var artURL = "https://api.artsy.net/api/artists?" + artId;

			var artist = "";

			$.ajax({
				url: artURL,
				crossDomain: true,
				headers: {"Accept": "application/vnd.artsy-v2+json", "X-Xapp-Token":token},
				type: "GET",
				success: function(result) {
					result["_embedded"]["artists"].forEach(element => {
						artist += element["name"];
						artist += " ";
					});

					if(artist == ""){
						artist = "null";
					}
					currentArt["author"] = artist;
				}
			});

		}
	);
}

function GetArtById(artId){
	$.post(apiUrl, { client_id: clientID, client_secret: clientSecret },
		function(res){
			//token goes out of scope out of this function
			token = res["token"];


			var artURL = "https://api.artsy.net/api/artworks/" + artId;

			$.ajax({
				url: artURL,
				crossDomain: true,
				headers: {"Accept": "application/vnd.artsy-v2+json", "X-Xapp-Token":token},
				type: "GET",
				success: function(artwork) {
					var minArtwork = {
						title: artwork["title"],
						date: artwork["date"],
						id: artwork["id"],
						medium: artwork["medium"],
						source: artwork["_links"]["image"]["href"]
					};


					//TODO return artwork data and/or dynamically build art grid
				}
			});
		}
	);
}
