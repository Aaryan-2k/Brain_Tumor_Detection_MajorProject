import tensorflow
import numpy as np
from keras.utils import load_img,img_to_array
model=tensorflow.keras.models.load_model("model/mod.h5")

def predict():
    try:
        img=load_img("tumor/img.jpg",target_size=(64,64))
        img=img_to_array(img)
        img=np.expand_dims(img, axis = 0)
        res=model.predict(img)
        if res[0][0]==1:
            return True
        else:
            return False
    except Exception as e:
        print(e)
