var pomodoroTimer;

$(document).ready(function() {
  pomodoroTimer = new PomodoroTimer({
    afterPomodoroTick: updatePomodoroTimer,
    afterBreakTick: updateBreakTimer,
    afterPomodoroFinish: afterPomodoroFinish,
    afterBreakFinish: afterBreakFinish
  });

  $(".timer.pomo").on("change", "#min-txt", function(e) {
    pomodoroTimer.setPomoMin($(e.currentTarget).val());
    updatePomodoroTimer(pomodoroTimer);
  });

  $(".timer.break").on("change", "#min-txt", function(e) {
    pomodoroTimer.setBreakMin($(e.currentTarget).val());
    updateBreakTimer(pomodoroTimer);
  });

  $(".timer.pomo").on("click", ".start", function(e) {
    $(".timer")
      .removeClass("init")
      .removeClass("pause")
      .addClass("running");
    pomodoroTimer.start();
  });

  $(".timer").on("click", ".pause", function(e) {
    $(".timer")
      .removeClass("running")
      .addClass("pause");
    pomodoroTimer.pause();
  });

  $(".timer").on("click", ".reset", function(e) {
    $(".timer")
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
  $(".timer")
    .removeClass("pomo")
    .removeClass("pause")
    .removeClass("running")
    .addClass("break")
    .addClass("init");
  updateBreakTimer(pomodoroTimer);
}

function afterBreakFinish() {
  pomodoroTimer.setStatePomoInit();
  $(".timer")
    .removeClass("break")
    .removeClass("pause")
    .removeClass("running")
    .addClass("pomo")
    .addClass("init");
  updatePomodoroTimer(pomodoroTimer);
}

function updatePomodoroTimer(pomodoroTimer) {
  var $min = $(".min"),
      $minTxt = $(".min-txt"),
      $sec = $(".sec"),
      $minTxt = $("#min-txt");

  $min.text(pomodoroTimer.getRemainingPomoMin());
  $sec.text(pomodoroTimer.getRemainingPomoSec());
}

function updateBreakTimer(breakTimer) {
  var $min = $(".min"),
      $minTxt = $(".min-txt"),
      $sec = $(".sec"),
      $minTxt = $("#min-txt");

  $min.text(breakTimer.getRemainingBreakMin());
  $sec.text(breakTimer.getRemainingBreakSec());
}
