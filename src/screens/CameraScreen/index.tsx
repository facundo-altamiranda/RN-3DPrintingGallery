import React, {useCallback, useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

import {CAPTURE_BUTTON_SIZE, RED_COLOR} from '../../constants';
import {Navigation} from 'types';
import Loading from 'components/Loading';

interface CameraScreenProps {
  navigation: Navigation<'CameraScreen'>;
}

function CameraScreen({navigation}: CameraScreenProps): JSX.Element {
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const devices = useCameraDevices();
  const device = devices.back;

  const takePhoto = useCallback(async () => {
    try {
      if (!cameraRef.current) {
        throw new Error('Camera ref is null!');
      }

      const photo = await cameraRef.current.takePhoto();
      navigation.navigate('PhotoReviewScreen', {photo: photo.path});
    } catch (error) {
      throw new Error(error as string);
    }
  }, [cameraRef, navigation]);

  if (!device) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        {isFocused && (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            orientation="portrait"
            photo={true}
          />
        )}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={takePhoto}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? RED_COLOR : 'transparent',
              },
              styles.pressable,
            ]}>
            <View style={styles.button} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  buttonContainer: {
    bottom: 10,
    position: 'absolute',
    width: '100%',
  },
  pressable: {
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
  button: {
    borderColor: 'white',
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: CAPTURE_BUTTON_SIZE * 0.1,
    height: CAPTURE_BUTTON_SIZE,
    marginLeft: 'auto',
    width: CAPTURE_BUTTON_SIZE,
  },
});

export default CameraScreen;
