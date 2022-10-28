const enqueueLogEntrySync = (queue, logSources, index) => {
  const logEntry = logSources[index].pop();
  if (logEntry) queue.enqueue({ index, ...logEntry });
  return logEntry;
};

const enqueueLogEntryAsync = async (queue, logSources, index) => {
  const logEntry = await logSources[index].popAsync();
  if (logEntry) queue.enqueue({ index, ...logEntry });
  return logEntry;
};

module.exports = {
  enqueueLogEntrySync,
  enqueueLogEntryAsync
};