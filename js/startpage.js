/**
 * Opens a dialog by adding the 'active' class to the specified dialog element.
 * @param {string} dialogId - The ID of the dialog element to open.
 */
function openDialog(dialogId) {
  document.getElementById(dialogId).classList.add('active')
}

/**
 * Closes a dialog by removing the 'active' class from the specified dialog element.
 * @param {string} dialogId - The ID of the dialog element to close.
 */
function closeDialog(dialogId) {
  document.getElementById(dialogId).classList.remove('active')
}
