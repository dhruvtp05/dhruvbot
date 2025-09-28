const fs = require('fs');
const path = require('path');

// ✅ Correct paths
const dirPath = path.join(__dirname, '..', 'json-logs');
const warningsPath = path.join(dirPath, 'warnings.json');

// ✅ Ensure folder and file exist
function ensureFileExists() {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(warningsPath)) {
    fs.writeFileSync(warningsPath, '{}');
  }
}

// ✅ Load warnings safely
function loadWarnings() {
  ensureFileExists();
  return JSON.parse(fs.readFileSync(warningsPath, 'utf-8'));
}

// ✅ Save warnings back to file
function saveWarnings(data) {
  ensureFileExists();
  fs.writeFileSync(warningsPath, JSON.stringify(data, null, 2));
}

// ✅ Add a warning for a user
function addWarning(userId, moderatorId, reason) {
  const warnings = loadWarnings();
  if (!warnings[userId]) warnings[userId] = [];

  warnings[userId].push({
    reason,
    moderator: moderatorId,
    timestamp: new Date().toISOString()
  });

  saveWarnings(warnings);
}

// ✅ Get a user's warnings
function getWarnings(userId) {
  const warnings = loadWarnings();
  return warnings[userId] || [];
}

function clearWarnings(userId) {
  const warnings = loadWarnings();
  if (warnings[userId]) {
    delete warnings[userId];
    saveWarnings(warnings);
    return true;
  }
  return false;
}

module.exports = { addWarning, getWarnings, clearWarnings };
