function onDeviceReady() {
  requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFail);
}

function onImageClick(el) {
  target = $(el.target);
  if (target.hasClass("big"))
    target.removeClass("big");
  else
    target.addClass("big");
  console.log("click");
}

function onFail(err) {
  throw err;
}

function onFileSystemSuccess(fileSystem) {
  createAlbumFolder(fileSystem);
}

function createAlbumFolder(fileSystem) {
  var parent = fileSystem.root;
  parent.getDirectory("instaGap",
                      { create: true, exclusive: false },
                      onFolderSuccess,
                      onFail
                     );
}

function onFolderSuccess(folder) {
  window.instaGapFolder = folder;
  folder.createReader().readEntries(folderReaderSuccess, onFail);
}

function folderReaderSuccess(folderItems) {
  folderItems.forEach(function (item) {
    addPhotoToGalery(item.nativeURL);
  });
}

function capturePhoto() {
  navigator.camera.getPicture(onPhotoTaken, null,
    {
      quality: 60,
      sourceType: 1,
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 600,
      targetHeight: 480
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
  $(".photos").append("<img src=" + photoPath + ">").unbind().click(onImageClick);
}

function getPhotoFile(url, onSuccess, onFail) {
  resolveLocalFileSystemURL(url, onSuccess, onFail);
}

function moveFileToAlbum(file) {

}

document.addEventListener("deviceready", onDeviceReady, false);
