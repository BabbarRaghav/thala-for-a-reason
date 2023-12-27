"use client"; // This is a client component
import React from 'react'
import Image from 'next/image';
import { useState, useEffect } from 'react'
import Confetti from 'react-dom-confetti';


const Thala = () => {
  const [isThala, setIsThala] = useState(false)
  const [reason, setReason] = useState("")
  const [thalaValue, setThalaValue] = useState("")
  const [moyeSound] = useState(typeof Audio !== "undefined" && new Audio("/moye-moye.mp3"));
  const [thalaSound] = useState(typeof Audio !== "undefined" && new Audio("/thala-for-a-reason.mp3"));
  const [soundPlaying, setSoundPlaying] = useState(false)
  const [showGif, setShowGif] = useState(false)
  const [gifUrl, setGifUrl] = useState("")

  const confettiConfig = {
    angle: "180",
    spread: 360,
    startVelocity: "30",
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const onChange = (e) => {
    setThalaValue(e.target.value)
  }


  const onClickMe = async (e) => {
    // if thala value is blank then return
    if (thalaValue === "") {
      setReason("No Value Entered")
      return
    }

    // Preventing page to not reload
    e.preventDefault()

    // fetching data from API to check for THALA
    const data = await fetch("/api/getThalaValues", {
      method: "POST",
      body: JSON.stringify({ thalaValue })
    })
    const response = await data.json()

    // Setting isThala and reason from API
    setIsThala(response.isThala)
    setReason(response.reason)
  }

  useEffect(() => {
    // Pausing sound if any sound playing in background
    if (soundPlaying) {
      moyeSound.pause()
      moyeSound.currentTime = 0

      thalaSound.pause()
      thalaSound.currentTime = 0

      setSoundPlaying(false)
    }

    // if thala value is blank then return
    if (thalaValue === "") {
      return
    }

    // Setting sound and GIF to be played
    if (isThala) {
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
    <div className='w-full h-screen flex flex-col justify-center items-center max-w-md mx-auto'>
      <div className='text-3xl font-bold'>Thala For A Reason Checker</div>
      <div className="relative z-0 w-full mb-5 group mt-8">
        <input type="text" id="thalaValue" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3 + 4" onChange={onChange} value={thalaValue} required />
      </div>
      <Confetti active={isThala} config={confettiConfig} />
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onClickMe}>Click Me</button>

      <a href="https://www.instagram.com/babbarraghav6/" target="_blank" rel="noopener noreferrer" className='text-purple-500 m-7'>Made by Raghav ❤️</a>

      {reason !== "" && (isThala ?
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 mt-5" role="alert">
          {reason} Thala For A Reason
        </div> :
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-5" role="alert">
          {reason} 😭
        </div>
      )}

      {/* {isThala? audio.play():reason} */}
      {showGif ? <Image src={gifUrl} width="0" height="0" style={{ width: '500px', height: '500px' }} alt={gifUrl} /> : ""}
    </div>
  )
}

export default Thala