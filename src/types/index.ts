import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type StackParamList = {
  CameraScreen: undefined;
  GalleryScreen: undefined;
  PhotoReviewScreen: {
    photo: string;
  };
};

export type Navigation<T extends keyof StackParamList> =
  NativeStackNavigationProp<StackParamList, T>;

export type Route<T extends keyof StackParamList> = RouteProp<
  StackParamList,
  T
>;

export type Photo = {
  name: string;
  path: string;
};
