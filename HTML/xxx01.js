var object1 = document.getElementById("id1");
var object2 = document.getElementById("id2");
var object3 = document.createElement("id");
object3.innerHTML = "<hr>Hello World";
document.body.appendChild(object3);
var i = 0;
function1();
function1();
function function1() {
    object1.value = "Hi " + i;
	console.log(object1.value);
    object3 = document.createElement("id");
    object3.innerHTML = "<hr>Hello World " + i;
    document.body.appendChild(object3);
    i++;
}
