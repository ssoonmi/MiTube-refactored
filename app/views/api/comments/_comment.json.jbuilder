json.extract! comment, :id, :body, :user_id, :video_id, :created_at, :updated_at, :parent_comment_id
json.numLikes comment.like_count
json.numDislikes comment.dislike_count