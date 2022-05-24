import { Comment, Avatar } from "antd";

export function generateComment(comments, clickMethod){

    return comments.map((item, index) => {
                        
        return (
            <Comment
                key={item.commentId}
                actions={[<span key="comment-nested-reply-to" onClick={()=>{clickMethod(item.commentId, item)}}>回复</span>]}
                author={<a>{item.author}</a>}
                avatar={<Avatar src={item.avatar} alt={item.author} />}
                content={
                    <p>
                        {item.content}
                    </p>
                }>
                {item.children && item.children.map((item, index) => {
                    //console.log(item);
                    return (
                        <Comment
                            key={item.commentId}
                            author={<a>{item.author}</a>}
                            avatar={<Avatar src={item.avatar} alt={item.author} />}
                            content={
                                <p>
                                    {item.content}
                                </p>
                            }>
                        </Comment>
                    )
                })}
            </Comment>
        )
    
})
}