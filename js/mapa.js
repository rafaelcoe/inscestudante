
var map;

require([
    "esri/map",
    "esri/dijit/BasemapToggle",
    "esri/dijit/Search",
    "esri/geometry/Extent",
    "esri/tasks/locator",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",

    "dojo/domReady!"
], function (
    Map, BasemapToggle, Search, Extent, Locator, Graphic, Point, SimpleMarkerSymbol, SimpleLineSymbol, Color
) {

    map = new Map("map", {
        center: [-38.50, -12.88],
        zoom: 12,
        basemap: "topo"
    });

    var locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

    //Botão para mudança da visualização do mapa
    var toggle = new BasemapToggle({
        map: map,
        basemap: "satellite"
    }, "BasemapToggle");

    toggle.startup();

    //Pesquisa do endereço
    search = new Search({
        sources: [{
            singleLineFieldName: "SingleLine",
            enableHighlight: false,
            locator: locator,
            name: "Street Base Geocoding",
            localSearchOptions: {
                minScale: 300000,
                distance: 500
            },
            placeholder: "Entre com um endere�o",
            maxResults: 10,
            maxSuggestions: 10,
            enableSuggestions: true,
            countryCode: "BR"
        }],
        map: map
    }, "search");
    //Limita o resultado da busca atraves do campo de pesquisa (quadrante de coordenadas geograficas)
    var extent = new Extent({
        "spatialReference": {
            "wkid": 4326
        },
        "xmin": -38.2,
        "xmax": -38.66,
        "ymin": -12.75,
        "ymax": -13.039
    });

    //limita a busca ao quadrante informado
    search.sources[0].searchExtent = extent;


    search.startup();


    symbol = new SimpleMarkerSymbol(
        SimpleMarkerSymbol.STYLE_X,
        15,
        new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([0, 0, 255, 0.5]),
            8
        ),
        new Color([0, 0, 255])
    );

    /*Evento para obter informações dos resultados selecionados referente ao geocode direto*/
    search.on("select-result", function (evt) {
        map.graphics.clear();
        var address = evt.result.feature.attributes;
        var location = evt.result.feature.geometry;

        //symbol.setColor(new Color("red"));

        var graphic = new Graphic(location, symbol, address);
        map.graphics.add(graphic);
        // map.graphics.graphics[0].symbol.color = new Color("red");
        var str = evt.result.name;
        var result = str.split(",");



        document.getElementById("logradouroGeo").value = result[0] || result[1];
        document.getElementById("municipioGeo").value = result[2];
        document.getElementById("ufGeo").value = result[3];
        document.getElementById("cepGeo").value = result[4];
        document.getElementById("longitudeGeo").value = location.getLongitude();
        document.getElementById("latitudeGeo").value = location.getLatitude();
        document.getElementById("scoreGeo").value = 0;
    });

    /*Evento para recuperar uma ação do mapa*/
    map.on("click", function (evt) {
        map.graphics.clear();
        search.clear();
        locator.locationToAddress(evt.mapPoint, 100);
    });

    //pesquisa do endereço e carregamento dos dados na janela
    locator.on("location-to-address-complete", function (evt) {
        if (evt.address.address) {
            var address = evt.address.address;
            var location = evt.address.location;

            var graphic = new Graphic(location, symbol, address);
            map.graphics.add(graphic);

            map.infoWindow.destroyDijits();
            map.infoWindow.setTitle("Resultado da pesquisa");
            map.infoWindow.setContent(graphic.attributes.LongLabel);

            var screenPnt = map.toScreen(location);
            map.infoWindow.resize(200, 200);
            map.infoWindow.show(screenPnt, map.getInfoWindowAnchor(screenPnt));

            symbol.setColor(new Color("green"));

            document.getElementById("logradouroGeo").value = address.Address;
            document.getElementById("municipioGeo").value = address.City;
            document.getElementById("ufGeo").value = address.Region;
            document.getElementById("cepGeo").value = address.Postal;
            document.getElementById("numeroGeo").value = address.AddNum;
            document.getElementById("bairroGeo").value = address.District;
            document.getElementById("longitudeGeo").value = location.getLongitude();
            document.getElementById("latitudeGeo").value = location.getLatitude();
            document.getElementById("scoreGeo").value = '100';

        }
    });
});