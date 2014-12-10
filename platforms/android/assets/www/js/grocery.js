    // Global Variable

var myList = [];

    // Initialize script

$(document).ready(function(ev) {
          
    if(localStorage["grocery-tonk0006"]) {
        myList = JSON.parse(localStorage["grocery-tonk0006"]);
    }
    
    showList();
    
    // Add items to list and local storage
  
    $("#addItem").click(function(ev) {
        ev.preventDefault();
        var newItem = document.querySelector("#item").value;
            if (newItem !== ""){
                newItem = newItem + ":true";
            myList.push(newItem);
            }
        localStorage["grocery-tonk0006"] = JSON.stringify(myList);
        document.querySelector("#myForm").reset();
        showList();
        return false;
    });
});

    // Mark items as done (click/tap)

function markAsDone() {
    $(this).toggleClass("strikethrough");
    var selectedText = $(this).text();
    if(localStorage["grocery-tonk0006"]){
        for (var i = 0; i < myList.length; i++) {
            var parts = myList[i].split(":");
            
            if(parts[0] === selectedText) {
                
                if(parts[1] === "true") {
                    parts[1] = "false";
                }
                else if(parts[1] === "false") {
                    parts[1] = "true";
                }
                
                myList[i] = parts[0] + ":" + parts[1];
            }
        }
    }
    localStorage["grocery-tonk0006"] = JSON.stringify(myList);
}

     // Remove items from the list (double click/tap)

function removeItem(ev){
    var txt = ev.currentTarget.firstChild.nodeValue;
    for(var i = 0; i < myList.length; i++){
        var parts = myList[i].split(":");
        if(parts[0] == txt){
            myList.splice(i, 1);
        }
    }
    localStorage["grocery-tonk0006"] = JSON.stringify(myList);
    showList();
}

      // Show the list  

function showList(){
    var output = document.querySelector("#itemList");
    output.innerHTML = "";
    for(var i = 0; i < myList.length; i++){
        var list = document.createElement("li");
        var parts = myList[i].split(":");
        list.innerHTML = parts[0];
        
        if(parts[1] === "false") {
            $(list).toggleClass("strikethrough");
        }
        output.appendChild(list);
        
        $(list).tap(markAsDone);
        
        $(list).taphold(removeItem);
    }
}

