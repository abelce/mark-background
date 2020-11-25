/**
 * 捕获没有catch的Promise错误，
 */
if(!window.__UNHANDLEREJECTION_ADDED) {
    window.addEventListener('unhandledrejection', function(e){
        console.log('promise',e);
    
        e.preventDefault();
        return true;
    })
    window.__UNHANDLEREJECTION_ADDED = true;
}

