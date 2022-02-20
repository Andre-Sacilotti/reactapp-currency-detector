import React, { useState, useEffect, useRef } from 'react';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import yolo, { downloadModel } from 'tfjs-yolo-tiny';

import '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs-core';

import { Camera } from 'expo-camera';

// const model = downloadModel();
import { StyleSheet, Text, View, Button, Dimensions, Pressable, Modal, ActivityIndicator } from 'react-native';

const TensorCamera = cameraWithTensors(Camera);

const CameraScreen = ({ navigation }) => {
  

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  let textureDims;
  if (Platform.OS === 'ios') {
    textureDims = {
      height: 1920,
      width: 1080,
    };
  } else {
    textureDims = {
      height: 1200,
      width: 1600,
    };
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      // await tf.ready();

    })();
  }, []);

  if (hasPermission === null) {
    return <Text>null</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // const getPrediction = async (tensor) => {
  //   if (!tensor) {
  //     return;
  //   }

  //   const boxes = await yolo(tensor, model);
  //   console.log(`prediction: ${JSON.stringify(boxes)}`);

  //   // if (!prediction || prediction.length === 0) {
  //   //   cancelAnimationFrame(requestAnimationFrameId);
  //   //   console.log("no predictions found");
  //   //   setPredictionFound(false);
  //   //   return;
  //   // } else {
  //   //   setPredictionFound(true);
  //   // }
  // };

  handleCameraStream = (images, updatePreview, gl) => {
    const loop = async () => {
      const nextImageTensor = images.next().value
      await getPrediction(nextImageTensor);
      requestAnimationFrame(loop);
    }
    loop();
  }

    return (
      <View style={styles.container}>
      
      <TensorCamera
        ref={cameraRef}
        // Standard Camera props
        style={styles.camera}
        type={Camera.Constants.Type.back}
        // Tensor related props
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={50}
        resizeWidth={50}
        resizeDepth={3}
        onReady={(imageAsTensors) => console.log("aa")}
        autorender={true}
      />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  camera: {
    width: '75%',
    height: '50%',
    left: '12.5%',
    top: '10%'
  },
  captureButton: {
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 50,
    bottom: 40,
    width: 100,
    zIndex: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 24,
    backgroundColor: 'gray',
  },
  dismissButton: {
    width: 150,
    height: 50,
    marginTop: 60,
    borderRadius: 24,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
export default CameraScreen;