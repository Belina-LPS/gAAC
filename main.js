// alr let's start with some globals we have in mind
var voice = "default"; // idk what that'll end up meaning but ok
var sayQueue = [];

var soundfiles[
  {name:"A", duration:1}
  ]
  
  
function wait(secs) {
  var start = getTime();
  var end = start+(secs*1000);
  while (start < end) {
    start = getTime();
  }
}
