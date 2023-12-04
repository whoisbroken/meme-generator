import React from 'react'
import { useState,useEffect } from 'react'
import "./Meme.css"
// import memesData from "../memesData.js"
const Meme = () => {

    const [meme,setMeme] = useState({
        topText : "",
        bottomText : "",
        randomImage : "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImages, setAllMemeImages] = useState([])
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data=> setAllMemeImages(data))
    },[])
    const getMemeImage = () => {
        const memes = allMemeImages.data.memes
        const i = Math.floor(Math.random() * memes.length)
        const memeUrl = memes[i].url
        
        setMeme(prev => ({...prev,randomImage:memeUrl}))
    }
    const handleChange = (event) => {
        const {value,name} = event.target
        setMeme(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <main>
            <div className='form'>
                <div className='container'>
                    <input type='text' placeholder='Top Text' name="topText" value={meme.topText} onChange={handleChange}></input>
                    <input type='text' placeholder='Bottom Text' name="bottomText" value={meme.bottomText} onChange={handleChange}></input>
                </div>
                <button onClick={getMemeImage}>Get a new meme image  🖼</button>
            </div>
            <div className='meme-container'>
            
                <img className="meme" src={meme.randomImage} alt="meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme