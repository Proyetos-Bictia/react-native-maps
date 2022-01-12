import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import LoadingScreen from '../pages/LoadingScreen'
import Fab from './Fab'

const Map = () => {
    const {
        hasLocation,
        initialPosition,
        userLocation,
        routeLines,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation
    } = useLocation();

    const [showPolyline, setShowPolyline] = useState(true);

    const mapViewRef = useRef<MapView>();
    const following = useRef(true);

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {
        if (!following.current) return
        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude },
        })
    }, [userLocation]);

    const centerPosition = async () => {
        following.current = true;
        mapViewRef.current?.animateCamera({
            center: await getCurrentLocation(),
        })
    }

    if (!hasLocation) {
        return <LoadingScreen />
    }

    return (
        <>

            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={{ flex: 1 }}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={() => following.current = false}
            >
                {
                    showPolyline && (
                        <Polyline
                            coordinates={routeLines}
                            strokeColor='black'
                            strokeWidth={3}
                        />
                    )
                }
                {/* <Marker
                    image={require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title='Esto es un título'
                    description='Esto es una descripción del marcador'
                /> */}
            </MapView>

            <Fab
                iconName='compass-outline'
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />

            <Fab
                iconName='brush-outline'
                onPress={() => setShowPolyline(value => !value)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                }}
            />
        </>
    )
}

export default Map

const styles = StyleSheet.create({})
