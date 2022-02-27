import React, { useState, useEffect, useRef } from 'react';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

import { Camera } from 'expo-camera';

import { Asset } from 'expo-asset';


// const model = downloadModel();
import { StyleSheet, Text, View, Button, Dimensions, Pressable, Modal, ActivityIndicator } from 'react-native';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const TensorCamera = cameraWithTensors(Camera);

const CameraScreen = ({ navigation }) => {
  const [tfReady, settfReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [model_tf, setModelTF] = useState();
  

  useEffect(() => {
    // tf.setBackend('cpu')
    tf.ready().then(() => {
      settfReady(true)
    });
    console.log("FINALIZANDO READY")
    
  });



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
      console.log("Carregando componentes")
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      class L2 {

        static className = 'L2';
    
        constructor(config) {
           return tf.regularizers.l1l2(config)
        }
    }
    tf.serialization.registerClass(L2);

    class Lambda extends tf.layers.Layer {
      constructor(config) {
        console.log(config)
        super({})
      }
    
      static get className() {
        return 'Lambda';
      }
    
       call(inputs, kwargs) {
        let input = inputs;
        if (Array.isArray(input)) {
          input = input[0];
        }
        this.invokeCallHook(inputs, kwargs);
        return input.pow(tf.tensor(2).toInt())
      }
    
    }
    
    tf.serialization.SerializationMap.register(Lambda);
  
      console.log("Carregando tf")
      await tf.ready();
      console.log("Carregando model json")
      const modelJson = require('../../../assets/model.json')
      console.log("Carregando model bin")
      const modelWeights = require('../../../assets/group.bin')
      console.log("Carregando model")
      const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
      console.log("Settando model")
      setModelTF(model)
      setModelReady(true)
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>null</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  renderPredictionBoxes = (predictionBoxes, predictionClasses, predictionScores) => {
      console.log("----------boxes----------")
      console.log(predictionBoxes)
      console.log("----------classes----------")
      console.log(predictionClasses)
      console.log("----------scores----------")
      console.log(predictionScores)
  }

  handleCameraStream = (images, updatePreview, gl) => {
    console.log('INICIANDO HANDLE')
    const loop = async () => {
      let tensor = images.next().value
      tensor = tensor.reshape([1, 416, 416, 3]).div(1.0);
      // model_tf.predict(tensor).print();
      let predictions = await model_tf.predict(tensor);
      // predictions.print();
      const labelPrediction = predictions.argMax().dataSync()[0];
      console.log("label is ${labelPrediction}")
      console.log(labelPrediction)
      tf.dispose(tensor);

      
      

      console.log("PREDICTED")
      // console.log(`prediction: ${JSON.stringify(res.dataSync())}`);
      // tf.dispose(bbox);
      requestAnimationFrame(loop);
    }
    loop();
  }

    return (
      <View style={styles.container}>
      {modelReady ? <TensorCamera
        ref={cameraRef}
        // Standard Camera props
        style={styles.camera}
        type={Camera.Constants.Type.back}
        // Tensor related props
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        onReady={handleCameraStream}
        resizeHeight={416}
        resizeWidth={416}
        resizeDepth={3}

     /> : <Text>Carregando Modelo</Text>}

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