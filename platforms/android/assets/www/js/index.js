function onDeviceReady() {
  window.requestFileSystem(LocalFileSystem.PERSISTENT,
                          0,
                          onFileSystemSuccess,
                          onFail
                          );
}

function onFail(err) {
  throw err;
}

function onFileSystemSuccess(fileSystem) {
  window.fs = fileSystem;
}

function capturePhoto() {
  navigator.camera.getPicture(onPhotoTaken, null,
    {
      quality: 60,
      sourceType: 1,
      destinationType: Camera.DestinationType.FILE_URI
    });
}

function onPhotoTaken(data) {
  getPhotoFile(data, onPhotoFile, onFail);
}

function onPhotoFile(file) {
  console.log(file);
}

function addPhotoToGalery(data) {
  cameraPic.src = data;
}

function getPhotoFile(url, onSuccess, onFail) {
  window.resolveLocalFileSystemURL(url, onSuccess, onFail);
}

function moveFileToAlbum(file) {

}

document.addEventListener("deviceready", onDeviceReady, false);
