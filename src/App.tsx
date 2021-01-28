import React, { useState } from 'react';
import {Bee} from '@vojtechsimetka/bee-js'

function App() {
  const [ file, setFile ] = useState<File|null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    
    if (file) {
      const bee = new Bee("http://localhost:1633");
      console.log(await bee.uploadFile(new Uint8Array(await file.arrayBuffer())))
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
    </div>
  );
}

export default App;
