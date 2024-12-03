import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

const ModelWithMouseInteraction = ({ modelPath }) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use GLTFLoader to load the model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        setModel(gltf.scene); // Store the loaded model
        setLoading(false); // Set loading to false once model is loaded
      },
      undefined, // Optional: progress handler
      (error) => {
        console.error('Error loading model:', error);
        setLoading(false); // Set loading to false in case of error
      }
    );
  }, [modelPath]);

  if (loading) {
    return <div>Loading model...</div>;
  }

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* Add the loaded model to the scene */}
      <primitive object={model} scale={[0.5, 0.5, 0.5]} />
      {/* Add orbit controls for mouse interaction */}
      <OrbitControls />
    </Canvas>
  );
};

export default ModelWithMouseInteraction;
