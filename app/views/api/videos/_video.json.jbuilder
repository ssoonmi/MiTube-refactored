json.extract! video, :id, :title, :description, :channel_id, :created_at
json.thumbnail polymorphic_url(video.thumbnail) if video.thumbnail.attached?
json.video polymorphic_url(video.video) if video.video.attached?
json.numLikes video.like_count
json.numDislikes video.dislike_count
json.numViews video.num_views
json.numComments video.num_comments