export function getBase64Image(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

export function encodeBase64(file){
  const uploadFile = file;
  const reader = new FileReader();
  reader.readAsDataURL(uploadFile);
  reader.onloadend = function() {
    const base64 = reader.result;
    return base64;
  };
}

export default {};
