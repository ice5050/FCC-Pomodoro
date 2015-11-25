function Timer(config) {
  config = config || {};
  this.currentTime = config.currentTime || 0;
  this.endTime = config.endTime || 60;
  this.state = config.state || 0;
  this.afterTick = config.afterTick || (function() {});
  this.afterFinish = config.afterFinish || (function() {});
  this.timerId = null;
}

Timer.prototype.start = function() {
  var that = this;
  if (this.isRunning()) {
    return;
  }
  this.setStateRunning();
  this.timerId = setInterval(function() {
    if (that.currentTime >= that.endTime) {
      that.finish();
      return;
    }
    that.tick();
  }, 1000);
};

Timer.prototype.getState = function() {
  var STATES = [
    "INIT",
    "RUNNING",
    "PAUSE",
    "FINISH"
  ];
  return STATES[this.state];
};

Timer.prototype.setStateInit = function() {
  this.state = 0;
};

Timer.prototype.setStateRunning = function() {
  this.state = 1;
};

Timer.prototype.setStatePause = function() {
  this.state = 2;
};

Timer.prototype.setStateFinish = function() {
  this.state = 3;
};

Timer.prototype.tick = function() {
  this.currentTime += 1;
  this.afterTick(this);
};

Timer.prototype.finish = function() {
  this.pause();
  this.setStateFinish();
  this.afterFinish(this);
};

Timer.prototype.pause = function() {
  clearInterval(this.timerId);
  this.timerId = null;
  this.setStatePause();
};

Timer.prototype.reset = function() {
  clearInterval(this.timerId);
  this.timerId = null;
  this.currentTime = 0;
  this.setStateInit();
};

Timer.prototype.isRunning = function() {
  return this.getState() === "RUNNING";
};

Timer.prototype.isEnded = function() {
  return this.getState() === "FINISH";
};

Timer.prototype.setMin = function(min) {
  this.endTime = +min * 60;
};

Timer.prototype.getMin = function() {
  return Math.floor(this.endTime / 60);
};

Timer.prototype.getRemainingMin = function() {
  return Math.floor((this.endTime - this.currentTime) / 60);
};

Timer.prototype.getRemainingSec = function() {
  return ("0" + (this.endTime - this.currentTime) % 60).slice(-2);
};
