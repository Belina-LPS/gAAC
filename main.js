// alr let's start with some globals we have in mind

// #######################################################################
//          ##################### NOTES #####################
// #######################################################################

  // file has become another member of the objects in the files arrays
  // update all functions at top of code to account for this
  // gl

// list of screen nicknames
var scrns = ["mm"];

// Currently selected voice
// Options: DECtalk
var voice = "DECtalk";

// queue of words; will be displayed in text box above at all times
// eg. I NEED WATER
var sayQueue = [];

var fileQueue = [];

// queue of the durations of those soundfiles in ms
// eg. 500 600 1800
var durQueue = [];


// wait a certain number of milliseconds.
// do not execute any other code while waiting
function wait(ms) {
  var start = getTime();
  var end = start+(ms);
  while (start < end) {
    start = getTime();
  }
}

// wait a predetermined amount of time
// simulating space between words
function breathe() {
  // Code.org can get pretty slow
  // so I am choosing not to call the wait() function
  var start = getTime();
  var end = start+200;
  while (start < end) {
    start = getTime();
  }
}


// decide which array to look in and call find() function
function find(value) {
  value += "_" + voice;
  if (voice == "DECtalk") {
    return find_2(soundfiles_DECtalk, value);
  }
  else {
    console.log("######## VOICE ARRAY DOESN'T EXIST ########");
    return -1;
  }
}

// find value in sorted list
// returns index in list
function find_2(list, value) {
  var start = 0;
  var end = list.length-1;
  while (start <= end) {
    var mid = Math.floor((start+end)/2);
    if (list[mid].name == value) {
      console.log(value + " found at i=" + mid);
      return mid;
    }
    else if (list[mid].name < value) {
      start = mid+1;
    }
    else {
      end = mid-1;
    }
  }
  console.log("######## COULD NOT FIND VALUE IN ARRAY ########");
  return -1;
}


// takes in an index value and returns soundfile
// from current voice value
function find_say(i) {
  if (voice == "DECtalk") {
    return soundfiles_DECtalk[i].name;
  }
  else {
    console.log("######## VOICE ARRAY DOESN'T EXIST ########");
    return -1;
  }
}


// takes in an index value and returns duration
// from current voice value
function find_dur(i) {
  if (voice == "DECtalk") {
    return soundfiles_DECtalk[i].dur;
  }
  else {
    console.log("######## VOICE ARRAY DOESN'T EXIST ########");
    return -1;
  }
}

// adds a word to the queue
function add_word(word) {
  var i = find(word);
  appendItem(sayQueue, find_say(i));
  appendItem(durQueue, find_dur(i));
  
  var sentence = "";
  var j = 0;
  for (j; j<sayQueue.length-1; j++) {
    sentence += sayQueue[j] + " ";
  }
  sentence += sayQueue[j];
  
  // iterate through array of screen nicknames,
  // change all "speak" textboxes,
  // eg. mm_speak (scrn+"_speak")
  // don't forget spaces btwn words
  for (var k=0; k<scrns.length; k++) {
    setProperty(scrns[k]+"_speak", "text", sentence);
  }
  
}


// speak the queue of words
function sayQueue() {
  
}


// open the popup to confirm deletion of the sentence
function open_confirm_popup(scrn) {
  setProperty(scrn+"_confirm_del", "hidden", false);
  setProperty(scrn+"_confirm_delY", "hidden", false);
  setProperty(scrn+"_confirm_delN", "hidden", false);
}

// close the popup to confirm deletion of the sentence
function close_confirm_popup(scrn) {
  setProperty(scrn+"_confirm_del", "hidden", true);
  setProperty(scrn+"_confirm_delY", "hidden", true);
  setProperty(scrn+"_confirm_delN", "hidden", true);
}

// delete contents of sayQueue and durQueue
function clearQueues() {
  // this method may not work. check again in debugging
  sayQueue = [];
  durQueue = [];
}


// array of soundfile objects with a name and duration in ms
// DECtalk
var soundfiles_DECtalk = [
  {word: "to", filename: "to_DECtalk", dur: 1000}, // duration wrong on this one! placeholder!
  ];
  
  
  
// #######################################################################
//          ##################### MAIN MENU #####################
// #######################################################################

// ################ TOOLBAR ################

onEvent("mm_voice", "click", function( ) {
  // cycle voice
  console.log("MM: Cycle voice");
});

onEvent("mm_play", "click", function( ) {
  // play queue
  console.log("MM: Play queue");
  sayQueue();
});

onEvent("mm_backspace", "click", function( ) {
  // remove last item in queue
  console.log("MM: Removing last items in sayQueue and durQueue");
  sayQueue.pop(); // we'll see if this works
  durQueue.pop();
});

onEvent("mm_delete", "click", function( ) {
  // delete entire queue
  console.log("MM: Confirming deletion of queue");
  open_confirm_popup("mm");
});

onEvent("mm_confirm_delN", "click", function( ) {
  // close the popup and do nothing
  close_confirm_popup("mm");
});

onEvent("mm_confirm_delY", "click", function( ) {
  // close the popup and delete the queues
  console.log("MM: clearing queues");
  clearQueues();
  close_confirm_popup("mm");
});



// ################ GRID ################

onEvent("mm_people", "click", function( ) {
  // switch screen to people/animals screen
  console.log("mm -> people/animals");
});

onEvent("mm_to", "click", function() {
  add_word("to");
});
