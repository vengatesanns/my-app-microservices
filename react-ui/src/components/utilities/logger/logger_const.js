
class Logger {
    success = (message) => { return { open: true, log_info: 'success', log_message: message } };
    error = (message) => { return { open: true, log_info: 'error', log_message: message } };
    warn = (message) => { return { open: true, log_info: 'warning', log_message: message } };
    info = (message) => { return { open: true, log_info: 'info', log_message: message } };
}

export default Logger;