import { Text } from 'react-native';
import Mapbox, { Camera, CircleLayer, Images, LocationPuck, MapView, ShapeSource, SymbolLayer } from '@rnmapbox/maps'
import { featureCollection, point } from '@turf/helpers';
import pin from '~/assets/pin.png';
import scooters from '~/data/scooters.json';
import { criticallyDampedSpringCalculations } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

export default function Map () {

    const points = scooters.map((scooter) => point([scooter.long, scooter.lat]))
    const scootersFeatures=featureCollection(points) 
    return (
    <MapView style={{flex:1}} styleURL='mapbox://styles/mapbox/dark-v11' >
        <Camera followZoomLevel={10} followUserLocation />
        <LocationPuck puckBearingEnabled puckBearing='heading' pulsing={{ isEnabled: true }} />

        <ShapeSource id='scooters' cluster shape={featureCollection(points)} 
        onPress={(e) => console.log(JSON.stringify(e, null, 2))}>
            <SymbolLayer
            id="clusters-count"
            style={{
                textField: ['get','point_count'],
                textColor: '#ffffff',
                textSize: 18,
                textPitchAlignment: 'map',
            }}
            />

            

            <CircleLayer 
            id = "clusters"
            belowLayerID='clusters-count'
            filter={['has', 'point_count']}
            style={{
            circleColor: '#43E100',
            circleRadius: 20,
            circleOpacity: 0.8,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
            circlePitchAlignment: 'map'

            }}
            />

            <SymbolLayer id='scooter-icons' 
            filter={['!', ['has', 'point_count']]}
            style={{
                iconImage: 'pin',
                iconSize: 0.5,
                iconAllowOverlap: true,
                iconAnchor: 'bottom',
            }}/>
            <Images images={{ pin }} />
        </ShapeSource>
    </MapView>
    );
}