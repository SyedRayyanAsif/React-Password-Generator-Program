// src/App.jsx
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  // Password generator
  const passwordGenerator = useCallback(() => {
    if (!length || length < 6) {
      setPassword("");
      return;
    }

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Copy password
  const copyPasswordToClipboard = useCallback(() => {
    const textToCopy = passwordRef.current?.value || password;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Password copied!");
    });
  }, [password]);

  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex mb-6 border border-gray-600 rounded-lg overflow-hidden bg-white/10">
          <input
            type="text"
            value={password}
            placeholder="Your secure password will appear here..."
            readOnly
            ref={passwordRef}
            className="flex-1 p-2 bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-green-500 text-white px-4 hover:bg-blue-600 transition-colors"
            disabled={!password}
          >
            {password ? "Copy" : "Generate"}
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Length */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="lengthInput"
              className="text-sm font-medium text-gray-300"
            >
              Length: {length}
            </label>
            <input
              id="lengthInput"
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 h-2 rounded-lg bg-gray-600 accent-blue-500"
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(!numberAllowed)}
                className="accent-blue-500"
              />
              <span>Include Numbers (0-9)</span>
            </label>

            <label className="flex items-center space-x-2 text-gray-300">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed(!charAllowed)}
                className="accent-blue-500"
              />
              <span>Include Symbols (!@#$...)</span>
            </label>
          </div>

          {/* Generate Button */}
          <button
            onClick={passwordGenerator}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
            disabled={!numberAllowed && !charAllowed && length < 8}
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
