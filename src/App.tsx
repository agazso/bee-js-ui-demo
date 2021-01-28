import React, { useState } from 'react';
import {Bee} from '@ethersphere/bee-js'
import {Bee as Bee2} from '@vojtechsimetka/bee-js'

function App() {
  const [ file, setFile ] = useState<File|null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    
    if (file) {
      const f = new Uint8Array(await file.arrayBuffer())
      const bee = new Bee("http://localhost:1633");
      console.log("Github: ", await bee.uploadFile(f))

      const bee2 = new Bee2("http://localhost:1633");
      console.log("NPM: ", await bee2.uploadFile(f))
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
