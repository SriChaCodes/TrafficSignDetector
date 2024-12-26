from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

def preprocess_image(img):
    # Add your preprocessing steps here
    img = img / 255.0
    return img

def get_class_name(class_no):
    classes = [
        'Speed Limit 20 km/h', 'Speed Limit 30 km/h', 'Speed Limit 50 km/h',
        'Speed Limit 60 km/h', 'Speed Limit 70 km/h', 'Speed Limit 80 km/h',
        'End of Speed Limit 80 km/h', 'Speed Limit 100 km/h', 'Speed Limit 120 km/h',
        'No passing', 'No passing for vehicles over 3.5 metric tons',
        'Right-of-way at the next intersection', 'Priority road', 'Yield', 'Stop',
        'No vehicles', 'Vehicles over 3.5 metric tons prohibited', 'No entry',
        'General caution', 'Dangerous curve to the left', 'Dangerous curve to the right',
        'Double curve', 'Bumpy road', 'Slippery road', 'Road narrows on the right',
        'Road work', 'Traffic signals', 'Pedestrians', 'Children crossing',
        'Bicycles crossing', 'Beware of ice/snow', 'Wild animals crossing',
        'End of all speed and passing limits', 'Turn right ahead', 'Turn left ahead',
        'Ahead only', 'Go straight or right', 'Go straight or left', 'Keep right',
        'Keep left', 'Roundabout mandatory', 'End of no passing',
        'End of no passing by vehicles over 3.5 metric tons'
    ]
    return classes[class_no] if class_no < len(classes) else "Unknown"
@csrf_exempt
def predict_sign(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file uploaded'}, status=400)
    
    try:
        uploaded_file = request.FILES['file']
        file_path = default_storage.save(f'uploads/{uploaded_file.name}', ContentFile(uploaded_file.read()))
        full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)
        
        # Load and preprocess image
        img = image.load_img(full_file_path, target_size=(32, 32), color_mode='grayscale')
        img = image.img_to_array(img)
        img = preprocess_image(img)
        img = img.reshape(1, 32, 32, 1)
        
        model = load_model('D:/trafficsign_detection/trafficsign_detection/model.h5')
        predictions = model.predict(img)
        class_index = np.argmax(predictions)
        class_name = get_class_name(class_index)
        
        if os.path.exists(full_file_path):
            os.remove(full_file_path)
        
        return JsonResponse({'class_index': int(class_index), 'class_name': class_name})
    
    except Exception as e:
        print(f"Error processing image: {str(e)}")  # Debug log
        return JsonResponse({'error': str(e)}, status=500)