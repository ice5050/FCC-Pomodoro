function PomodoroTimer(config) {
  config = config || {};
  this.pomodoroTimer = new Timer({
    endTime: config.endTime || 1500,
    afterTick: config.afterPomodoroTick || (function() {}),
    afterFinish: config.afterPomodoroFinish || (function() {})
  });
  this.breakTimer = new Timer({
    endTime: config.endTime || 300,
    afterTick: config.afterBreakTick || (function() {}),
    afterFinish: config.afterBreakFinish || (function() {})
  });
  this.state = config.state || 0;
}

PomodoroTimer.prototype.pomodoroStart = function() {
  this.pomodoroTimer.start();
  this.setStatePomoRunning();
};

PomodoroTimer.prototype.pomodoroPause = function() {
  this.pomodoroTimer.pause();
  this.setStatePomoPause();
};

PomodoroTimer.prototype.breakStart = function() {
  this.breakTimer.start();
  this.setStateBreakRunning();
};

PomodoroTimer.prototype.breakPause = function() {
  this.breakTimer.pause();
  this.setStateBreakPause();
};

PomodoroTimer.prototype.reset = function() {
  this.pomodoroTimer.reset();
  this.breakTimer.reset();
  this.setStatePomoInit();
};

PomodoroTimer.prototype.setStatePomoInit = function() {
  this.state = 0;
};

PomodoroTimer.prototype.setStatePomoRunning = function() {
  this.state = 1;
};

PomodoroTimer.prototype.setStatePomoPause = function() {
  this.state = 2;
};

PomodoroTimer.prototype.setStateBreakInit = function() {
  this.state = 3;
};

PomodoroTimer.prototype.setStateBreakRunning = function() {
  this.state = 4;
};

PomodoroTimer.prototype.setStateBreakPause = function() {
  this.state = 5;
};

PomodoroTimer.prototype.getState = function() {
  var STATES = [
    "POMO_INIT", // 0
    "POMO_RUNNING", // 1
    "POMO_PAUSE", // 2
    "BREAK_INIT", // 3
    "BREAK_RUNNING", // 4
    "BREAK_PAUSE" // 5
  ];
  return STATES[this.state];
};

PomodoroTimer.prototype.getRemainingPomoSec = function() {
  return this.pomodoroTimer.getRemainingSec();
};

PomodoroTimer.prototype.getRemainingPomoMin = function() {
  return this.pomodoroTimer.getRemainingMin();
};

PomodoroTimer.prototype.getRemainingBreakSec = function() {
  return this.breakTimer.getRemainingSec();
};

PomodoroTimer.prototype.getRemainingBreakMin = function() {
  return this.breakTimer.getRemainingMin();
};

PomodoroTimer.prototype.setPomoMin = function(min) {
  this.pomodoroTimer.setMin(min);
};

PomodoroTimer.prototype.setBreakMin = function(min) {
  this.breakTimer.setMin(min);
};
