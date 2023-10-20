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


function TDModal(): JSX.Element {
  const obj:any = useLoader(OBJLoader, '/d.obj',(loader:any)=>{

  })
  // const gltf = useLoader(GLTFLoader, './1.glft')

  return (
    <SafeAreaView style={{
      flex: 1
    }}>


<primitive object={obj} />
        {/* <primitive object={gltf.scene} /> */}

      {/* <Canvas>
        <ambientLight />

        <primitive object={obj} />
      </Canvas> */}
    </SafeAreaView>
  );
}

export default TDModal;
