// alr let's start with some globals we have in mind

// #######################################################################
//          ##################### NOTES #####################
// #######################################################################

  // file has become another member of the objects in the files arrays
  // update all functions at top of code to account for this
  // gl
  
function do_nothing_help_me_upload_sound_lol() {
  playSound("");
}


// ###########################################################################################################
// ###########################################################################################################
  
// #######################################################################
//       ##################### GLOBAL VARIABLES ################
// #######################################################################

// list of screen nicknames
var scrns = ["mm", "ex"];

// Currently selected voice
// Options: DECtalk
var voice = "DECtalk";

// queue of words; will be displayed in text box above at all times
// eg. I NEED WATER
var wordQueue = [];

// queue of filenames
// i don't want the program creating filenames from words and voice while trying to output them;
  // code.org is.. quite slow
// eg. i_DECtalk.wav need_DECtalk.wav water_DECtalk.wav
var fileQueue = [];

// queue of the durations of those soundfiles in ms
// eg. 500 600 1800
var durQueue = [];

// array of soundfile objects with a name and duration in ms
// DECtalk
var soundfiles_DECtalk = [
  {word: "hi", file: "hi_DECtalk.mp3", dur: 940},
  {word: "to", file: "to_DECtalk.mp3", dur: 934},
  ];


// ###########################################################################################################
// ###########################################################################################################

// #######################################################################
//        ##################### FUNCTIONS #####################
// #######################################################################


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
  value += "_" + voice + ".mp3";
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
    if (list[mid].file == value) {
      console.log(value + " found at i=" + mid);
      return mid;
    }
    else if (list[mid].file < value) {
      start = mid+1;
    }
    else {
      end = mid-1;
    }
  }
  console.log("######## COULD NOT FIND VALUE IN ARRAY ########");
  return -1;
}


// takes in an index value and returns filename
// from current voice value
function find_filename(i) {
  if (voice == "DECtalk") {
    return soundfiles_DECtalk[i].file;
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



// append a word to the queue
// word: the word to append
// f: the filename of the word if it is a homophone (eg. word = "too", file = "to")
function append_word(word, f) {
  
  if (f == undefined) {
    f = word;
  }
  playSound(f+"_"+voice+".mp3");
  
  // find index of word in voice array
  var i = find(f);
  // append word, duration, and filename to wordQueue, fileQueue, and durQueue
  appendItem(wordQueue, word);
  appendItem(fileQueue, find_filename(i));
  appendItem(durQueue, find_dur(i));
  
  // form sentence and update speak boxes
  form_sentence_and_update();
}


// speak the queue of words
function say_queue() {
  for (var i=0; i<wordQueue.length; i++) {
    playSound(fileQueue[i]);
    wait(durQueue[i]-100); // BEWARE this -100
    // see if breathe needs to be added
  }
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

// remove the last word from the sentence
function backspace() {
  // remove back element of each array
  wordQueue.pop();
  fileQueue.pop();
  durQueue.pop();
  
  form_sentence_and_update();
}

// deletes the current sentence
// clears wordQueue, fileQueue, and durQueue and resets all speak textboxes
function delete_sentence() {
  // clear contents of wordQueue, fileQueue, and durQueue
  // this method may not work. check again in debugging
  wordQueue = [];
  fileQueue = [];
  durQueue = [];
  
  // iterate through screens, clear all speak boxes
  for (var k=0; k<scrns.length; k++) {
    setProperty(scrns[k]+"_speak", "text", "");
  }
}

// form sentence from wordQueue and update speak textboxes
function form_sentence_and_update() {
  // create sentence
  var sentence = "";
  var j = 0;
  for (j; j<wordQueue.length-1; j++) {
    sentence += wordQueue[j] + " ";
  }
  sentence += wordQueue[j];
  
  if (wordQueue.length == 0) {
    sentence = "";
  }

  for (var k=0; k<scrns.length; k++) {
    setProperty(scrns[k]+"_speak", "text", sentence);
  }
}


  
// ###########################################################################################################
// ###########################################################################################################
  
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
  console.log("MM: Play");
  say_queue();
});

onEvent("mm_backspace", "click", function( ) {
  // remove last item in queue
  console.log("MM: Backspace");
  backspace();
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
  delete_sentence();
  close_confirm_popup("mm");
});



// ################ GRID ################

onEvent("mm_people", "click", function( ) {
  // switch screen to people/animals screen
  console.log("mm -> people/animals");
});


onEvent("mm_expletives", "click", function( ) {
  // switch screen to expletives screen
  console.log("mm -> ex");
  setScreen("expletives");
});


onEvent("mm_to", "click", function() {
  append_word("to");
});





  
// #######################################################################
//          ##################### EXPLETIVES #####################
// #######################################################################

// ################ TOOLBAR ################

onEvent("ex_home", "click", function( ) {
  // switch screen to main menu
  console.log("ex -> mm");
  setScreen("mainMenu");
});

onEvent("ex_voice", "click", function( ) {
  // cycle voice
  console.log("Ex: Cycle voice");
});

onEvent("ex_play", "click", function( ) {
  // play queue
  console.log("Ex: Play");
  say_queue();
});

onEvent("ex_backspace", "click", function( ) {
  // remove last item in queue
  console.log("Ex: Backspace");
  backspace();
});

onEvent("ex_delete", "click", function( ) {
  // delete entire queue
  console.log("Ex: Confirming deletion of queue");
  open_confirm_popup("ex");
});

onEvent("ex_confirm_delN", "click", function( ) {
  // close the popup and do nothing
  close_confirm_popup("ex");
});

onEvent("ex_confirm_delY", "click", function( ) {
  // close the popup and delete the queues
  console.log("Ex: clearing queues");
  delete_sentence();
  close_confirm_popup("ex");
});


// ################ GRID ################

onEvent("ex_hi", "click", function() {
  append_word("hi");
});
