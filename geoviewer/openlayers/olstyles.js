var geojson_gen = {
    'type': 'FeatureCollection',
    'crs': { 'type': 'name', 'properties': { 'name': 'EPSG:3857' } },
    'features': [
      //{
      //  'type': 'Feature',
      //  'geometry': {
      //    'type': 'LineString',
      //    'coordinates': [[2.7e6, -1.9e6], [2.5e6, -1.5e6], [3.4e6, -1.1e6], [3.6e6, -1.55e6]]
      //  }
      //},
      {
          'type': 'Feature',
          'geometry': {
              'type': 'Point',
              'coordinates': [3000000, -1700000]
          }
      },
      {
          'type': 'Feature',
          'geometry': {
              'type': 'LineString',
              'coordinates': [[2.4e6, -1.6e6], [2.0e6, -2.05e6], [3.8e6, -2.05e6], [3.8e6, -1.4e6]]
          }
      },
      //{
      //    'type': 'Feature',
      //    'geometry': {
      //        'type': 'Point',
      //        'coordinates': [3000000, -1700000]
      //    }
      //},
    ]
};

var ol_example_geojsonObject = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:3857'
        }
    },
    'features': [
      {
          'type': 'Feature',
          'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
          }
      },
      {
          'type': 'Feature',
          'geometry': {
              'type': 'LineString',
              'coordinates': [[4e6, -2e6], [8e6, 2e6]]
          }
      },
      {
          'type': 'Feature',
          'geometry': {
              'type': 'LineString',
              'coordinates': [[4e6, 2e6], [8e6, -2e6]]
          }
      },
      {
          'type': 'Feature',
          'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]]]
          }
      },
      {
          'type': 'Feature',
          'geometry': {
              'type': 'MultiLineString',
              'coordinates': [
                [[-1e6, -7.5e5], [-1e6, 7.5e5]],
                [[1e6, -7.5e5], [1e6, 7.5e5]],
                [[-7.5e5, -1e6], [7.5e5, -1e6]],
                [[-7.5e5, 1e6], [7.5e5, 1e6]]
              ]
          }
      },
      {
          'type': 'Feature',
          'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [[[-5e6, 6e6], [-5e6, 8e6], [-3e6, 8e6], [-3e6, 6e6]]],
                [[[-2e6, 6e6], [-2e6, 8e6], [0, 8e6], [0, 6e6]]],
                [[[1e6, 6e6], [1e6, 8e6], [3e6, 8e6], [3e6, 6e6]]]
              ]
          }
      },
      {
          'type': 'Feature',
          'geometry': {
              'type': 'GeometryCollection',
              'geometries': [
                {
                    'type': 'LineString',
                    'coordinates': [[-5e6, -5e6], [0, -5e6]]
                },
                {
                    'type': 'Point',
                    'coordinates': [4e6, -5e6]
                },
                {
                    'type': 'Polygon',
                    'coordinates': [[[1e6, -6e6], [2e6, -4e6], [3e6, -6e6]]]
                }
              ]
          }
      }
    ]
};

var ol_styles = {
    //'Point': [new ol.style.Style({
    //    image: image
    //})],

    'LineString': [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    })],
    'MultiLineString': [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    })],
    //'MultiPoint': [new ol.style.Style({
    //    image: image
    //})],
    'MultiPolygon': [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    })],
    'Polygon': [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    })],
    'GeometryCollection': [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'magenta'
        }),
        image: new ol.style.Circle({
            radius: 10,
            fill: null,
            stroke: new ol.style.Stroke({
                color: 'magenta'
            })
        })
    })],
    'Circle': [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })]
};

