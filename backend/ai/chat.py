from .nltk_utils import tokenize, stem, bag_of_words
import pickle
import random
import json


with open("ai/intents.json","r") as f:
    intents = json.load(f)

modelone = pickle.load(open("ai/models/Model V1.pkl","rb"))
all_words = pickle.load(open("ai/wordlist/words.pkl","rb"))

# This is the function that response the chat with ai answer
def bot_response(input: str):

    features = bag_of_words(tokenize(input),all_words)

    tag = modelone.predict([features])

    for intent in intents['intents']:
        if tag == intent['tag']:
            output = random.choice(intent['responses'])
        
    return output

