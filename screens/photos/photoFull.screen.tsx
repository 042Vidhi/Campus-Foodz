import React from 'react';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

type FullScreenImageModalProps = {
  visible: boolean;
  imageUrl: string;
  onClose: () => void;
};

const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({
  visible,
  imageUrl,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        {/* Full-size Image */}
        <Image
          source={{ uri: imageUrl }}
          style={styles.fullSizeImage}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius:10,
  },
  closeButtonText: {
    fontSize: 10,
    color: '#333',
  },
  fullSizeImage: {
    width: '100%',
    height: '80%',
  },
});

export default FullScreenImageModal;
