var usedSize = 0;
var leftSize = 50;
var filesPropertyArray = [];

window.onload = function () {
    const realButton = document.getElementById("real-uploadfile-button");
    const fakeButton = document.getElementById("fake-uploadfile-button");
    var validFileExtensions = ["image/jpg", "image/jpeg", "image/png"];
    loadDataToPage();

    fakeButton.addEventListener("click", function () {
        realButton.click();
    });

    realButton.addEventListener("change", function () {
        let file = realButton.files;
        let size = file[0].size;
        let MBsize = size / (1000 * 1024);
        let type = file[0].type;
        let name = file[0].name;


        //initialize first data to the page
        loadDataToPage();


        //vailidate file size
        if (file.length > 0) {
            if (size > 1500 * 1024) {
                alert("File size is bigger from 1.5MB");
                return;
            }
        }

        //validate extentions
        if (validFileExtensions.indexOf(type) === -1) {
            alert("File is not an image (jpg/jpeg/png)");
            return;
        }

        //validate left space
        if (leftSize - MBsize < 0) {
            alert("There is not enough space free for this file");
            return;
        }

        //update the data after uploading the file and reload the page
        usedSize = usedSize + MBsize;
        leftSize = leftSize - MBsize;
        loadDataToPage();

        //add the file name and size to the array for the table
        var fileObject = {
            fileName: name,
            fileSize: (size/1024).toFixed()
        };
        filesPropertyArray.push(fileObject);
        setTable();
    });

    function loadDataToPage() {
        document.getElementById("usedSize").innerHTML = usedSize.toFixed() + " MB";
        document.getElementById("leftSize").innerHTML = leftSize.toFixed();
        document.getElementById("progress-bar__usedID").style.width = ((usedSize / 50) * 100).toFixed() + '%';
        document.getElementById("usedSize__percentage").innerHTML = ((usedSize / 50) * 100).toFixed() + '%';
    };

    function setTable() {
        index = filesPropertyArray.length;
        var table = document.getElementById("tableID");
        console.log(table);
        var row = table.insertRow(index);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = filesPropertyArray[index-1].fileName;
        cell2.innerHTML = filesPropertyArray[index-1].fileSize + " KB";
    };
};