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
  window.fileSystem = fileSystem;
  createAlbumFolder();
}

function createAlbumFolder() {
  var parent = fileSystem.root;
  parent.getDirectory("instaGap",
                      { create: true, exclusive: false },
                      onFolderSuccess,
                      onFail
                     );
}

function onFolderSuccess(folder) {
  window.instaGapFolder = folder;
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
  file.moveTo(instaGapFolder, "", onMoveSuccess, onFail);
}

function onMoveSuccess(file) {
  addPhotoToGalery(file.nativeURL);
}

function addPhotoToGalery(photoPath) {
  cameraPic.src = photoPath;
}

function getPhotoFile(url, onSuccess, onFail) {
  window.resolveLocalFileSystemURL(url, onSuccess, onFail);
}

function moveFileToAlbum(file) {

}

document.addEventListener("deviceready", onDeviceReady, false);
