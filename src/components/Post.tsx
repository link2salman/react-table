
export type Post = {
    userId: number, id: number, title: string, body: string
} | undefined

const Post = ({ post }: { post: Post }) => {
    return (
        <div className="post">
            <div className="post_title">
                {post?.title}
            </div>
            <div className="post_body">
                {post?.body}
            </div>
        </div>
    )
}

export default Post