import { useCallback, useEffect, useRef, useState } from "react"
import { FaClipboard } from "react-icons/fa6";
import './style.css'

function App() {

  const [length, setlength] = useState(8)
  const [numbers, setnumbers] = useState(false)
  const [charcter, setcharcter] = useState(false)
  const [uppercase, setuppercase] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyz"

    if (charcter) str += "!@#$%^&*"
    if (numbers) str += "0123456789"
    if (uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [numbers, charcter, length, uppercase]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbers, charcter, uppercase])
  return (
    <div className="container">
      <div className="heading">
        <h2>Password Generator</h2>
      </div>
      <div className="answer">
        <input type="text" id="result" value={password} readOnly ref={passwordRef} />
        <button className="btn" onClick={copyPassword}>{<FaClipboard></FaClipboard>}</button>
      </div>
      <div className="settings">
        <div className="options">
          <label htmlFor="slide">Password Length</label>
          <input type="range" name="" className="slider" id="slide" min="4" max="30" value={length} onChange={(e) => setlength(e.target.value)} />
          <div>{length < 10 ? `0${length}` : length}</div>
        </div>
        <div className="options">
          <div>Include Uppercase</div>
          <div className="toggel-container">
            <input type="checkbox" id="uppercase" onClick={() => setuppercase(prev => !prev)} />
            <label htmlFor="uppercase" id="toggel">
              <div className="circle"></div>
            </label>
          </div>
        </div>
        <div className="options">
          <div>Include Symbols</div>
          <div className="toggel-container">
            <input type="checkbox" id="symbols" onClick={() => setcharcter(prev => !prev)} />
            <label htmlFor="symbols" id="toggel">
              <div className="circle"></div>
            </label>
          </div>
        </div>
        <div className="options">
          <div>Include Numbers</div>
          <div className="toggel-container">
            <input type="checkbox" id="numbers" onClick={() => setnumbers(prev => !prev)} />
            <label htmlFor="numbers" id="toggel">
              <div className="circle"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
