import React, { useRef } from "react"
import { useEffect, useState } from "react/cjs/react.development"
function Test() {
    const [text, setText] = useState('')
    const [count, setCount] = useState(0)
    const [timeRemaining , setTimeRemaining] = useState(false)
    const [time, setTime] = useState(10)
    const textBoxRef = useRef();
    

    function countWords(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }

    function handleChange(event) {
        setText(event.target.value)
    }
    function startGame(event) {
        textBoxRef.current.disabled = false;
        textBoxRef.current.focus();
        event.preventDefault();
        setTimeRemaining(true)
        setTime(10);
    }
    function endGame() {
        console.log(text);
        setCount(countWords(text))
        setTimeRemaining(false)
    }

    // timer
    useEffect(() => {
        if(time && timeRemaining){
             setTimeout(() => {
                setTime(time - 1)
            },1000)
        }
        if(time === 0){
            endGame()
        }
    }, [time , timeRemaining])



    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea 
                onChange = {handleChange}
                disabled = {!timeRemaining}
                ref = {textBoxRef}
            />
            <h2>Time remaining : {time}</h2>
            <button onClick={startGame}
                disabled = {timeRemaining}
            >
            START</button>
            <h1>Word Count : {count === 0 ? "???" : count}</h1>
        </div>
    )
}
export default Test