import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import AsemblyText from '../AsemblyText/index';
import { View, Pressable, Text, Button, StyleSheet, } from 'react-native';

export default function RecordingSounds() {

  const [recording, setRecording] = useState<{} | null>();
  const [recordings, setRecordings] = useState<[] | [{}] | undefined>('');
  const [refreshAfterDelete, setRefreshAfterDelete] = useState<boolean>(false);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    };
  };

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);
  };

  function getDurationFormatted(millis: number) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  function refreshAfterDeleting() {
    setRefreshAfterDelete(!refreshAfterDelete);
  };

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button onPress={() => ( recordings.splice(index)) && refreshAfterDeleting()} title='delete'></Button>
        </View>
      )
    });
  };

  useEffect(() => {
      
  }, [ refreshAfterDelete, ]);


  return (
    <View>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recordings ? getRecordingLines() : <Text></Text> }
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  fill: {
    flex: 1,
  },
});
