import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsemblyText from '../AsemblyText/index';
import { View, Pressable, Text, } from 'react-native';

export default function Gps() {

  const [getPermissionCoordinates, setGetPermissionCoordinates] = useState<boolean>(false);
  const [responceIcon, setResponceIcon] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean | string>('waiting');
  const [location, setLocation] = useState<{}>();
  const [responceText, setResponceText] = useState<string |null>('Waiting..');

  const getCoordinates = () => {
    setGetPermissionCoordinates(!getPermissionCoordinates);
  };

  const refreshGetGpsActive = async () => {
    let isActivate = await Location.hasServicesEnabledAsync();
    setIsActive(isActivate)
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      let isActivate = await Location.hasServicesEnabledAsync();
      setIsActive(isActivate);
      
      if (status !== 'granted' && getPermissionCoordinates === true) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setResponceText('Permission to access location was denied');
          setResponceIcon(false);
          setGetPermissionCoordinates(!getPermissionCoordinates);
          return;
        };
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
      setResponceIcon(true);
      setResponceText(JSON.stringify(userLocation));
    })();
  
  }, [Location, getPermissionCoordinates, isActive]);

  return (
    <View>
      <Pressable onPress={() => getCoordinates()}>
        <AsemblyText namePermissionRequired={"Gps"} permissionRequiredGranted={responceIcon} />
      </Pressable>
      <Text>{responceText}</Text>
      <Pressable onPress={() => refreshGetGpsActive()}>
        <Text>User Gps has Activate ={'>'} {`${isActive}`}</Text>
      </Pressable>
    </View>
  );
};
