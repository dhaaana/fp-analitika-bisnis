import Image from 'next/image'
import styles from './page.module.css'
import * as tf from '@tensorflow/tfjs';

async function loadModel() {
  const model = await tf.loadLayersModel('./model/model.json');
  return 'haha'
}

export default async function Home() {
  const coba = await loadModel()
  return (
    <div>{coba}</div>
  )
}
