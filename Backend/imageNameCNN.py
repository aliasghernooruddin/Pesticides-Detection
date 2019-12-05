def imageDetection(name):
    if 'pm' in name:
        return "Powdery Mildew"
    elif 'cb' in name:
        return "Common Bunt"
    elif 'crr' in name:
        return "Common Root Rot"
    elif 'lr' in name:
        return "Leaf Rust"
    elif 'fhb' in name:
	return "Fusarium Head Blight"
    else:
        return "No Match Found..."
