import moment from "moment"
import 'moment/locale/zh-cn';
export function formatComments(res){
    const newComments = []
    for (let i = 0; i < res.length; i++) {
        let temp = {
            author: res[i].user_name,
            avatar: 'http://' + res[i].avatar,
            content: res[i].comment_content,
            datetime: moment(res[i].updateAt).fromNow(),
            parentCommentId: res[i].parent_comment_id,
            commentId: res[i].commment_id
        }
        newComments.push(temp)

    }
    const tempComments = []
    for (let i = 0; i < newComments.length; i++) {
        if (newComments[i].isPush) continue
        for (let j = 0; j < newComments.length; j++) {
            if (i === j) continue
            if (newComments[i].isPush) continue
            if (newComments[i].commentId === newComments[j].parentCommentId) {
                newComments[j].isPush = true
                if (!newComments[i].children) {
                    newComments[i].children = [newComments[j]]
                } else {
                    newComments[i].children.push(newComments[j])
                }
            }
        }
        tempComments.push(newComments[i])
    }
    return tempComments
}