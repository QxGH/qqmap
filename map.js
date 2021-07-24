var qqmapKey = '6NNBZ-F7P3J-QLTFG-FQMOX-RCURZ-YVFM3'
var map = null, groundOverlay = null, markersArray = [], labelsArray = [], latlngs = [], polylineLayer = null;
var currentMarketDate = {}

function initMap() {
  map = new qq.maps.Map(document.getElementById("map"), {
    center: new qq.maps.LatLng(34.302623, 108.862049),
    zoom: 15,
    zoomControl: false,
    panControl: false,
    mapTypeControl: false,
    mapStyleId: 'style2'
  });
  groundOverlay = new qq.maps.GroundOverlay({
    map,
    imageUrl: './img/map_bg_2.png',
    bounds: new qq.maps.LatLngBounds(new qq.maps.LatLng(34.312201, 108.874794), new qq.maps.LatLng(34.293125, 108.849341)),
  });
  addMarkers()
}

/**
 * Marker
 */
function addMarkers() {
  let markerIcon = new qq.maps.MarkerImage(
    "./img/marker.png",
  );
  for (let i = 0; i < markerList.length; i++) {
    let item = markerList[i]
    let position = new qq.maps.LatLng(item.lat, item.lng)
    let marker = new qq.maps.Marker({
      position,
      map,
      icon: markerIcon
    });
    // let label = new qq.maps.Label({
    //   position,
    //   map,
    //   content: item.label
    // });
    markersArray.push(marker);
    // labelsArray.push(label);
    qq.maps.event.addListener(marker, 'click', function() {
      audioStop();
      currentMarketDate = item;
      hideMarkerInfoWindow();
      map.panTo(position);
      showMarkerInfoWindow();
    });
  }
}

function deleteMarkers() {
  if (markersArray) {
    for (let i in markersArray) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
}

function markerClickHandle(item, position) {
  
}

/**
 * MarkerInfoWindow
 */
function showMarkerInfoWindow() {
  $('#markerInfoWindow').fadeIn(150)
}

function hideMarkerInfoWindow() {
  $('#markerInfoWindow').fadeOut(150)
}


/**
 * path
 */
function addDirectionPath(path) {
  polylineLayer = new qq.maps.Polyline({
    map,
    strokeColor: '#2589ff',
    strokeWeight: 6,
    path
  });
  console.log("🚀 ~ file: map.js ~ line 73 ~ addDirectionPath ~ polylineLayer", polylineLayer)
}

function deleteDirectionPath() {
  if(polylineLayer) {
    polylineLayer.setMap(null)
    polylineLayer = null;
  }
}

function getDirectionData() {
  deleteDirectionPath();
  hideMarkerInfoWindow();
  let myLocation = getMyLocation(), targetLocation = `${currentMarketDate.lat},${currentMarketDate.lng}`;
  let formData = {
    from: myLocation,
    to: targetLocation,
    key: qqmapKey,
    output: 'jsonp'
  };
  $.ajax({
    type: "GET",
    dataType: 'jsonp',
    jsonp: "callback",
    jsonpCallback: "QQmap",
    url: 'https://apis.map.qq.com/ws/direction/v1/walking/',
    data: formData,
    success: function(res) {
      if(res.status == 0) {
        if(res.result.routes && res.result.routes.length > 0) {
          let polyline = res.result.routes[0].polyline;
          let path = getPolylineData(polyline)
          addDirectionPath(path)
        }
      } else {
        alert(res.message)
      }
    },
    error: function(err) {
      alert('error')
    }
  });
};

function getPolylineData(coors) {
  for (var i = 2; i < coors.length; i++) {
    coors[i] = coors[i - 2] + coors[i] / 1000000;
  }
  var data = [];
  for (var i = 0; i < coors.length; i++) {
    if (0 === i % 2) data.push(new qq.maps.LatLng(coors[i], coors[i + 1]));
  }
  return data;
};

function getMyLocation() {
  return '34.303717,108.860468'
}

$(function () {
  initMap()

  document.onmousedown = function (event) {
    let e = event || window.event;
    let elem = e.srcElement || e.target;
    while (elem) {
      if (elem.id == "markerInfoWindow" || (elem.classList && elem.classList.contains('csssprite'))) {
        return;
      }
      elem = elem.parentNode;
    }
    hideMarkerInfoWindow()
  }

})
