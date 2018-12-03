var colorCount = 0;
var heartSelected = false;
var infoCount = 1;

var clientID = 'bdbd863e19b5f2bd35ca',
    clientSecret = '17a710c7d5f4b5e8a566e943e14db4d0',
    apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
	token;

function tempLogIn(){
	//alert("logged in.");
	location.href = "index.html";
}

	//ADDTOFAVORITES has been moved to a jquery click handler at the botton


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

				//console.log(artwork);

				if(artwork["image_versions"].includes("medium"))
				{
					minArtwork.source = minArtwork.source.replace("{image_version}","medium");

				}else if(artwork["image_versions"].includes("small")){
					minArtwork.source = minArtwork.source.replace("{image_version}","small");
				}


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

function tempMuseum(){

	//ajax call to get token from ARTSY API
	$.post(apiUrl, { client_id: clientID, client_secret: clientSecret },
		function(res){

			//token goes out of scope out of this function
			token = res["token"];


			var artArrayURL = "https://api.artsy.net/api/artworks?size=4";

			$.ajax({
				url: artArrayURL,
				crossDomain: true,
				headers: {"Accept": "application/vnd.artsy-v2+json", "X-Xapp-Token":token},
				type: "GET",
				success: function(artwork) {



					var artArray = artwork["_embedded"]["artworks"];
					console.log(artArray);
					for(var i = 0; i < 4; i++)
					{

						var minArtwork = {
							title: artArray[i]["title"],
							date: artArray[i]["date"],
							id: artArray[i]["id"],
							medium: artArray[i]["medium"],
							source: artArray[i]["_links"]["image"]["href"]
						};

						//use appropriate size
						if(artArray[i]["image_versions"].includes("medium"))
						{
							minArtwork.source = minArtwork.source.replace("{image_version}","medium");

						}else if(artArray[i]["image_versions"].includes("small")){
							minArtwork.source = minArtwork.source.replace("{image_version}","small");
						}


						var divs = document.getElementsByClassName("museum-art");
						divs[i].style.backgroundImage =  "url('" + minArtwork.source + "')";

						var moreInfoString = "Title: " + String(minArtwork.title) + "<br> Date: " + String(minArtwork.date) +
					"<br> Medium: " + String(minArtwork.medium);

						var infoDivs = document.getElementsByClassName("info-div");
						infoDivs[i].innerHTML = moreInfoString;

					}

					//remove loading text
					document.getElementById('loadingDiv').style.opacity = '0';
				},
				failure: function(data){
					alert("failed");
				}
			 });

	}
	);
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
		console.log('added to favorites');
		document.getElementById('fab').innerHTML = 'favorite';
		$(this).addClass("heartAnimation");

	} else {
		console.log('removed from favorites');
		document.getElementById('fab').innerHTML = 'favorite_border';
		$(this).removeClass("heartAnimation");

	}
	heartSelected = !heartSelected;
	});

});

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
