import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      setErrorMessage('Por favor, selecione uma imagem primeiro.');
      return;
    }
    setErrorMessage('');  // Limpar mensagens de erro anteriores
    const formData = new FormData();
    formData.append('image', selectedImage);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  
    console.log("Enviando imagem para:", "https://a484-34-80-114-198.ngrok-free.app/analyze");
  
    try {
      const response = await axios.post("https://a484-34-80-114-198.ngrok-free.app/analyze", formData, config);
      setOcrResult(response.data.result);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      setErrorMessage('Erro ao enviar imagem. Por favor, tente novamente.');
    }
  };
  

  return (
    <section className="App">
      <h1>Carregue uma imagem</h1>
      <div className={"conteudo"}>
        <form onSubmit={onFormSubmit}>
     
          <input type="file" id="file" onChange={onImageUpload} />
          <button type="submit">Analisar Imagem</button>
        </form>
      </div>
      {errorMessage && <div className="error"><p>{errorMessage}</p></div>}
      {ocrResult && <div><h2>Resultado:</h2><p>{ocrResult}</p></div>}
    </section>
  );
}

export default App;
