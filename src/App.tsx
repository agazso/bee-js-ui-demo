import React, { useState } from 'react';
import { Bee } from '@ethersphere/bee-js';
import './App.css';

const beeUrl = "http://localhost:21633"
const bee = new Bee(beeUrl);

function App() {
  const [ file, setFile ] = useState<File | null>(null)
  const [ link, setLink ] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();

    if (file) {
      const hash = await bee.uploadFile(file)
      const fileData = await bee.downloadFile(hash)
      setLink(`${beeUrl}/files/${hash}`)
      console.log({ file,  hash, fileData })
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target && e.target.files && e.target.files[0]

    setFile(f)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={onFileChange} />
        <input type="submit" />
      </form>
      {
        link && <a href={link}>{link}</a>
      }
    </div>
  );
}

export default App;
