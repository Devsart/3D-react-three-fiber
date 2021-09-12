import logo from './logo.svg';
import * as THREE from "three"
import { useRef, useEffect, Suspense } from 'react'
import './App.css';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, useAnimations, PointerLockControls } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import grass from "./assets/grass.jpg"
import { RectAreaLight } from 'three';


function Box(props){
  const [ref, api] = useBox(() => ({mass: 1,position: [0,1,3]}));
  return(
    <mesh onClick={() => {
      api.velocity.set(0,3,0);
    }} ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  )
}

function Plane(props) {
  const [ref] = usePlane(()=>({
    rotation: [-Math.PI/2 , 0, 0]
  }));
  const texture = useLoader(THREE.TextureLoader, grass);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return(
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[1000,1000]} />
      <meshLambertMaterial map={texture} map-repeat={[20, 20]} attach="material" color="lightblue" />
    </mesh>
  )
}

function Flamingo(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('Flamingo.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        onClick = {() => actions.add()}
        name="mesh_0"
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
        morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload('/RobotExpressive.glb')
function RobotExpressive(props) {
  const { scene, animations } = useGLTF('/RobotExpressive.glb')
  const { actions } = useAnimations(animations, scene)
  useEffect(() => {
    actions.Idle.play()
    scene.traverse((obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))
  }, [actions, scene])
  return <primitive object={scene} {...props}  onClick={() => {
    actions.ThumbsUp.play();
    setTimeout(function(){
      actions.ThumbsUp.stop();
    },1500)}}
    />
}

function Robot(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/RobotExpressive.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <primitive object={nodes.Bone} />
      </group>
      <group position={[0, 2.37, -0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <skinnedMesh
          geometry={nodes.HandR_1.geometry}
          material={nodes.HandR_1.material}
          skeleton={nodes.HandR_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.HandR_2.geometry}
          material={nodes.HandR_2.material}
          skeleton={nodes.HandR_2.skeleton}
        />
      </group>
      <group position={[0, 2.37, -0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <skinnedMesh
          geometry={nodes.HandL_1.geometry}
          material={nodes.HandL_1.material}
          skeleton={nodes.HandL_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.HandL_2.geometry}
          material={nodes.HandL_2.material}
          skeleton={nodes.HandL_2.skeleton}
        />
      </group>
    </group>
  )
}

function App() {
  return (
    <Canvas className="App-header" camera={{ position: [0,9,13] }} onKeyPressCapture={function handlePress(e){
      console.log(e.keyCode)

    }}>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10,15,10]}
        angle={0.3}
       />
      <Suspense fallback={null}>
      </Suspense>
      <Physics>
        <RobotExpressive />
        <Box />
        <Plane/>
      </Physics>
    </Canvas>
  );
}

export default App;
