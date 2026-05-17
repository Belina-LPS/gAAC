// alr let's start with some globals we have in mind

// #######################################################################
//          ##################### NOTES #####################
// #######################################################################

  // next steps:
  // implement the rest of expletives in DECtalk,
  // implement what other sound files we did
  
// M:
  // To add a new category,
    // On the left side of the screen, you'll see a preview of the program.
    // Above it are three tabs: Code, Design, and Data.
    // Switch to the Design tab.
    // The program should default to the "mainMenu" screen.
    // There will be a dropdown list from that label.
    // Switch to any other screen (mainMenu doesn't have a home button).
    // The right panel will have some info about the screen,
    // along with a Duplicate button.
    // Duplicate that screen.
    // Now you get to rename all the UI yaaayyy
    // Decide on a nickname for your screen.
      // For example, I've used "mm" for main menu, or "ex" for expletives
    // Click on a UI element (such as the home button) and rename it accordingly.
      // e.g. The play button on the main menu is called "mm_play"
    // Rename all word buttons (eg. "ex_boo" is "boo" on the expletives page).
    // Add your nickname to the global scrns array in this code.
    
  // To add a word,
    // Get the word as a .mp3 file.
      // For DECtalk, I've been using a certain site that exports .wavs,
      // then converting them to .mp3s
    // Get the length of that file.
      // I've been using an online audio trimming service that displays
      // the length of the sound in milliseconds.
    // Upload the word to this project.
      // Switch this code to blocks by hitting the
      // Show Blocks button in the top right corner.
      // The function below (do_nothing_help_me_upload_sound_lol) will have a
      // dropdown menu. Open it and hit Choose...
      // It will let you upload sound.
    // Add the word to the corresponding array.
      // At this point, I only have DECtalk files.
      // So I'll use the soundfiles_DECtalk array as an exmaple.
      // Objects are weird in JavaScript. Just don't look them directly in the eye.
      // Example object in the array:
        // {word: "am", file: "am_DECtalk.mp3", dur: 766}
      // This word is "am", so the word member is assigned "am".
      // The file is assigned the word plus an underscore and the voice type;
      // in this case, "am"+"_"+"DECtalk" -> "am_DECtalk" ... .mp3.
      // The duration (dur) is the duration of the sound in milliseconds.
      // Let's say you're adding "quail" with a hypothetical length of 700ms.
        // {word: "quail", file: "quail_DECtalk.mp3", dur: 700}
      // Be sure to insert the soundfile in sorted order, by *filename*.
        // Not by word.
        
  // To make this all actually function,
    // Hurrah! You're onto the actual coding stage.
    // Separate off some space for your code.
    // You'll see I use a buncha hashtags. Copy that for consistency.
    // Copy the code for the UI at the top from another screen
    // and replace the nickname with your new screen's nickname.
      // These elements are home, voice, play, backspace, delete, speak,
      // confirm_del, confirm_delY, and confirm_delN.
      // You may also want a back button.
    // Copy the code for any clickable word and replace it with
    // the name of your UI element (word button) and replace the word
    // in the function call with your new word.
  
function do_nothing_help_me_upload_sound_lol() {
  playSound("");
}


// ###########################################################################################################
// ###########################################################################################################
  
// #######################################################################
//       ##################### GLOBAL VARIABLES ################
// #######################################################################

// list of screen nicknames
var scrns = ["mm", "ex", "v1", "v2", "bd"];

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
// sorted by filename, ascending
// DECtalk
// {word: "", file: "_DECtalk", dur: },
var soundfiles_DECtalk = [
  {word: "am", file: "am_DECtalk.mp3", dur: 766},
  {word: "are", file: "are_DECtalk.mp3", dur: 876},
  {word: "arm", file: "arm_DECtalk.mp3", dur: 966},
  {word: "back", file: "back_DECtalk.mp3", dur: 966},
  {word: "be", file: "be_DECtalk.mp3", dur: 857},
  {word: "boo", file: "boo_DECtalk.mp3", dur: 902},
  {word: "breathe", file: "breathe_DECtalk.mp3", dur: 966},
  {word: "chest", file: "chest_DECtalk.mp3", dur: 1159},
  {word: "close", file: "close_DECtalk.mp3", dur: 1045},
  {word: "come", file: "come_DECtalk.mp3", dur: 883},
  {word: "damn", file: "dmn_DECtalk.mp3", dur: 985},
  {word: "drink", file: "drink_DECtalk.mp3", dur: 1050},
  {word: "eat", file: "eat_DECtalk.mp3", dur: 805},
  {word: "face", file: "face_DECtalk.mp3", dur: 1037},
  {word: "fuck", file: "fck_DECtalk.mp3", dur: 927},
  {word: "fucking", file: "fcking_DECtalk.mp3", dur : 1043},
  {word: "foot", file: "foot_DECtalk.mp3", dur: 953},
  {word: "get", file: "get_DECtalk.mp3", dur: 831},
  {word: "give", file: "give_DECtalk.mp3", dur: 883},
  {word: "go", file: "go_DECtalk.mp3", dur: 844},
  {word: "hair", file: "hair_DECtalk.mp3", dur: 966},
  {word: "hand", file: "hand_DECtalk.mp3", dur: 1154},
  {word: "have", file: "have_DECtalk.mp3", dur: 882},
  {word: "help", file: "help_DECtalk.mp3", dur: 953},
  {word: "hi", file: "hi_DECtalk.mp3", dur: 940},
  {word: "hide", file: "hide_DECtalk.mp3", dur: 1063},
  {word: "eye", file: "i_DECtalk.mp3", dur: 892},
  {word: "i", file: "i_DECtalk.mp3", dur: 892},
  {word: "is", file: "is_DECtalk.mp3", dur: 934},
  {word: "leg", file: "leg_DECtalk.mp3", dur: 992},
  {word: "make", file: "make_DECtalk.mp3", dur: 951},
  {word: "mouth", file: "mouth_DECtalk.mp3", dur: 1030},
  {word: "nail", file: "nail_DECtalk.mp3", dur: 927},
  {word: "need", file: "need_DECtalk.mp3", dur: 992},
  {word: "nose", file: "nose_DECtalk.mp3", dur: 1076},
  {word: "open", file: "open_DECtalk.mp3", dur: 966},
  {word: "ow", file: "ow_DECtalk.mp3", dur: 902},
  {word: "pause", file: "pause_DECtalk.mp3", dur: 1146},
  {word: "period", file: "period_DECtalk.mp3", dur: 1275},
  {word: "put", file: "put_DECtalk.mp3", dur: 953},
  {word: "show", file: "show_DECtalk.mp3", dur: 998},
  {word: "shit", file: "sht_DECtalk.mp3", dur: 934},
  {word: "spook", file: "spook_DECtalk.mp3", dur: 1082},
  {word: "stay", file: "stay_DECtalk.mp3", dur: 1030},
  {word: "stomach", file: "stomach_DECtalk.mp3", dur: 1146},
  {word: "stop", file: "stop_DECtalk.mp3", dur: 1114},
  {word: "to", file: "to_DECtalk.mp3", dur: 934},
  {word: "touch", file: "touch_DECtalk.mp3", dur: 1030},
  {word: "turn", file: "turn_DECtalk.mp3", dur: 979},
  {word: "uhh", file: "uhh_DECtalk.mp3", dur: 788},
  {word: "understand", file: "understand_DECtalk.mp3", dur: 1288},
  {word: "use", file: "use_DECtalk.mp3", dur: 921},
  {word: "wah", file: "wah_DECtalk.mp3", dur: 927},
  {word: "wait", file: "wait_DECtalk.mp3", dur: 966},
  {word: "want", file: "want_DECtalk.mp3", dur: 934},
  {word: "will", file: "will_DECtalk.mp3", dur: 908},
  {word: "yeah", file: "yeah_DECtalk.mp3", dur: 966},
  {word: "yippee", file: "yippee_DECtalk.mp3", dur:1050}
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
  console.log("find2: looking for " + value);
  var start = 0;
  var end = list.length-1;
  while (start <= end) {
    var mid = Math.floor((start+end)/2);
    if (list[mid].file == value) {
      console.log(value + " found at i=" + mid);
      return mid;
    }
    else if (list[mid].file < value) {
      console.log(list[mid].file + " < " + value);
      start = mid+1;
    }
    else {
      console.log(list[mid].file + " > " + value);
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
  console.log("Playing sound "+f+"_"+voice+".mp3");
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
  form_sentence_and_update();
  
  for (var i=0; i<wordQueue.length; i++) {
    playSound(fileQueue[i]);
    wait(durQueue[i]-500); // BEWARE this number
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
  form_sentence_and_update();
  setScreen("expletives");
});

onEvent("mm_to", "click", function() {
  append_word("to");
});

onEvent("mm_body", "click", function( ) {
  // switch screen to expletives screen
  console.log("mm -> bd");
  form_sentence_and_update();
  setScreen("body");
});

onEvent("mm_verbs1", "click", function( ) {
  // switch screen to expletives screen
  console.log("mm -> v1");
  form_sentence_and_update();
  setScreen("verbs1");
});

onEvent("mm_verbs2", "click", function( ) {
  // switch screen to expletives screen
  console.log("mm -> v2");
  form_sentence_and_update();
  setScreen("verbs2");
});




  
// #######################################################################
//          ##################### EXPLETIVES #####################
// #######################################################################

// ################ TOOLBAR ################

onEvent("ex_home", "click", function( ) {
  // switch screen to main menu
  console.log("ex -> mm");
  form_sentence_and_update();
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

onEvent("ex_boo", "click", function() {
  append_word("boo");
});

onEvent("ex_damn", "click", function() {
  append_word("damn", "dmn");
});

onEvent("ex_fuck", "click", function() {
  append_word("fuck", "fck");
});

onEvent("ex_fucking", "click", function() {
  append_word("fucking", "fcking");
});

onEvent("ex_hi", "click", function() {
  append_word("hi");
});

onEvent("ex_ow", "click", function() {
  append_word("ow");
});

onEvent("ex_shit", "click", function() {
  append_word("shit", "sht");
});

onEvent("ex_uhh", "click", function() {
  append_word("uhh");
});

onEvent("ex_wah", "click", function() {
  append_word("wah");
});

onEvent("ex_yeah", "click", function() {
  append_word("yeah");
});

onEvent("ex_yippee", "click", function() {
  append_word("yippee");
});


// #######################################################################
//          ####################### BODY #######################
// #######################################################################

// ################ TOOLBAR ################

onEvent("bd_home", "click", function( ) {
  // switch screen to main menu
  console.log("bd -> mm");
  form_sentence_and_update();
  setScreen("mainMenu");
});

onEvent("bd_voice", "click", function( ) {
  // cycle voice
  console.log("Bd: Cycle voice");
});

onEvent("bd_play", "click", function( ) {
  // play queue
  console.log("Bd: Play");
  say_queue();
});

onEvent("bd_backspace", "click", function( ) {
  // remove last item in queue
  console.log("Bd: Backspace");
  backspace();
});

onEvent("bd_delete", "click", function( ) {
  // delete entire queue
  console.log("V1: Confirming deletion of queue");
  open_confirm_popup("bd");
});

onEvent("bd_confirm_delN", "click", function( ) {
  // close the popup and do nothing
  close_confirm_popup("bd");
});

onEvent("bd_confirm_delY", "click", function( ) {
  // close the popup and delete the queues
  console.log("V1: clearing queues");
  delete_sentence();
  close_confirm_popup("bd");
});


// ################ GRID ################

onEvent("bd_arm", "click", function() {
  append_word("arm");
});

onEvent("bd_back", "click", function() {
  append_word("back");
});

onEvent("bd_chest", "click", function() {
  append_word("chest");
});

onEvent("bd_eye", "click", function() {
  append_word("eye", "i");
});

onEvent("bd_face", "click", function() {
  append_word("face");
});

onEvent("bd_foot", "click", function() {
  append_word("foot");
});

onEvent("bd_hair", "click", function() {
  append_word("hair");
});

onEvent("bd_hand", "click", function() {
  append_word("hand");
});

onEvent("bd_leg", "click", function() {
  append_word("leg");
});

onEvent("bd_mouth", "click", function() {
  append_word("mouth");
});

onEvent("bd_nail", "click", function() {
  append_word("nail");
});

onEvent("bd_nose", "click", function() {
  append_word("nose");
});

onEvent("bd_period", "click", function() {
  append_word("period");
});

onEvent("bd_stomach", "click", function() {
  append_word("stomach");
});






// #######################################################################
//          ##################### VERBS 2 #####################
// #######################################################################

// ################ TOOLBAR ################

onEvent("v2_home", "click", function( ) {
  // switch screen to main menu
  console.log("v2 -> mm");
  form_sentence_and_update();
  setScreen("mainMenu");
});

onEvent("v2_voice", "click", function( ) {
  // cycle voice
  console.log("V2: Cycle voice");
});

onEvent("v2_play", "click", function( ) {
  // play queue
  console.log("V2: Play");
  say_queue();
});

onEvent("v2_backspace", "click", function( ) {
  // remove last item in queue
  console.log("V2: Backspace");
  backspace();
});

onEvent("v2_delete", "click", function( ) {
  // delete entire queue
  console.log("V2: Confirming deletion of queue");
  open_confirm_popup("v2");
});

onEvent("v2_confirm_delN", "click", function( ) {
  // close the popup and do nothing
  close_confirm_popup("v2");
});

onEvent("v2_confirm_delY", "click", function( ) {
  // close the popup and delete the queues
  console.log("V2: clearing queues");
  delete_sentence();
  close_confirm_popup("v2");
});


// ################ GRID ################

onEvent("v2_breathe", "click", function() {
  append_word("breathe");
});

onEvent("v2_close", "click", function() {
  append_word("close");
});

onEvent("v2_come", "click", function() {
  append_word("come");
});

onEvent("v2_get", "click", function() {
  append_word("get");
});

onEvent("v2_give", "click", function() {
  append_word("give");
});

onEvent("v2_hide", "click", function() {
  append_word("hide");
});

onEvent("v2_open", "click", function() {
  append_word("open");
});

onEvent("v2_put", "click", function() {
  append_word("put");
});

onEvent("v2_show", "click", function() {
  append_word("show");
});

onEvent("v2_spook", "click", function() {
  append_word("spook");
});

onEvent("v2_stay", "click", function() {
  append_word("stay");
});

onEvent("v2_touch", "click", function() {
  append_word("touch");
});

onEvent("v2_turn", "click", function() {
  append_word("turn");
});

onEvent("v2_use", "click", function() {
  append_word("use");
});

onEvent("v2_wait", "click", function() {
  append_word("wait");
});



// #######################################################################
//          ##################### VERBS 2 #####################
// #######################################################################

// ################ TOOLBAR ################

onEvent("v1_home", "click", function( ) {
  // switch screen to main menu
  console.log("v1 -> mm");
  form_sentence_and_update();
  setScreen("mainMenu");
});

onEvent("v1_voice", "click", function( ) {
  // cycle voice
  console.log("V1: Cycle voice");
});

onEvent("v1_play", "click", function( ) {
  // play queue
  console.log("V1: Play");
  say_queue();
});

onEvent("v1_backspace", "click", function( ) {
  // remove last item in queue
  console.log("V1: Backspace");
  backspace();
});

onEvent("v1_delete", "click", function( ) {
  // delete entire queue
  console.log("V1: Confirming deletion of queue");
  open_confirm_popup("v1");
});

onEvent("v1_confirm_delN", "click", function( ) {
  // close the popup and do nothing
  close_confirm_popup("v1");
});

onEvent("v1_confirm_delY", "click", function( ) {
  // close the popup and delete the queues
  console.log("V1: clearing queues");
  delete_sentence();
  close_confirm_popup("v1");
});


// ################ GRID ################

onEvent("v1_am", "click", function() {
  append_word("am");
});

onEvent("v1_are", "click", function() {
  append_word("are");
});

onEvent("v1_be", "click", function() {
  append_word("be");
});

onEvent("v1_drink", "click", function() {
  append_word("drink");
});

onEvent("v1_eat", "click", function() {
  append_word("eat");
});

onEvent("v1_go", "click", function() {
  append_word("go");
});

onEvent("v1_have", "click", function() {
  append_word("have");
});

onEvent("v1_help", "click", function() {
  append_word("help");
});

onEvent("v1_is", "click", function() {
  append_word("is");
});

onEvent("v1_make", "click", function() {
  append_word("make");
});

onEvent("v1_need", "click", function() {
  append_word("need");
});

onEvent("v1_pause", "click", function() {
  append_word("pause");
});

onEvent("v1_stop", "click", function() {
  append_word("stop");
});

onEvent("v1_understand", "click", function() {
  append_word("understand");
});

onEvent("v1_want", "click", function() {
  append_word("want");
});

onEvent("v1_will", "click", function() {
  append_word("will");
});



