import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const onImageUpload = (event) => {
    console.log(event.target.files[0]);
    const [fileName, setFileName] = useState('');
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState('');

  
  const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);
    const config = { headers: { 'content-type': 'multipart/form-data' } };
    axios.post("http://localhost:5000/api/analyze", formData, config)
      .then(response => setOcrResult(response.data.result));

      
  };


  return (
    <section className="App">
      <h1>Carregue uma imagem</h1>
      <div className={"conteudo"}>
      <form onSubmit={onFormSubmit}>
      <label htmlFor="file" className="file">
          Escolher arquivo
        </label>
        <input type="file" id="file" onChange={onImageUpload} style={{display: 'none'}} />
      
        <button type="submit">Analisar Imagem</button>
      </form>
      </div>
      {ocrResult && <div><h2>Resultado:</h2><p>{ocrResult}</p></div>}
    </section>
  );
}
export default App;
