var tokenc = localStorage.getItem('token1');
var role = localStorage.getItem('role');
var name = localStorage.getItem('name');
var id = localStorage.getItem('id');
if (tokenc == null || role == null || role == "admin") {
    window.location = "index.html";
}     
var key = {'token':tokenc,'role':role};
key = JSON.stringify(key);
document.getElementById('employeeid').value = id;
var name = localStorage.getItem('name');
var welcome="Welcome"+"  "+name;
console.log(welcome);
var t = document.createTextNode(welcome);
document.getElementById('welcome').appendChild(t);

function formValidation() {
    var date = document.getElementById('date').value;
    var amount = document.getElementById('amount').value;
    var category = document.getElementById('sel1').value;
    var regamt = /^[1-9]\d*(\.\d+)?$/;
    var regdate =  /^[01]?[0-9]\/[0-3]?[0-9]\/[12][90][0-9][0-9]$/;
    var fup = document.getElementById('image');
    var fileName = fup.value;
    var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (date == "") {
        bootbox.alert("Please enter a date ");
        return false;
    }
    else if (category == "") {
        bootbox.alert("Please enter an category");
        return false;
    }
    else if (amount == "") {
        bootbox.alert("Please enter an amount");
        return false;
    }
    else if (date.search(regdate) == -1) {
        bootbox.alert("Please enter a date in mm/dd/yyyy format");
        return false;
    }
    else if (amount.search(regamt) == -1) {
        bootbox.alert("Please enter valid amount");
        return false;
    }
    else if (fileName != "") {
        if(!(ext == "gif" || ext == "GIF" || ext == "JPEG" || ext == "jpeg" || ext == "jpg" || ext == "JPG" || ext == "png" || ext == "PNG")){
            bootbox.alert("Upload Gif or Jpg images only");
            fup.focus();
            return false;
        }
        else{
            return true;
        }
    } 
    else{
        return true;
    }
  
}

$("form#empdata").submit(function(){
    var formData = new FormData(this);
    console.log(formData);
    if( formValidation()){
        window.location.reload();
        $.ajax({
            url: 'http://192.168.1.225:8082/EXPENSE/'+key,
            type: 'POST',
            data: formData,
            async: false,
            success: function (data) {
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
    return false; 
});

function logout() {
   bootbox.confirm({ 
       size: "small",
       message: "Do you want to logout ?", 
       callback: function(result) { 
            if (result == true) {
                localStorage.setItem('token1',null);
                localStorage.setItem('role',null);
                localStorage.clear();
                window.location.reload();
                window.location = 'index.html';
            }
            else {
                bootbox.alert({ 
                    size: "small",
                    title: "Alert",
                    message: "you pressed cancel!!", 
                    callback: function() {}
                })
            }
        }
    });
}

$(document).ready(function() {
      var date_input = $('input[name="date"]'); ;
      var container = $('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options = {
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);
});



