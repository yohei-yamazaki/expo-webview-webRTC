import React from 'react'
import { useState, useRef } from 'react'
import Peer from 'skyway-js'

import config from './config/variables.json'

const peer = new Peer({ key: config["sky-way-api-key"], debug: 3 })

export const App = () => {
  const [myId, setMyId] = useState('')
  const [callId, setCallId] = useState('')
  const localVideo = useRef(null)
  const remoteVideo = useRef(null)

  peer.on('open', () => {
    setMyId(peer.id)
    navigator.mediaDevices.getUserMedia({video: true, audio: true }).then(localStream => {
      // @ts-ignore
      localVideo.current.srcObject = localStream
    })
  })

  peer.on('call', mediaConnection => {
      // @ts-ignore
    mediaConnection.answer(localVideo.current.srcObject)

    mediaConnection.on('stream', async stream => {
      // @ts-ignore
      remoteVideo.current.srcObject = stream
    })
  })

  const makeCall = () => {
      // @ts-ignore
    const mediaConnection = peer.call(callId, localVideo.current.srcObject)
    mediaConnection.on('stream', async stream => {
      // @ts-ignore
      remoteVideo.current.srcObject = stream
      // @ts-ignore
      await remoteVideo.current.play().catch(console.error)
    })
  }
  return (
    <div>
      <div>skyway test</div>
      <div><video width="400px" autoPlay muted playsInline ref={localVideo}></video></div>
      <div>{myId}</div>
      <div>
        <input value={callId} onChange={e => setCallId(e.target.value)}></input>
        <button onClick={makeCall}>発信</button>
      </div>
      <div><video width="400px" autoPlay muted playsInline ref={remoteVideo}></video></div>
    </div>
  )
}
