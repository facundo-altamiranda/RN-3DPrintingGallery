import React, {useCallback, useEffect, useState} from 'react';
import {Image, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import RNFS from 'react-native-fs';

import {BLUE_COLOR, PHOTOS_DIRECTORY_PATH, RED_COLOR} from '../../constants';
import {Navigation, Photo} from 'types';
import FloatingActionButton from 'components/FloatingActionButton';
import {Camera} from 'react-native-vision-camera';

interface GalleryProps {
  navigation: Navigation<'GalleryScreen'>;
}

function GalleryScreen({navigation}: GalleryProps): JSX.Element {
  const isFocused = useIsFocused();
  const [photos, setPhotos] = useState<Photo[] | []>([]);

  const handleCameraNavigation = () => {
    navigation.navigate('CameraScreen');
  };

  const handleDelete = async () => {
    const exists = await folderExists();

    if (exists) {
      await RNFS.unlink(PHOTOS_DIRECTORY_PATH);
    }

    setPhotos([]);
  };

  const folderExists = useCallback(async () => {
    const exists = await RNFS.exists(PHOTOS_DIRECTORY_PATH);

    return !!exists;
  }, []);

  const getPhotos = useCallback(async () => {
    const photosDirectory = await RNFS.readDir(PHOTOS_DIRECTORY_PATH);
    const savedPhotos = photosDirectory?.map(savedPhoto => ({
      name: savedPhoto.name,
      path: savedPhoto.path,
    }));

    setPhotos(savedPhotos);
  }, []);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  useEffect(() => {
    const getFolderPhotos = async () => {
      const exists = await folderExists();

      if (isFocused && exists) {
        getPhotos();
      }
    };

    getFolderPhotos();
  }, [folderExists, getPhotos, isFocused]);

  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  return (
    <SafeAreaView style={styles.container}>
      {!!photos?.length && (
        <ScrollView style={styles.galleryContainer}>
          <View style={styles.gallery}>
            {photos?.map(photo => (
              <View key={photo.name} style={styles.photoContainer}>
                <Image
                  source={{uri: 'file://' + photo.path}}
                  style={styles.photo}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      {!photos?.length && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No photos yet!</Text>
          <Text style={styles.emptySubtitle}>
            Add new photos with the plus button
          </Text>
        </View>
      )}
      <FloatingActionButton
        onPress={handleDelete}
        buttonStyle={styles.deleteButton}>
        <Text style={styles.deleteTextButton}>Delete</Text>
      </FloatingActionButton>
      <FloatingActionButton
        onPress={handleCameraNavigation}
        buttonStyle={styles.cameraButton}>
        <Text style={styles.cameraTextButton}>+</Text>
      </FloatingActionButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: BLUE_COLOR,
  },
  cameraTextButton: {
    color: 'white',
    fontSize: 30,
  },
  container: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: RED_COLOR,
    bottom: 100,
  },
  deleteTextButton: {
    color: 'white',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptySubtitle: {
    fontSize: 20,
    marginTop: 8,
  },
  emptyTitle: {
    color: 'black',
    fontSize: 28,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  galleryContainer: {
    flexDirection: 'column',
  },
  photo: {
    height: 200,
    objectFit: 'fill',
  },
  photoContainer: {
    width: '50%',
  },
});

export default GalleryScreen;
