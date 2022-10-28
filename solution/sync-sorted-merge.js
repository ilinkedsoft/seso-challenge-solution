"use strict";

const { PriorityQueue } = require('@datastructures-js/priority-queue');
const { enqueueLogEntrySync } = require('./utils');

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const logsQueue = new PriorityQueue((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  });
  logSources.forEach((_, index) => {
    enqueueLogEntrySync(logsQueue, logSources, index);
  });
  while (!logsQueue.isEmpty()) {
    const { index, ...logEntry } = logsQueue.dequeue();
    printer.print(logEntry);
    enqueueLogEntrySync(logsQueue, logSources, index);
  }
  printer.done();
  return console.log("Sync sort complete.");
};
