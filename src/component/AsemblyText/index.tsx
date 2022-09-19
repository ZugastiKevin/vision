import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';
import ValidateSign from '../../../assets/circle-check-solid.png';
import DeniedSign from '../../../assets/triangle-exclamation-solid.png';

export default function AsemblyText(props: { namePermissionRequired: string; permissionRequiredGranted: boolean; }) {

  const [responceIcon, setResponceIcon] = useState(DeniedSign);

  useEffect(() => {
    if (props.permissionRequiredGranted === true) {
      setResponceIcon(ValidateSign);
    };
  }, [props.permissionRequiredGranted]);

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>
        Permission for access { props.namePermissionRequired } 
      </Text>
      <Image style={styles.containerImage} source={responceIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerText: {
    textAlign: 'center',
    marginRight: 3,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  containerImage: {
    marginTop: 5,
    width: 40,
    height: 40,
  },
});