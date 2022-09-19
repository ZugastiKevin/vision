import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import AsemblyText from '../AsemblyText/index';

export default function RecordCamera() {

  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState<null>(null);
  const [getPermissionCamera, setGetPermissionCamera] = useState<boolean>(false);
  const [getPermissionMicro, setGetPermissionMicro] = useState<boolean>(false);
  const [responceIconCamera, setResponceIconCamera] = useState<boolean>(false);
  const [responceIconMicro, setResponceIconMicro] = useState<boolean>(false);
  const [responceTextCamera, setResponceTextCamera] = useState<string |null>('Waiting..');
  const [responceTextMicro, setResponceTextMicro] = useState<string |null>('Waiting..');

  const getCamera = () => {
    setGetPermissionCamera(!getPermissionCamera);
  };

  const getMicro = () => {
    setGetPermissionMicro(!getPermissionMicro);
  };

  useEffect(() => {
    (async () => {
      let statusCam = await Camera.getCameraPermissionsAsync();
      let statusMic = await Camera.getMicrophonePermissionsAsync()



      if (statusMic.status === 'denied' && getPermissionMicro === true) {
        let { status } = await Camera.requestMicrophonePermissionsAsync();
        if (status !== 'granted') {
          setResponceTextMicro('Permission to access micro was denied');
          setResponceIcon(false);
          setGetPermissionCamera(!getPermissionMicro);
          return;
        };

        setResponceIconMicro(true);
      }
    })();
  }, [getPermissionCamera, getPermissionMicro]);

  return (
    <View>
      <Pressable onPress={() => getCamera()}>
        <AsemblyText namePermissionRequired={"Camera"} permissionRequiredGranted={responceIconCamera} />
      </Pressable>
      <Text>{responceTextCamera}</Text>
      <Pressable onPress={() => getMicro()}>
        <AsemblyText namePermissionRequired={"Micro"} permissionRequiredGranted={responceIconMicro} />
      </Pressable>
      <Text>{responceTextMicro}</Text>
    </View>
  );
};
