/**
 * 1. 补货运行时错误，包括：
 * 堆栈、出错文件、行号、列号
 * 以及异步代码错误
 * 
 */
if(!window.__ONERROR_ADDED) {
    window.onerror = function(message, source, lineno, colno, error) {
        const data = {
            type: 'script',
            message,
            source,
            lineno,
            colno,
            error,
        }
        console.log('onerror', data);
    
        // 阻止向上冒泡
        return true;
    }
    window.__ONERROR_ADDED = true;  
}