class Blog {
    content = ''
    tags = ''
    title = ''
    description = ''
    url = ''
    type = 'blog'
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.content = data.content;
        this.createdTime = data.createdTime * 1000;
        this.deleted = data.deleted;
        this.operatorID = data.operatorID;
        this.url = data.url;
        this.type = data.type;
        this.viewCount = data.viewCount;
        this.tags = data.tags || [];
        this.likeCount = data.likeCount || 0;
    }
}

export const NewBlog = () => new Blog();

export const FormatBlog = (data) => {
    const {
        id, 
        attributes,
        relationships: {
            operator: {
                data: {
                    id: operatorID
                }
            }
        }
        } = data;
    return new Blog(
        {
            id,
        ...attributes,
        operatorID,
        }
    )
}

export default Blog;