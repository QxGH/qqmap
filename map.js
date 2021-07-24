var map = null, markersArray = [], labelsArray = [], latlngs = [];

function initMap() {
  map = new qq.maps.Map(document.getElementById("map"), {
    // 地图的中心地理坐标。
    center: new qq.maps.LatLng(34.302623,108.862049),
    zoom: 15
  });
  var groundOverlay = new qq.maps.GroundOverlay({
    map,
    imageUrl: './img/map_bg_2.png',
    bounds: new qq.maps.LatLngBounds(new qq.maps.LatLng(34.312201,108.874794), new qq.maps.LatLng(34.293125,108.849341)),
  });

  let markerIcon = new qq.maps.MarkerImage(
    "./img/marker.png",
  );
  for(let a=0; a<markerList.length; a++) {
    (function(b) {
      console.log(markerList[b])
      let item = markerList[b]
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
        map.panTo(position);
      });
    })(a)
    
  }
}

$(function() {
  initMap()
})
