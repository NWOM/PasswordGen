import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(9); // Fixed typo here from setLengeth to setLength
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllow) str += "!@#$%^&*(){}[]><~`";
    
    // Use `length` to determine the number of iterations
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length); // Corrected the random index formula
      pass += str.charAt(char); // Concatenate new character
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllow, setPassword]);
  const copyPaswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,123);
    window.navigator.clipboard.writeText(password)
  },[password] )

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed, charAllow,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          {/* Copy button functionality not implemented */}
          <button onClick={copyPaswordToClipboard}
          className='outline-none bg-red-700 text-white px-3 py-0.5 shrink-0'>
            COPY
          </button>
        </div>
        <div className='flex text-sm gap-x-2'> 
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={123}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='cursor-pointer' 
            />
            <label>LENGTH: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              checked={charAllow}
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
        <button onClick={passwordGenerator} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Generate Password</button>
      </div> 
    </>
  );
}

export default App;
