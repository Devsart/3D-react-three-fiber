/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
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

useGLTF.preload('/RobotExpressive.glb')
