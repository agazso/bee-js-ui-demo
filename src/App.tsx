import React, { useState } from 'react';
import { Bee } from '@ethersphere/bee-js';
import './App.css';

const beeUrl = "http://localhost:21633"
const bee = new Bee(beeUrl);

function App() {
  const [ files, setFiles ] = useState<FileList | null>(null)
  const [ link, setLink ] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();

    if (files) {
      const hash = await bee.uploadFiles(files)
      setLink(`${beeUrl}/dirs/${hash}`)
      console.log({ files,  hash })
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target && e.target.files && e.target.files

    setFiles(f)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" multiple onChange={onFileChange} />
        <input type="submit" />
      </form>
      {
        link && <a href={link}>{link}</a>
      }
    </div>
  );
}

export default App;
