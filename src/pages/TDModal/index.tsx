import {
  SafeAreaView,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Button
} from 'react-native';
import {styles} from './styles'

import React, { useEffect, useRef, useState } from 'react'


import { Canvas, useFrame } from '@react-three/fiber/native'

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


function Cube(props:any) {
  // Use useRef hook to access the mesh element
  const mesh=useRef<any>()

  // Jsx to render our 3d cube. Our cube will have height
  // width and depth equal 2 units. 
  // You also need a material so that you can add color
  // and show shadows. We are using the standard
  // material <<meshStandardMaterial /> 
  return (
          <mesh ref={mesh}>
             <boxGeometry args={[2,2,2]}/>
             <meshStandardMaterial /> 
          </mesh>

  )
}

// import TDM from './1.gltf'

// console.log('vTDM==',TDM)

function TDModal(): JSX.Element {
  // const obj = useLoader(OBJLoader, require('../../assets/tdm.obj'))
  // const gltf = useLoader(GLTFLoader, '/src/pages/TDModal/1.gltf')

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
     
     <Canvas>
     <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
      {/* <primitive object={obj} /> */}
      <directionalLight position={[0, 0, 5]} color="red" />
      {/* <primitive object={gltf.scene} /> */}
    </Canvas>

    </SafeAreaView>
  );
}

export default TDModal;
