var validFileExtensions = ["jpg", "jpeg", "png"];
var usedStorage = 0;
var myStorage = 50;
var filesArray = [];
var sizeFileLimit = 1.5;

function convertBtyesToMB(size) {
    var MB = Math.pow(1024, 2);

    return size / MB;
}

function showErrorAlert(message) {
    alert('There\'s a problem \n ' + message);
    throw new Error('Error: ' + message);
}


function isFileValid(validTypesArr, type) {
    return !!validTypesArr.find(function (t) {
        return ("image/" + t) === type
    });
}

function loadDataToPage() {
    var precentegeStorage = ((usedStorage / myStorage) * 100).toFixed() + '%';

    document.getElementById("usedSize").innerHTML = usedStorage.toFixed() + " MB";
    document.getElementById("leftSize").innerHTML = (myStorage - usedStorage).toFixed();
    document.getElementById("progressBarUsed").style.width = precentegeStorage;
    document.getElementById("usedSizePercentage").innerHTML = precentegeStorage;
};

function createTableRow() {
    nextRow = filesArray.length;
    var table = document.getElementById("tableID");
    var row = table.insertRow(nextRow);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = filesArray[nextRow - 1].fileName;
    cell2.innerHTML = filesArray[nextRow - 1].fileSize + " KB";
};

function onUploadFile(ev) {
    var message;
    var file = ev.target.files[0];
    var type = file.type;
    var fileSize = convertBtyesToMB(file.size);
    var name = file.name;

    if (isFileValid(validFileExtensions, type)) {
        if ((usedStorage + fileSize) > myStorage) {
            message = 'There is not enough space free for this file';
        } else if (fileSize > sizeFileLimit) {
            message = 'File size is bigger from ' + sizeFileLimit + ' MB';
        } else {
            usedStorage += fileSize;
            loadDataToPage();

            //add the file name and size to the array for the table
            var fileObject = {
                fileName: name,
                fileSize: (fileSize * 1024).toFixed(2)
            };
            filesArray.push(fileObject);
            createTableRow();
        }
    } else {
        message = 'Invalid File';
    }


    if (message) {
        showErrorAlert(message);
    }

    ev.target.value = '';
}

window.onload = function () {
    document.getElementById("realUploadFileButton").addEventListener("change", onUploadFile);
};