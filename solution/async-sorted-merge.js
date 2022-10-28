"use strict";

const { PriorityQueue } = require('@datastructures-js/priority-queue');
const { enqueueLogEntryAsync } = require('./utils');

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const logsQueue = new PriorityQueue((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  });
  const enqueuePromises = [];
  logSources.forEach((_, index) => {
    enqueuePromises.push(enqueueLogEntryAsync(logsQueue, logSources, index));
  });
  await Promise.all(enqueuePromises);
  while (!logsQueue.isEmpty()) {
    const { index, ...logEntry } = logsQueue.dequeue();
    printer.print(logEntry);
    await enqueueLogEntryAsync(logsQueue, logSources, index);
  }
  printer.done();
  return console.log("Async sort complete.");
};
