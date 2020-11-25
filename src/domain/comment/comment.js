class Comment {
    children = {
        data: [],
        total: 0,
    }
    constructor(data) {
        this.id = data.id;
        this.content = data.content;
        this.fromID = data.fromID;
        this.fromAvatar = data.fromAvatar;
        this.fromName = data.fromName;
        this.toID = data.toID;
        this.toAvatar = data.toAvatar;
        this.toName = data.toName;
        this.parentID = data.parentID;
        this.deleted = data.deleted;
        this.createdTime = data.createdTime * 1000;
        this.updateTime = data.updateTime * 1000;
        //  评论的层级只存在两级嵌套，简化前端的操作，以及展示
        // {
        //     total: 100,
        //     data: [
        //         comment
        //     ]
        // }
        this.children = data.children || {};
        this.sourceID = data.sourceID;
    }

    get children() {
        return this.children;
    }
}

export function formatComment(data) {
    const aComment = new Comment(data);
    if (data.children && data.children.total > 0) {
        aComment.children.total = data.children.total;
        aComment.children.data = data.children.data.map(ct => new Comment(ct));
    }
    return aComment;
}

export default Comment;