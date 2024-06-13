# Importar bibliotecas
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from PIL import Image
import io


# Configuração do pipeline de transformação
pipe = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")

# Inicializar a aplicação Flask
app = Flask(__name__)
CORS(app)  # Permitir todas as origens

@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify(error='Nenhuma imagem foi enviada.'), 400

    # Ler a imagem como um stream de bytes
    image_bytes = request.files['image'].read()
    image = Image.open(io.BytesIO(image_bytes))

    # Gerar a legenda usando o pipeline
    descricao = pipe(image)

    # Retornar a descrição em formato JSON
    return jsonify(result=descricao[0]['generated_text'])

if __name__ == '__main__':
    # Iniciar ngrok (opcional para expor localmente)
    public_url = ngrok.connect(5000)
    print("Public URL:", public_url)

    # Iniciar a aplicação Flask
    app.run(host='0.0.0.0', port=5000)
