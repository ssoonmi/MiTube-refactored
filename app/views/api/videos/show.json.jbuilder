json.video do
  json.partial! 'api/videos/video', video: @video
  json.commentIds @comments.ids if @comments.present?
end

json.channels do
  json.array! [@channel] do
    json.partial! 'api/channels/channel', channel: @channel
    json.videoIds [@video.id]
  end
end

if @comments.present?
  json.comments do
    @comments.each do |comment|
      json.set! comment.id do
        json.partial! 'api/comments/comment', comment: comment
      end
    end
  end
end