import LocalStorage from 'store';
import qs from 'qs'

/**
 * 
 * @param {*} container 
 * @param {*} target 
 * @param {*} totalPage 
 * @param {*} currentPage 
 * @return true/false
 */
export const isLoadMore = function (container, target) {
    let containerNode = document.querySelector(container);
    let targetNode = typeof target === 'object' ? target : document.querySelector(target);
    let scrollTop = containerNode.scrollTop;
    if (scrollTop >= targetNode.scrollHeight - containerNode.clientHeight) {
        return true;
    }

    return false;
}

export function isDev() {
    return __ENV__ === 'development' ? true : false;
}

export function isProd() {
    return __ENV__ === 'production' ? true : false;
}

/**
 * 获取菜单栏地址，
 * 生产环境是tangzhengxiong.com/path
 */
export function getBlogPath(path) {
    if (isProd()) {
        return `${path}.html`
    }
    return path;
}

export function getStaticPath(name) {
    if (isDev()) {
        return `tools/${name}`;
    }

    return `/tools/${name}/index.html`;
}

export function addScript(js) {
    let script = document.createElement('script');
    script.innerHTML = `${js}`;

    let body = document.querySelector('body');
    body.appendChild(script);
}

export function isAdmin() {
    return __ENV__ === 'admin' ? true : false;
}


export const getEditorPluginPath = function () {
    return '../../assets/plugins/editor/lib/';
};


export function createEditormd(content, onload) {
    try {
        return editormd('test-editormd', {
            width: '100%',
            height: '100%',
            path: getEditorPluginPath(),
            toolbarIcons: function () {
                // Or return editormd.toolbarModes[name]; // full, simple, mini
                // Using "||" set icons align right.
                return ["undo", "redo", "bold", "del", "hr", "italic", "h1", "h2", "h3", "h4", "link", "image", "table", "datetime", "emoji", "||", "watch", "fullscreen", "preview"]
            },
            theme: 'light',
            // previewTheme: 'light',
            editorTheme: 'default',
            markdown: content,
            codeFold: true,
            //syncScrolling : false,
            saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            searchReplace: true,
            watch: false, // 关闭实时预览
            htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
            //toolbar  : false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji: true,
            taskList: true,
            tocm: true, // Using [TOCM]
            tex: true, // 开启科学公式TeX语言支持，默认关闭
            flowChart: true, // 开启流程图支持，默认关闭
            sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload: true,
            imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
            // imageUploadURL: './php/upload.php',
            onload: () => {
                // console.log('onload', this);
                //this.fullscreen();
                //this.unwatch();
                // this.watch().fullscreen();
                if (typeof onload === 'function') {
                    onload();
                }
            },
            onpreviewing: function() {
                this.watch();
            },
            onpreviewed: function() {
                this.unwatch();
            },
        });
    } catch (e) {

    }
}

export function getAuthInfo() {
    return LocalStorage.get('user');
}

export function getToken() {
    const user = getAuthInfo();
    if (user) {
        return user.token;
    }
    return "";
}

export function isOwner(operatorID) {
    const user = getAuthInfo();
    if (!user) {
        return false;
    }
    return user.id === operatorID;
}

export function getUrlQueryObj() {
    let search = window.location.search
    if (search) {
        return qs.parse(search.slice(1))
    }
    return {}
}


export const parseQuery = () => {
    const str = window.location.search.slice(1);
    const queryObj = qs.parse(str);
    return queryObj;
  }
  
  export const getQueryValue = (key: string): any => {
    return parseQuery()[key];
  }