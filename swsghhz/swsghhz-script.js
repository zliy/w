var map = new BMap.Map("BMapContainer");
map.centerAndZoom(new BMap.Point(106, 37), 5);
map.addControl(new BMap.NavigationControl({
    type: BMAP_NAVIGATION_CONTROL_SMALL
}));
map.enableScrollWheelZoom();

var drawedLayers = [];


function drawCurrentEditing() {
    var name = document.getElementById("districtName").value;
    var style = new LayerStyle();
    style.readSytleFromHtml();
    drawedLayers.push({
        name: name,
        style: style
    });
    var a = document.getElementById('setview').checked;
    drawByCityName(name, style, a);
}


function drawByCityName(cityName, layerStyle, isSetview) {


    var bdary = new BMap.Boundary();
    bdary.get(cityName, function (rs) { //获取行政区域
        //map.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (!rs.boundaries.length) {
            alert('未找到地区名')
        }
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], layerStyle); //建立多边形覆盖物
            map.addOverlay(ply); //添加覆盖物
            if (isSetview) {
                map.setViewport(ply.getPath()); //调整视野

            }
        }
    });
    document.getElementById('districtName').value = '';
}


function delLastLayer() {
    map.clearOverlays();

    for (var i = 0; i < drawedLayers.length - 1; i++) {
        var d = drawedLayers[i];

        drawByCityName(d.name, d.style, false);
    }
    var saveLastName = drawedLayers[drawedLayers.length - 1].name;
    document.getElementById('districtName').value = saveLastName;
    drawedLayers.pop();

}


function enter(e) {
    if (e.which == 13) {
        document.getElementById('bt').click();
    }

}

function showbSize() {
    document.getElementById('bsizenum').innerHTML = document.getElementById("bSize").value
}

function LayerStyle(bColor,
    fColor,
    bWeight,
    bOpacity,
    fOpacity,
    strokeStyle) {
    this.strokeColor = bColor;
    this.fillColor = fColor;
    this.strokeWeight = bWeight;
    this.strokeOpacity = bOpacity;
    this.fillOpacity = fOpacity;
    this.strokeStyle = strokeStyle

    this.readSytleFromHtml = function () {
        var bColor = document.getElementById("bColor").value;
        var bOpacity = document.getElementById("bOpacity").value / 100;
        if (bOpacity == 0) {
            bColor = "";
        }
        var fColor = document.getElementById("fColor").value;
        var fOpacity = document.getElementById("fOpacity").value / 100;
        if (fOpacity == 0) {
            fColor = "";
        }
        var bWeight = parseInt(document.getElementById("bSize").value);
        var strokeStyle = document.getElementById("strokeStyle").checked ? "dashed" : "solid"
        // debugger
        this.strokeColor = bColor;
        this.fillColor = fColor;
        this.strokeWeight = bWeight;
        this.strokeOpacity = bOpacity;
        this.fillOpacity = fOpacity;
        this.strokeStyle = strokeStyle


    }
}

function drawLayer(points, layerStyle) {

    for (var i = 0; i < count; i++) {
        var ply = new BMap.Polygon(rs.boundaries[i], style); //建立多边形覆盖物
        map.addOverlay(ply); //添加覆盖物
        map.setViewport(ply.getPath()); //调整视野
    }

}

function location_Points(locationName, points) {
    this.locationName = locationName;
    this.points = points;
}