import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type PhotoScreenProps = {
  images: string[]; 
  onImagePress?: (imageUrl: string) => void;
};

const PhotoScreen: React.FC<PhotoScreenProps> = ({ images, onImagePress }) => {

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth / 2 - 15;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={false}
        numColumns={2}
        data={images}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() =>onImagePress?.(item) }>
            <Image
              source={{ uri: item }}
              style={[styles.image, { width: imageWidth, height: imageWidth }]}
            />
          </TouchableOpacity>
        )}
      />

    
    </View>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 5,
  },
  image: {
    margin: 5,
    borderRadius: 10,
  },
  
});
