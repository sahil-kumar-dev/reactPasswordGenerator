import { useCallback, useEffect, useState } from "react"

function App() {

  const [length, setlength] = useState(8)
  const [numbers, setnumbers] = useState(false)
  const [charcter, setcharcter] = useState(false)
  const [password, setpassword] = useState("")

  const passwordGenerator = useCallback (()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(charcter) str+="!@#$%^&*"
    if(numbers)str+="0123456789"

    for(let i=1; i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setpassword(pass);
  },[numbers,charcter,length]);

  useEffect(()=>{
    passwordGenerator()
  },[length],[charcter],[numbers])
  return (
    <>
      <h1 className="text-2xl text-purple-500 ">Password Generator</h1>
      <input 
        type="text" 
        value={password}
        readOnly
      />
      <input 
        type="range" 
        min={8}
        max={20}
        value={length}
        onChange={(e)=>setlength(e.target.value)}
      />
      {length}      
      <label htmlFor="numbers">Numbers</label>
      <input 
        type="checkbox" 
        id="numbers" 
        onChange={()=>setnumbers(prev=>!prev)}
      />
      <label htmlFor="charcters">chracters</label>
      <input 
        type="checkbox" 
        id="charcters" 
        onChange={()=>setcharcter(prev=>!prev)}
      />
    </>
  )
}

export default App
