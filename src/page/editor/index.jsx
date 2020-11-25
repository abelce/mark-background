import React from 'react';
import BraftEditor from 'braft-editor';
import { GET_BLOG_BY_ID, SAVE_BLOG, UPDATE_BLOG } from '@common/constants/blog';
import { saveBlog, getBlogById, updateBlog } from '@domain/blog/actions.js';
import BlogStores from '@domain/blog/store';
import { createEditormd } from '@utils';
import Result from './result';
import { message, Icon } from 'antd';
import Stype from '@page/common/stype';
import UserStore from '@domain/user/store';
import Blog from '@domain/blog/blog';
import BackButton from '@page/common/backButton';
import 'braft-editor/dist/index.css';
import './style';

const POST_TYPES = {
    '/blog/create': 'blog',
    '/links/create': 'link',
    '/essay/create': 'essay',
}

class Edit extends React.Component {

    state = {
        // 文章id
        id: '',
        data: new Blog(),
        model: 'md',
        editorState: BraftEditor.createEditorState(null),
        // 是否保存成功
        saveStatus: false,
    }

    markdownState = null;

    constructor(props) {
        super(props);
        const {match: {path, params}} = this.props;
        if (['/blog/:id/edit', '/links/:id/edit', '/essay/:id/edit'].includes(path)) {
            this.state.id = params.id
        }else {
            this.state.data.type = POST_TYPES[path];
        }
    }

    async componentDidMount() {
        this.subscription = BlogStores.addListener(this.onChange);
        this.markdownState = createEditormd('');
        if (this.state.id) {
            getBlogById(this.state.id, { edit: true });
        }
    }

    createEditorState = (blog) => {
        this.markdownState.setMarkdown(blog.content);
    }

    onChange = () => {
        const { type } = BlogStores.lastAction;
        switch (type) {
            case GET_BLOG_BY_ID:
                let blog = BlogStores.getById(this.state.id)
                this.setState({
                    data: blog,
                    // model: blog.type,
                });
                this.createEditorState(blog);
                break;
            case UPDATE_BLOG:
                blog = BlogStores.getById(this.state.id)
                this.setState({
                    data: blog,
                    saveStatus: true,
                });
                break;
            case SAVE_BLOG:
                blog = BlogStores.lastAction.payload;
                this.setState({
                    data: BlogStores.getById(blog.id),
                    saveStatus: true,
                });
                break;
            default:
                break;
        }
    }

    getHeaderText = () => {
        const texts = {
            'blog': '博客',
            'link': '链接',
            'essay': '随笔',
        }
        return texts[this.state.data.type];
    }

    handleSuccess = () => {
        // message.success('提交成功');
        // setTimeout(() => {
        //     this.props.history.push('/blog/result');
        // }, 1000);
    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        // const htmlContent = this.state.editorState.toHTML()
        // const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState) => {
        this.setState({
            editorState,
        })
    }

    handleTitleChange = e => {
        const { data } = this.state;
        data.title = e.target.value.trim();
        this.setState({
            data,
        });
    }

    handleDescChange = e => {
        const { data } = this.state;
        data.description = e.target.value;
        this.setState({
            data,
        });
    }

    handleTagsChange = (tags = []) => {
        const {data} = this.state;
        data.tags = tags;
        this.setState({
            data,
        })
    }

    handleSave = e => {
        const { data, model, editorState } = this.state;
        if (!data.title) {
            message.error('标题不能为空');
            return;
        }
        if (!data.tags || data.tags.length === 0) {
            message.error('请添加标签');
            return;
        }
        if (!editorState) {
            message.error('内容不能为空');
            return;
        }
        // if (model === "html") {
        //     data.content = editorState.toHTML();
        // } else {
        data.content = this.markdownState.getMarkdown();
        // }
        data.raw = editorState.toRAW();
        // 暂时设为html
        data.id ? updateBlog(data) : saveBlog(data);
    }

    handleBack = () => {
        const urls = {
            'blog': 'blogs',
            'link': 'links'
        }
        this.props.history.push(`/users/${urls[this.state.data.type]}`);
    }

    render() {
        const { data, saveStatus } = this.state;
        return (
            <>
                <div className="edit" style={{ display: saveStatus ? 'none' : 'block' }}>
                    <div className="edit_header">
                        <BackButton/>
                        <h2>{this.getHeaderText()}</h2>
                        <a 
                            className="save_btn"
                            href="javascript:;" 
                            onClick={this.handleSave}>
                            <Icon type="to-top" />
                            发布
                        </a>
                    </div>
                    <div className="edit_body">
                        <input 
                            className="title" 
                            placeholder="标题..."
                            contentEditable={true} 
                            spellCheck={false}
                            value={data.title} 
                            onChange={this.handleTitleChange}></input>
                        <div className="edit_block">
                            <Stype 
                                type="blog" 
                                operatorID={UserStore.current.id}
                                value={data.tags}
                                onChange={this.handleTagsChange}/>
                        </div>
                        <div className="edit_content">
                            <div id="test-editormd"></div>
                        </div>
                    </div>
                </div>
                {saveStatus ? <Result data={data} onBack={this.handleBack}/> : null}
            </>
        )

    }

}

export default Edit;