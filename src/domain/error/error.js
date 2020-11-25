/**
 * 错误对象
 */
class VTError {
    constructor(data) {
        // 错误类型: script、static、promise、http
        this.type = data.type;
        
        // 错误信息
        this.message = data.message;
        // 错误脚本url
        this.source = data.source;
        // 行号
        this.lineno = data.lineno;
        // 列号
        this.colno = data.colno;
        // 错误对象
        this.error = data.error;
        
        // 错误元素
        this.tagName = data.tagName;
        // 错误元素的src
        this.src = data.src;
 
    }
}