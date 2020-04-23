var esriLeafletMap = (function () {
  var init = function () {
    var map = L.map("map").setView([46.5, -94], 6);
    L.esri.basemapLayer("Topographic").addTo(map);
    //L.esri.basemapLayer('Streets').addTo(map);

    var siteIcon = L.icon({
      iconUrl: "MNMapPin.svg",
      iconSize: [20, 20],
    });

    map.createPane("sites");

    var testingSites = L.esri.featureLayer({
      url: "https://arcgis.metc.state.mn.us/arcgis/rest/services/covid/TestCollectionLocations/MapServer/0/",
      where: "1=1",
      pointToLayer: function (geojson, latlng) {
        return L.marker(latlng, {
          icon: siteIcon,
          renderer: L.svg(),
        });
      },
    });
    map.addLayer(testingSites);
    testingSites.bindPopup(function (layer) {
      var l = layer.feature.properties;
      var template =
            "{ HealthSystem }" +
            "<br/><strong> { CollectSiteName }</strong> " +
            "<br/>{ CollectAddress1 } { CollectAddress2 }" +
            "<br/>{ City }, { State } { Zip }" +
            "<br/><strong>Sun</strong> { HoursOfOpSatSun }" +
            "<br/><strong>Mon</strong> { HoursOfOpMF }" +
            "<br/><strong>Tue</strong> { HoursOfOpMF }" +
            "<br/><strong>Wed</strong> { HoursOfOpMF }" +
            "<br/><strong>Thu</strong> { HoursOfOpMF }" +
            "<br/><strong>Fri</strong> { HoursOfOpMF }" +
            "<br/><strong>Sat</strong> { HoursOfOpSatSun }" +
            "<br/><strong>Contact Info: { Phone }</strong>";
      return L.Util.template(template, layer.feature.properties);
    }, { maxWidth: 550 });
  };
  return {
    init: init,
  };
})();
esriLeafletMap.init();
