/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

function Flamingo(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./Flamingo.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name="mesh_0"
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
        morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
        morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload('./Flamingo.glb')
export default Flamingo;