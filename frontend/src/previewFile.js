import { makePostModal } from './makePost.js';

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
    console.log("preview file");
  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    return file;
  }
  console.log("returning nul... check here!")
  return null;
}    

export { previewFile }