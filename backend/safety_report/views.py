from django.shortcuts import render

from model.model_loader import load_model
from model.utils import haversine, predict_safety
# Create your views here.

model = load_model()
safety_status = predict_safety(40.754856, -73.973841, model)
print(safety_status)

#for testing purposes
# if __name__ == "__main__":
#     import sys
#     import os
#     sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
#     from model.model_loader import load_model
#     from model.utils import haversine, predict_safety
# else:
#     from ..model.model_loader import load_model
#     from ..model.utils import haversine, predict_safety

# # Create your views here.
# model = load_model()
# safety_status = predict_safety(40.754856, -73.973841, model)
# print(safety_status)