import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
  Modal
} from 'react-native';
import FullScreenImageModal from '@/screens/photos/photoFull.screen'; // Import the modal
import PhotoScreen from '@/screens/photos/photos.screen'; // Import PhotoScreen

type CustomerPhotosProps = {
  photos: string[];
};

const CustomerPhotos: React.FC<CustomerPhotosProps> = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [gridModalVisible, setGridModalVisible] = useState(false);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const openGridModal = () => {
    setGridModalVisible(true);
  };

  const onImagePress = (imageUrl: string) => {
    openModal(imageUrl); // Open full-size image modal
  };

  const renderPhoto: ListRenderItem<string> = ({ item, index }) => {
    if (photos.length > 3 && index === 2) {
      return (
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={openGridModal}
        >
          <Image source={{ uri: item }} style={styles.photo} resizeMode="cover" />
          {photos.length > 3 && (
            <View style={styles.moreOverlay}>
              <Text style={styles.moreText}>+{photos.length - 3}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => openModal(item)} // Open modal with full-size image
      >
        <Image source={{ uri: item }} style={styles.photo} resizeMode="cover" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photos.slice(0, 3)}
        horizontal
        renderItem={renderPhoto}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />

      {/* Full-screen Image Modal */}
      {selectedImage && (
        <FullScreenImageModal
          visible={modalVisible}
          imageUrl={selectedImage}
          onClose={closeModal}
        />
      )}

      {/* Grid Modal */}
      { gridModalVisible &&
      (
       
        <Modal visible={gridModalVisible} 
          animationType='slide'
          transparent={true}
          onRequestClose={()=>{setGridModalVisible(!gridModalVisible)}}
          
          >
        <TouchableOpacity 
        onPress={()=>{setGridModalVisible(!gridModalVisible)}} 
        style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        
        
          <PhotoScreen images={photos} onImagePress={onImagePress}/>
        
      </Modal>
     
      )
      }
      
    </View>
  );
};

export default CustomerPhotos;

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 10,
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  moreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 20, 
    marginTop: 10,
    marginBottom:8,
    backgroundColor: '#868686',
    zIndex: 1,
    padding: 8,
    borderRadius:10,
  },
  closeButtonText: {
    fontSize: 10,
    color: '#fff',
  },
});
