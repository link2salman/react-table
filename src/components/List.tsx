import Post from "./Post"

type List = {
    userId: number, id: number, title: string, body: string
}

const List = ({ data }: { data: List[] | undefined }) => {
    return (
        <div className="list">
            {data?.map((post, idx) => <Post post={post} key={`${idx + post.id}post.id`} />)}
        </div>
    )
}

export default List