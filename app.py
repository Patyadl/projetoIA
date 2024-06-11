
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from PIL import Image
import io

# Cria um pipeline usando o modelo pré-treinado
pipe = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify(error='Nenhuma imagem foi enviada.'), 400

    # Lê a imagem como um stream de bytes
    image_bytes = request.files['image'].read()
    image = Image.open(io.BytesIO(image_bytes))

    # Gera a legenda usando o pipeline
    descricao = pipe(image)

    # Retorna a descrição em formato JSON
    return jsonify(result=descricao[0]['generated_text'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
