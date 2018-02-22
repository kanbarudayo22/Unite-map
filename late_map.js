var ltlg= [38.96468,139.93633];
//マップの中心にする座標

var osmTile =
    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution:
	'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> \
contributors'
    });

var gsiTile = 
    L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
	attribution:
	'<a href="http://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
    });

var baseLayers = {'OpenStreetMap': osmTile, '国土地理院': gsiTile};
//マップレイヤーの内容

var josetu=L.geoJson(josetu_map,{
    style: function(feature) {
    	if (feature.properties._storage_options && feature.properties._storage_options.color){
	    switch (feature.properties._storage_options.color) {
		//alert(feature.properties._storege_opions);
    	    case 'Red': return {color: "red"};
	    case 'brown': return {color: "brown"};
	    case 'Cyan': return {color: "cyan"};
	    case 'lime': return {color: "lime"};
            }    
	}
	if (feature.properties._storage_options && feature.properties._storage_options.weight){
	    var hutosa=feature.properties._storage_options.weight;
    	    return {weight: hutosa};
        }
	if (feature.properties._storage_options && feature.properties._storage_options.dashArray){
	    var hakai=feature.properties._storage_options.dashArray;
	    return {dashArray: hakai};   
        }
    },
    onEachFeature: function(feature, layer){
	var propert= feature.properties, geomet=feature.geometry;
	// 予めfeature.propertisをletで宣言。(varでも可)
	if (propert && geomet) {
	    if (propert.name){
		var name=propert.name
	    } else {
		var name="";
	    }
	    if (propert.description){
		var tose=propert.description;
	    } else {
		var tose="";
	    }
	    if (propert._storage_options){
		if (propert._storage_options.color){
		    var color=propert._storage_options.color;
		}else {
		    color="";
		}
		if (propert._storage_options.iconClass){
		    var katati=propert._storage_options.iconClass;
		}else {
		    katati="";
		}
		
	    }
	    var type=geomet.type, m=geomet.coordinates;
	    
	    if (color=="Red" && type=="LineString" && name==""){
	     	name="流雪溝";
	    }else if (color=="brown" && type=="LineString" && name==""){
	     	name="下水";
	    }else if (color=="cyan" && type=="LineString" && name==""){
	     	name="沢";
	    }else if (color=="lime" && type=="LineString" && name==""){
	     	name="生活用水";
	    }else if (color=="" && type=="LineString" && name==""){
		name="農業用水"
	    }
	    if (propert.syasin){
		//alert(propert);
		var syasin=propert.syasin;
		if (syasin && propert.syasin2){
		    //要修正
		    //alert(propert.syasin2);
		    var coment="<h3>"+name+"</h3> <img src=\""+syasin+"\" width=\"300\" height=\"200\"><br><img src=\""+propert.syasin2+"\" width=\"300\" height=\"200\"><br>"+tose+"";
		}else{
		    //alert(syasin);
		    var coment="<h3>"+name+"</h3> <img src=\""+syasin+"\" width=\"300\" height=\"200\"><br><br>"+tose+"";
		}
	    }else if (propert){
		var coment="<h3>"+name+"</h3>"+tose+"";
	    }
	    var mak=layer.bindPopup(coment);
	    if (color=="Red" && type=="Point" && katati==""){
	    	mak.setIcon(r_Icon);
	    }else if (color=="Yellow" && type=="Point" || color=="Gold" && type=="Point" ){
	    	mak.setIcon(y_Icon);	
	    }else if (color=="lightpink" && type=="Point" || color=="LightPink" && type=="Point"){
	    	mak.setIcon(lp_Icon);
	    }else if (color=="lime" && type=="Point" || color=="Lime" && type=="Point"){
	    	mak.setIcon(lime_Icon);
	    }else if (color=="DarkSlateGray" && type=="Point" || color=="darkslategray" && type=="Point" ){
	    	mak.setIcon(DSG_Icon);
	    }else if (katati=="Drop"){
	    	mak.setIcon(hinanjo);
	    }
	}}});
var kanko=L.geoJson(kanko_map,{
    style: function(feature) {
	if (feature.properties._storage_options && feature.properties._storage_options.color){
	    switch (feature.properties._storage_options.color) {
		//alert(feature.properties._storege_opions);
	    case 'Gold': return {color: "black"};
		
	    }
	    
	    if (feature.properties._storage_options && feature.properties._storage_options.weight){
		var hutosa=feature.properties._storage_options.weight;
    		return {weight: hutosa};
            }
	    if (feature.properties._storage_options && feature.properties._storage_options.dashArray){
		var hakai=feature.properties._storage_options.dashArray;
		return {dashArray: hakai};   
            }
	}
    },
    onEachFeature: function(feature, layer){
	var propert= feature.properties, geomet=feature.geometry;
	// 予めfeature.propertisをletで宣言。(varでも可)
	if (propert.name && geomet) {
	    var name=propert.name;
	    }
	if (propert.description){
	    var tose=propert.description;
	} else {
	    var tose="";
	}
	var coment="<h1>"+name+"</h1><p>"+tose+"</p>";
	var mak=layer.bindPopup(coment);
    }});
//geojsonファイルを読みだし

var jibutu= {'除雪マップ': josetu, '観光マップ': kanko};

var mymap = L.map("mymap", {
    layers: [osmTile , josetu, kanko], //最初に指定するタイルレイヤー
    center: ltlg, zoom: 12, scrollWheelZoom: false
    //中心座標とズームレベルとマウスのホイールでのズームをしないよう設定
});

L.control.layers(baseLayers, jibutu).addTo(mymap);
//レイヤー変更オプション
