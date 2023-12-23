"use client"; // This is a client component
import React from 'react'
import Image from 'next/image';
import { useState, useEffect } from 'react'

const Thala = () => {
  const [isThala, setIsThala] = useState(false)
  const [reason, setReason] = useState("")
  const [thalaValue, setThalaValue] = useState("")
  const [moyeSound] = useState(typeof Audio !== "undefined" && new Audio("/moye-moye.mp3"));
  const [thalaSound] = useState(typeof Audio !== "undefined" && new Audio("/thala-for-a-reason.mp3"));
  const [soundPlaying, setSoundPlaying] = useState(false)
  const [showGif, setShowGif] = useState(false)
  const [gifUrl, setGifUrl] = useState("")

  const onChange = (e) => {
    setThalaValue(e.target.value)
  }
  

  const onClickMe = async (e) => {
    // if thala value is blank then return
    if(thalaValue==="") {
      setReason("No Value Entered")
      return
    }

    // Preventing page to not reload
    e.preventDefault()

    // fetching data from API to check for THALA
    const data = await fetch("/api/getThalaValues", {
      method: "POST",
      body: JSON.stringify({thalaValue})
    })
    const response = await data.json()

    // Setting isThala and reason from API
    setIsThala(response.isThala)
    setReason(response.reason)
  }

  useEffect(() => {
    // Pausing sound if any sound playing in background
    if(soundPlaying) {
      moyeSound.pause()
      moyeSound.currentTime = 0

      thalaSound.pause()
      thalaSound.currentTime = 0

      setSoundPlaying(false)
    }

    // if thala value is blank then return
    if(thalaValue==="") {
      return
    }

    // Setting sound and GIF to be played
    if(isThala) {
      thalaSound.play()
      setSoundPlaying(true)
      setShowGif(true)
      setGifUrl('/thala-for-a-reason.gif')
    } else {
      moyeSound.play()
      setSoundPlaying(true)
      setShowGif(true)
      setGifUrl('/moye-moye.gif')
    }

    // Setting Thala Value back to empty
    setThalaValue("")
  }, [isThala, reason])
  

  return (
    <div>
        <input type="text" name="thalaValue" id="thalaValue" onChange={onChange} value={thalaValue}/>
        <button type="submit" onClick={onClickMe}>Click Me</button>
        {reason}
        {/* {isThala? audio.play():reason} */}
        {showGif? <Image src={gifUrl} width={200} height={200} alt={gifUrl}/>:""}
    </div>
  )
}

export default Thala