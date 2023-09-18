import {BLUE_COLOR, PHOTOS_DIRECTORY_PATH, RED_COLOR} from '../../constants';
import React from 'react';
import {Text, Image, Pressable, View, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';
import {Navigation, Route} from 'types';

interface PhotoReviewScreenProps {
  navigation: Navigation<'PhotoReviewScreen'>;
  route: Route<'PhotoReviewScreen'>;
}

function PhotoReviewScreen({
  navigation,
  route,
}: PhotoReviewScreenProps): JSX.Element {
  const {photo} = route.params;

  const savePhoto = async () => {
    const pathSegments = photo.split('/');
    const fileName = pathSegments[pathSegments.length - 1];
    const filePath = `${PHOTOS_DIRECTORY_PATH}/${fileName}`;

    await RNFS.mkdir(PHOTOS_DIRECTORY_PATH);
    await RNFS.copyFile(photo, filePath)
      .then(() => navigation.navigate('GalleryScreen'))
      .catch(error => {
        throw new Error(error);
      });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.photoPreview} source={{uri: 'file://' + photo}} />
      <View style={styles.buttonsContainer}>
        <Pressable onPress={handleGoBack} style={styles.rejectButton}>
          <Text style={styles.rejectTextButton}>Reject</Text>
        </Pressable>
        <Pressable onPress={savePhoto} style={styles.acceptButton}>
          <Text style={styles.acceptTextButton}>Accept</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  acceptButton: {
    alignItems: 'center',
    backgroundColor: BLUE_COLOR,
    flex: 1,
    justifyContent: 'center',
    width: '50%',
  },
  acceptTextButton: {
    color: 'white',
    fontSize: 16,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '6%',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  photoPreview: {
    height: '94%',
    width: '100%',
  },
  rejectButton: {
    alignItems: 'center',
    backgroundColor: RED_COLOR,
    flex: 1,
    justifyContent: 'center',
    width: '50%',
  },
  rejectTextButton: {
    color: 'white',
    fontSize: 16,
  },
});

export default PhotoReviewScreen;
