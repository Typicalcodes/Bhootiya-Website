import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";

const ImageCropper = (props) => {
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [cropped, setCropped] = useState(null);
  const [showimage, setShowImage] = useState(true);
  
  const handleImageSelect = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };
  const havingimage = (image) =>{
    props.imagecropeed(image)
    console.log(image)
  }

  const handleSave = async () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas().toDataURL();
  
      const croppedImage = dataURLtoBlob(canvas);
      console.log(croppedImage)
     
      const croppedUrl = URL.createObjectURL(croppedImage);
      setCropped(croppedUrl);
      const croppedCanvas = document.createElement('canvas');
      const croppedContext = croppedCanvas.getContext("2d");
      const imageSize = editor.getImage().naturalWidth;
      const cropSize = imageSize * (editor.props.width / editor.props.height) * scale;
      croppedCanvas.width = cropSize;
      croppedCanvas.height = cropSize;
      croppedContext.drawImage(
        editor.getImage(),
        (imageSize - cropSize / scale) / 2,
        (imageSize - cropSize / scale) / 2,
        cropSize / scale,
        cropSize / scale,
        0,
        0,
        cropSize,
        cropSize
      );
      try {
        havingimage(croppedImage)
        
      } catch (error) {
       console.log(error) 
      }
      const croppedBlob = dataURLtoBlob(croppedCanvas.toDataURL());
      // Set the cropped image as the source of an <img> tag to display it
    
   
    }
  };
  const hideimage = ()=>{
    setShowImage(!showimage)
  }

  const handleScaleChange = (event) => {
    const scale = parseFloat(event.target.value);
    setScale(scale);
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageSelect} />
      {image && (
        <AvatarEditor
          ref={(editor) => setEditor(editor)}
          image={image}
          width={250}
          height={280}
          border={50}
          borderRadius={0}
          color={[255, 255, 255, 0.6]}
          scale={scale}
        />
      )}
      <div>
        <input
          type="range"
          min="1"
          max="2"
          step="0.01"
          value={scale}
          onChange={handleScaleChange}
        />
      </div>
      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{handleSave(); hideimage()}}>Save</button>
      {cropped && <img src={cropped} />}
    </div>
  );
};

export default ImageCropper;
