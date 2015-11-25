var pomodoroTimer;

$(document).ready(function() {
  pomodoroTimer = new PomodoroTimer({
    afterPomodoroTick: updatePomodoroTimer,
    afterBreakTick: updateBreakTimer,
    afterPomodoroFinish: afterPomodoroFinish,
    afterBreakFinish: afterBreakFinish
  });

  $(".timer").on("change", ".state.pomo #min-txt", function(e) {
    pomodoroTimer.setPomoMin($(e.currentTarget).val());
    updatePomodoroTimer(pomodoroTimer);
  });

  $(".timer").on("change", ".state.break #min-txt", function(e) {
    pomodoroTimer.setBreakMin($(e.currentTarget).val());
    updateBreakTimer(pomodoroTimer);
  });

  $(".timer").on("click", ".state.pomo .start, .state.pomo .resume", function(e) {
    $(".timer .state")
      .removeClass("init")
      .removeClass("pause")
      .addClass("running");
    pomodoroTimer.pomodoroStart();
  });

  $(".timer").on("click", ".state.break .start, .state.break .resume", function(e) {
    $(".timer .state")
      .removeClass("init")
      .removeClass("pause")
      .addClass("running");
    pomodoroTimer.breakStart();
  });

  $(".timer").on("click", ".state.pomo .pause", function(e) {
    $(".timer .state")
      .removeClass("running")
      .addClass("pause");
    pomodoroTimer.pomodoroPause();
  });

  $(".timer").on("click", ".state.break .pause", function(e) {
    $(".timer .state")
      .removeClass("running")
      .addClass("pause");
    pomodoroTimer.breakPause();
  });

  $(".timer").on("click", ".reset", function(e) {
    $(".timer .state")
      .removeClass("break")
      .removeClass("pause")
      .removeClass("running")
      .addClass("pomo")
      .addClass("init");
    pomodoroTimer.reset();
    updatePomodoroTimer(pomodoroTimer);
  });
});

function afterPomodoroFinish() {
  pomodoroTimer.setStateBreakInit();
  $(".timer .state")
    .removeClass("pomo")
    .removeClass("pause")
    .removeClass("running")
    .addClass("break")
    .addClass("init");
  updateBreakTimer(pomodoroTimer);
}

function afterBreakFinish() {
  pomodoroTimer.setStatePomoInit();
  $(".timer .state")
    .removeClass("break")
    .removeClass("pause")
    .removeClass("running")
    .addClass("pomo")
    .addClass("init");
  updatePomodoroTimer(pomodoroTimer);
}

function updatePomodoroTimer() {
  var $min = $(".min"),
      $minTxt = $(".min-txt"),
      $sec = $(".sec"),
      $minTxt = $("#min-txt");

  $minTxt.val(pomodoroTimer.getPomoMin());
  $min.text(pomodoroTimer.getRemainingPomoMin());
  $sec.text(pomodoroTimer.getRemainingPomoSec());
}

function updateBreakTimer() {
  var $min = $(".min"),
      $minTxt = $(".min-txt"),
      $sec = $(".sec"),
      $minTxt = $("#min-txt");

  $minTxt.val(pomodoroTimer.getBreakMin());
  $min.text(pomodoroTimer.getRemainingBreakMin());
  $sec.text(pomodoroTimer.getRemainingBreakSec());
}
