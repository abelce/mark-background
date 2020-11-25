export class Type {
    constructor(id = "", label, value) {
        this.id = id;
        this.label = label;
        this.value = value
    }
}

const ARTICLE_COLLECTS = [
    {
        id: 101,
        label: '博客',
        value: 'blog'
    },
    {
        id: 102,
        label: '旅行',
        value: 'tour'
    },
];

export const ArticleCollects =ARTICLE_COLLECTS.map( tp => new Type(tp.id, tp.label, tp.value));

const ARTICLE_TAGS = [
    {
        id: 201,
        label: '前端',
        value: 'frontend'
    },
    {
        id: 202,
        label: '后端',
        value: 'backend'
    },
    {
        id: 203,
        label: 'Golang',
        value: 'golang'
    },
]

export const ArticleTags = ARTICLE_TAGS.map( tp => new Type(tp.id, tp.label, tp.value));

