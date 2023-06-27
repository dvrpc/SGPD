

    var map;
	var StationSearch = [];
	var MuniSearch = [];
		
		//OPEN ABOUT DIALOG
       //  $('#aboutModal').modal();
	
		
	$('input[name="overlayLayers"]').change(function () {
	            // Remove unchecked layers
	            $('input:radio[name="overlayLayers"]:not(:checked)').each(function () {
	                 map.removeLayer(window[$(this).attr('id')]);
					$('#carousel-example-generic').empty();
					$('#resultsheader').empty().removeClass();
					$('#box').empty().removeClass();
					$('#infosidebar').empty();
				//	$(document).on('change', 'input:radio[id^="TND_PT"]', function (event) {alert("Traditional Neighborhood Development (TND) generally describes a mixed-use community that is walkable and compact, with residential, retail, office, and civic buildings in close proximity to one another. These developments get their name from the traditional planning principles that guided the development of many older small towns and neighborhoods around the country. Unlike many conventional suburban developments, TNDs typically include a range of housing types and provide residents with the option of walking, biking, or driving to places within their neighborhood. Some TNDs include a transit connection while others do not.</p><p>A number of states have written formal TND ordinances into their planning and zoning enabling acts.  In New Jersey, the standard method for creating large scale, single-developer, traditional development is through a Planned Unit Development (PUD).");
				//  });
				
					$(document).ready(function() {
					  // Bind the onchange event for select#alunos
					  $('input[name="overlayLayers"]').change(function() {
						// If the load_image option was selected, call the loadImage() function
						if ($(this).attr('id') == 'DNT_PT') {
						 $('#DNTModal').modal('show');
						}
						else {
							if ($(this).attr('id')  == 'TND_PT') {
						$('#TNDModal').modal('show');
						 }
						  else {
						    	if ($(this).attr('id') == 'CS_PT') {
						 	$('#CSDModal').modal('show');
						}
					  }  
					 }
				   });
				 });	
				
				$(document).ready(function() {
					  // Bind the onchange event for select#alunos
					  $('input[name="overlayLayers"]').change(function() {
						// If the load_image option was selected, call the loadImage() function
						if ($(this).val() == 'load_image1') {
						  loadImage1();
						}
						else {
						   if ($(this).val() == 'load_image2') {
						  loadImage2();
						 }
						  else {
						   if ($(this).val() == 'load_image3') {
						  loadImage3();
						}
					  }  
					 }
				   });
				 });	

				function loadImage1(){
				  $('#legendBox').css('backgroundImage', 'url(img/DNT_LEGEND.jpg)');
				  $('#legendBox').css('width', '75');
				  $('#legendBox').css('height', '84');
				}
				function loadImage2(){
				  $('#legendBox').css('backgroundImage', 'url(img/TND_LEGEND.png)');
				  $('#legendBox').css('width', '75');
				  $('#legendBox').css('height', '85');
				}
				function loadImage3(){
				  $('#legendBox').css('backgroundImage', 'url(img/CSD_LEGEND.png)');
				  $('#legendBox').css('width', '75');
				  $('#legendBox').css('height', '85');
				}
				// Add checked layer
				$('input:radio[name="overlayLayers"]:checked').each(function () {
					map.addLayer(window[$(this).attr('id')]);
					//$('#overlay-layers').append();
	            });
	        });
	});
		
	$('.dropdown').click(function(){
 		$('input:radio[name="baseLayers"]:checked').each(function () {
		map.addLayer(window[$(this).attr('id')]);
							//$('#overlay-layers').append();
         });
	});		
		

    // Basemap Layers
		var mapquestOSM =  L.tileLayer.provider('Esri.WorldImagery');

	    map = L.map("map", {
	    minZoom: 9,
	    zoomControl:true,
	//    layers: [acetate]
	    });
			
		var acetateUrl = 'http://{s}.acetate.geoiq.com/tiles/acetate/{z}/{x}/{y}.png';
        var acetateAttrib = '2011 GeoIQ & Stamen, Data from OSM and Natural Earth';
        var acetate = new L.TileLayer(acetateUrl, {maxZoom: 18, attribution: acetateAttrib, subdomains: ['a1', 'a2', 'a3']});

        // set view to leeds, and add layer. method chaining, yumm.
        map.addLayer(acetate);
        // Overlay Layers

		var DNTIcon = L.icon({
                            iconUrl: 'img/DNT_Complete_Shadow.png',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            popupAnchor: [0, 15],
							
                    });
					 var DNTIcon2 = L.icon({
                            iconUrl: 'img/DNT_InProgress_Shadow.png',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            popupAnchor: [0, 15]
                    });
						 var DNTIcon3 = L.icon({
                            iconUrl: 'img/DNT_Proposed_Shadow.png',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            popupAnchor: [0, 15]
                    });
            
		var DNT_PT = L.geoJson(null, {
                pointToLayer: function (feature, latlng) {
              //   return L.marker(latlng, {icon: DNTIcon, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-DNT'  });
			    switch (feature.properties.Status) {
                    case 'Complete': return L.marker(latlng, {icon: DNTIcon, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-DNT'  });
					case 'In Progress': return L.marker(latlng, {icon: DNTIcon2, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-DNT'  });
					case 'Proposed': return L.marker(latlng, {icon: DNTIcon3, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-DNT'  });
				} 
				},	
                onEachFeature: function(feature, layer){
					if (feature.properties) {
						layer.on({click: DNT_ID});
						layer.on({dblclick: zoomToPoint});
		
					
                }
			}	
            });
        $.getJSON("data/DNT.js", function (data) {
            DNT_PT.addData(data);
        });
	
		var TNDIcon = L.icon({
                            iconUrl: 'img/TND_Complete_Shadow.png',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            popupAnchor: [0, 15]
                    });
					 var TNDIcon2 = L.icon({
                            iconUrl: 'img/TND_InProgress_Shadow.png',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            popupAnchor: [0, 15]
                    });
						 var TNDIcon3 = L.icon({
                            iconUrl: 'img/TND_Proposed_Shadow.png',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            popupAnchor: [0, 15]
                    });
            
		var TND_PT = L.geoJson(null, {
                pointToLayer: function (feature, latlng) {
					//   return L.marker(latlng, {icon: TNDIcon, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-TND'  });
				  switch (feature.properties.Status) {
						case 'Completed': return L.marker(latlng, {icon: TNDIcon, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-TND'  });;
						case 'In progress': return L.marker(latlng, {icon: TNDIcon2, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-TND'  });
						case 'Proposed': return L.marker(latlng, {icon: TNDIcon3, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-TND'  });
					}
				},	
                onEachFeature: function(feature, layer){
					if (feature.properties) {
						layer.on({click: TND_ID});
						layer.on({dblclick: zoomToPoint});
			
	
                }
			}	
            });
        $.getJSON("data/TND.js", function (data) {
            TND_PT.addData(data);
        });
	
		var CSIcon = L.icon({
                            iconUrl: 'img/CSD_Complete_Shadow.png',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            popupAnchor: [0, 15]
                    });
					
		var CS_PT = L.geoJson(null, {
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: CSIcon, riseOnHover: true}).bindLabel(feature.properties.Project, { className: 'leaflet-label-CSD'  });
				},	
                 onEachFeature: function(feature, layer){
					if (feature.properties) {
						layer.on({click: CS_ID});
						layer.on({dblclick: zoomToPoint});
				
		
                }
			}	
            });
        $.getJSON("data/CS.js", function (data) {
            CS_PT.addData(data);
        });
	
			var Rail = L.geoJson(null, {
			style: {
			color: '#5B82A5',
			weight :5,
			opacity: 1
			},
			onEachFeature: function(feature, layer){
					if (feature.properties) {
					}
                },
            });
        $.getJSON("data/RegionalRail.js", function (data) {
            Rail.addData(data);
        });
		
	    var StationIcon = L.icon({
					iconUrl: 'Station.png',
					iconSize: [10, 10],
					//iconAnchor: [15, 15],
					//popupAnchor: [0, 15]
				});
				
		var RailStation = L.geoJson(null, {
				pointToLayer: function (feature, latlng) {
				return L.marker(latlng, {icon: StationIcon});
					},
				onEachFeature: function(feature, layer){
					if (feature.properties) {
						layer.bindLabel(feature.properties.STATION, { noHide: true, direction: 'auto', className: 'leaflet-label' });
						
				}
				StationSearch.push({
					name: layer.feature.properties.STATION,
					//address: layer.feature.properties.ADDRESS1,
					source: "Stations",
					id: L.stamp(layer),
					lat: layer.feature.geometry.coordinates[1],
					lng: layer.feature.geometry.coordinates[0]
				  });
                },
            });
        $.getJSON("data/Stations.js", function (data) {
            RailStation.addData(data);
        });
		
		var DVRPC = L.geoJson(null, {
            style: { color:  'rgb(63,63,63)',weight: 4, fill: false,opacity: 0.75,clickable: false },
				onEachFeature: function(feature, layer){
				
        
			}
        });
        $.getJSON("data/County_DVRPC.js", function (data) {
            DVRPC.addData(data);
			}).complete(function () {
           map.fitBounds(DVRPC.getBounds());
            });  
			
			(Rail).addTo(map);
			(DVRPC).addTo(map);
			(DNT_PT).addTo(map);
			
			
			var overlays = {
				"Developlment Near Transit": DNT_PT,
				"Traditional Neighborhood Development": TND_PT,
				"Conservation Subdivision": CS_PT,
			};	   
			 
			var baseLayers = {
			"Imagery": mapquestOSM,
			"Streets": acetateUrl
				
			};
			   
		 var layerControl = L.control.layers(baseLayers).addTo(map);			
		
		var viewCenter = new L.Control.ViewCenter();
					map.addControl(viewCenter);

	/*

		// create an empty layer group to store the results and add it to the map
		 var results = new L.LayerGroup().addTo(map);

		  // listen for the results event and add every result to the map
		  searchControl.on("results", function(data){
          results.clearLayers();
          for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
          };
         });
	
		searchControl.on("error", function(e){
        console.log(e);
		});
        */
        var scaleControl = L.control.scale({
        position: 'bottomright'
        });

	/////FUNCTIONS
	
		map.on('moveend', function(e){
		 if (map.getZoom() <=9 && map.hasLayer(Rail)) {
		map.removeLayer(Rail);
		}
		if (map.getZoom() >9 && map.hasLayer(Rail)==false) {
		map.addLayer(Rail);
		}
		});
	
		map.on('moveend', function(e){
		 if (map.getZoom() <=13 && map.hasLayer(RailStation)) {
		map.removeLayer(RailStation);
		}
		if (map.getZoom() >13&& map.hasLayer(RailStation)==false) {
		map.addLayer(RailStation);
		}
		});
		
		
		function sidebar (e) {
		$( "#overlay-layers" ).append;
		}
		
		//Action on feature selections////////////
        function zoomToPoint(e){
        var layer= e.target;
        var latLng = layer.getLatLng();
            map.setView(latLng, 15);
            }
            function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
            };
   
			function DNT_ID(e) {
			resetIconhighlights();
			resethighlight();
			sidebar();
			highlightMarkers(e);
            var length = 0;
			var layer = e.target;
          //    (e).eachLayer(function(layer) {
			var props = layer.feature.properties

				if (props.Website_1===undefined){ var Website_1 = " "  ;}
				else { var Website_1 =  '<a class="DNT" href="' + (props.Website_1)+ '" target="_blank">' + (props.Web_Link) +"</a></div>";}
				if (props.PHOTO1===undefined){ var PHOTO1= " "  ;}
				else { var PHOTO1 = "<div class='carousel-inner'>"+"<div class='item active'><img src='"+ (props.PHOTO1) +" '></div>"+"<div class='item'><img src='"+ (props.PHOTO2) + "'></div></div>"+" <a class='left carousel-control' href='#carousel-example-generic' data-slide='prev'>"+"<span class='glyphicon glyphicon-chevron-left'></span>"+" </a>"+" <a class='right carousel-control' href='#carousel-example-generic' data-slide='next'>"+"<span class='glyphicon glyphicon-chevron-right'></span>"+"</a>"	;}
				if (props.PH_Credit===undefined){ var PH_Credit = " "  ;}
				else { var PH_Credit = "<div class='labelfieldsource'>"+ (props.PH_Credit) +  "</div>";}
				
			var info = 	     "<div class='labelfieldTND'>"+ (props.Project) 
									+"</div><div class='labelfieldTND1'>"+ (props.MCD) +", " +(props.STATE) 
									+"</div>";
			 var  content =  	
									"<div class='labelfield'><b>Status: </b>"+ (props.Status) 
								    +"<div class='labelfield'><b>Developer: </b>"+ (props.Developer) 
									+"<div class='labelfield'><b>Transit Line: </b>"+ (props.Transit)  
									+"<div class='labelfield'><b>Station: </b>"+ (props.Station)  
									+"</div><br>"
								    +"<div class='labelfield'><b>Description: </b>"+ (props.Descr1) + " " + (props.Descr2)	
								    +"</div><br>"
								    + Website_1
							         +"</div></div>";			      						
			var  content2=       PHOTO1
											+ PH_Credit

				var status = props.DVSGA; 
			    //style header based on status
				if (status==='Y'){
					document.getElementById('box').className = 'YDVSGA ';
				}else if(status==='N'){
					document.getElementById('box').className = 'NDVSGA ';
				};
							
				document.getElementById('resultsheader').innerHTML = info;
				document.getElementById('resultsheader').className = 'rhDNT';	
				document.getElementById('infosidebar').innerHTML = content;
				document.getElementById('carousel-example-generic').innerHTML = content2;
				$('.carousel').carousel('pause');
            };
		
			function TND_ID(e) {
			resetIconhighlights();
			resethighlight();
			sidebar();
			highlightMarkers(e);
            var layer = e.target;
            var props = layer.feature.properties
			
				if (props.Website_13===undefined){ var Website_13 = " "  ;}
				else { var Website_13 =  '<a class="TND" href="' + (props.Website_13)+ '" target="_blank">' + (props.Web_Link_1) +"</a></div>";}
				if (props.PHOTO1_1===undefined){ var PHOTO1_1= " "  ;}
				else { var PHOTO1_1 = "<div class='carousel-inner'>"+"<div class='item active'><img src='"+ (props.PHOTO1_1) +" '></div>"+"<div class='item'><img src='"+ (props.PHOTO2_1) + "'></div></div>"+" <a class='left carousel-control' href='#carousel-example-generic' data-slide='prev'>"+"<span class='glyphicon glyphicon-chevron-left'></span>"+" </a>"+" <a class='right carousel-control' href='#carousel-example-generic' data-slide='next'>"+"<span class='glyphicon glyphicon-chevron-right'></span>"+"</a>"	;}
				if (props.Photo_Cred===undefined){ var Photo_Cred = " "  ;}
				else { var Photo_Cred = "<div class='labelfieldsource'>"+ (props.Photo_Cred) +  "</div>";}
				
			var info =  "<div class='labelfieldTND'>"+ (props.TND) 
							+"</div><div class='labelfieldTND1'>"+ (props.MCD) +", " +(props.STATE) 
							+"</div>";
			var  content =  	
									"<div class='labelfield'><b>Status: </b>"+ (props.Status) 
								   +"<div class='labelfield'><b>Developer: </b>"+ (props.Developer) 
								   +"</div><br>"
								   +"<div class='labelfield'><b>Description: </b>"+ (props.Descr1) + " " + (props.Descr2) 	
								   +"</div><br>"
							      +Website_13
							        +"</div>"
										      						
				var  content2=  	   PHOTO1_1
											+ Photo_Cred
				
				var status = props.DVSGA; 
			    //style header based on status
				if (status==='Y'){
					document.getElementById('box').className = 'YDVSGA ';
				}else if(status==='N'){
					document.getElementById('box').className = 'NDVSGA ';
				};
					
				document.getElementById('resultsheader').innerHTML = info;
				document.getElementById('resultsheader').className = 'rhTND';	
				document.getElementById('infosidebar').innerHTML = content;
				document.getElementById('carousel-example-generic').innerHTML = content2;
				$('.carousel').carousel('pause');
		};
			
		function CS_ID(e) {
			resetIconhighlights();
			resethighlight();
			highlightMarkers(e);
            var layer = e.target;
            var props = layer.feature.properties
				
				if (props.REPORT===undefined){ var REPORT = " "  ;}
				else { var REPORT =  '<a class="CSD" href="' + (props.REPORT)+ '" target="_blank">' + (props.NLTFacts_2) +"</a></div>";}

				var info =  	 "<div class='labelfieldTND'>"+ (props.Project) 
									+"</div><div class='labelfieldTND1'>"+ (props.MCD_1) +", " +(props.State_1) 
									+"</div>";
				var  content =  
									"<div class='labelfield'><b>Status: </b>"+ (props.Status_12) 
								    +"<div class='labelfield'><b>Developer: </b>"+ (props.Develope_1)  
									+"</div><br>"
								    +"<div class='labelfield'><b>Description: </b>"+ (props.Descr1_1) + " " + (props.Descr2_1) 		
								    +"</div><br>"
									+ REPORT
							        +"</div><br>"
									+ "<div class='labelfield'><b>Last Update: </b>"+ (props.Status_U_1) 
									+"</div><br>";	
		
				document.getElementById('resultsheader').innerHTML = info;
				document.getElementById('resultsheader').className = 'rhCSD';	
				document.getElementById('infosidebar').innerHTML = content;
		 };

	//hack to highlight markers with box on click
        function highlightMarkers(e){
            var layer = e.target;
            var iconElem = L.DomUtil.get(layer._icon);
            iconElem.style.border="4px #00ffff solid";
            iconElem.style.height="30px";
            iconElem.style.width="30px";
            iconElem.style.marginTop="-19px";
            iconElem.style.marginLeft="-19px";
            iconElem.id="selectedIcon";
        };

		function resethighlight(){
		  resetIconhighlights();
		}
		//hack to remove highlight from markers
        function resetIconhighlights(){
        	var highlticon = document.getElementById('selectedIcon');
        	if (highlticon!=undefined){
        		highlticon.style.border="";
        		highlticon.style.height="30px";
        		highlticon.style.width="30px";
        		highlticon.style.marginTop="-15px";
        		highlticon.style.marginLeft="-15px";
        		highlticon.id="";
        	}else{
        		//do nothing
        	}
        };
		
		map.on('click',function(e){
                   resethighlight();
				
            });
	
		
		// Highlight search box text on click
$("#searchbox").click(function () {
    $(this).select();
});

// Typeahead search functionality
$(document).one("ajaxStop", function () {
    map.fitBounds(Master.getBounds());
    $("#loading").hide();

    var StationsBH = new Bloodhound({
        name: "Stations",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: StationSearch,
        limit: 10
    });
	
		 var geonamesBH = new Bloodhound({
        name: "GeoNames",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
            filter: function (data) {
                return $.map(data.geonames, function (result) {
                    return {
                        name: result.name + ", " + result.adminCode1,
                        lat: result.lat,
                        lng: result.lng,
                        source: "GeoNames"
                    };
                });
            },
            ajax: {
                beforeSend: function (jqXhr, settings) {
                    settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
                    $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
                },
                complete: function (jqXHR, status) {
                    $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
                }
            }
        },
        limit: 4
    });
	
	 StationsBH.initialize();
      geonamesBH.initialize();
	
	 // instantiate the typeahead UI
    $("#searchbox").typeahead({
        minLength: 2,
        highlight: true,
        hint: false
    }, {
        name: "Stations",
        displayKey: "name",
        source: corridorsBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>Studies</h4>"
        }
    }
	, {
        name: "GeoNames",
        displayKey: "name",
        source: geonamesBH.ttAdapter(),
        templates: {
            header: "<h4 class='typeahead-header'>&nbsp;GeoNames</h4>"
        }
    }
	).on("typeahead:selected", function (obj, datum) {
      if (datum.source === "Stations") {
            map.setView([datum.lat, datum.lng], 14);
        }
		  if (datum.source === "GeoNames") {
            map.setView([datum.lat, datum.lng], 14);
        }
        if ($(".navbar-collapse").height() > 50) {
            $(".navbar-collapse").collapse("hide");
        }
    }).on("typeahead:opened", function () {
        $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
        $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
    }).on("typeahead:closed", function () {
        $(".navbar-collapse.in").css("max-height", "");
        $(".navbar-collapse.in").css("height", "");
    });
    $(".twitter-typeahead").css("position", "static");
    $(".twitter-typeahead").css("display", "block");
});
        // Larger screens get scale control and expanded layer control
        if (document.body.clientWidth <= 767) {
        var isCollapsed = true;
        } else {
            var isCollapsed = false;
            map.addControl(scaleControl);
        };

        // Placeholder hack for IE
        if (navigator.appName == "Microsoft Internet Explorer") {
            $("input").each( function () {
                if ($(this).val() == "" && $(this).attr("placeholder") != "") {
                    $(this).val($(this).attr("placeholder"));
                    $(this).focus(function () {
                        if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
                    });
                    $(this).blur(function () {
                        if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
                    });
                }
            });
        }

