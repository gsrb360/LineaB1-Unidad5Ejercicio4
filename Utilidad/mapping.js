var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
				+ '',
			maxZoom: 18
		});

		var map = L.map('map', {
			center: [0, 0],
			zoom: 3,
			layers: [osm],
			scrollWheelZoom: true,
		});

		var markers = L.markerClusterGroup();

		//Estilos - Pais

		function getColorPais(d) {
			return d > 50000000 ? '#67000D' :
				d > 25000000 ? '#B31218' :
					d > 12500000 ? '#DD2A25' :
						d > 10000000 ? '#F6573E' :
							d > 5000000 ? '#FC8666' :
								d > 2500000 ? '#FCB398' :
									d > 1000000 ? '#FEDCCD' :
										'#FFEAE1';
		};

		function stylePais(feature) {
			return {
				fillColor: getColorPais(feature.properties.pop_est),
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7
			};
		}


		//Estilos - Departamento

		function getColorDepartamento(d) {
			return d > 45000000000 ? '#00441B' :
				d > 25000000000 ? '#3DA75A' :
					d > 20000000000 ? '#B2E0AB' :
						'#DFFCD5';
		};

		function styleDepartamento(feature) {
			return {
				fillColor: getColorDepartamento(feature.properties.SHAPE_AREA),
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.8
			};
		}


		//Estilos - Ciudad

		var icon_Capital = L.icon({
			iconUrl: 'https://cdn-icons-png.flaticon.com/512/4230/4230622.png',
			iconSize: [20, 20],
			popupAnchor: [-1, -10]
		});

		var icon_Ciudad = L.icon({
			iconUrl: 'https://cdn-icons-png.flaticon.com/512/2942/2942149.png',
			iconSize: [20, 20],
			popupAnchor: [-1, -10]
		});

		function styleCiudad(feature, latlng) {
			return feature.properties.CAPITAL == 'S' ?
				markers.addLayer(L.marker(latlng, {
					icon: icon_Capital,
					draggable: false
				})) :
				markers.addLayer(L.marker(latlng, {
					icon: icon_Ciudad,
					draggable: false
				}));
		};


		//Capas		

		var paises = L.geoJson(pais, { style: stylePais });

		var departamentos = L.geoJson(departamento, { style: styleDepartamento });

		var ciudades = L.geoJson(ciudad, { pointToLayer: styleCiudad });

		paises.addTo(map);

		departamentos.addTo(map);

		ciudades.addTo(map);


		//Control Cluster

		map.addLayer(markers);

		//Control de capas

		var baseMaps = {
			"<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/1200px-Openstreetmap_logo.svg.png' height=15px, width=15px /> OSM": osm
		};
		var overlayMaps = {
			"<img src='https://cdn-icons-png.flaticon.com/512/2947/2947656.png' height=15px, width=15px /> Paises": paises,
			"<img src='https://cdn-icons-png.flaticon.com/512/993/993854.png' height=15px, width=15px /> Departamentos": departamentos,
			"<img src='https://cdn-icons-png.flaticon.com/512/2942/2942593.png' height=15px, width=15px /> Ciudades": ciudades
		};

		L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

		//Vsita de pajaro

		var osm2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
				+ 'contributors',
			maxZoom: 18
		});

		var miniMap = new L.Control.MiniMap(osm2, 
		{
			toggleDisplay: true,
			minimized: false,
			position: "bottomright"
		}
		).addTo(map);

		L.control.scale({
			position: 'bottomleft',
			imperial: false
		}).addTo(map);