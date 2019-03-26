json.channels do
  json.array! [@channel] do
    json.partial! 'api/channels/channel', channel: @channel
    json.videoIds @videos.ids if @videos.present?
  end
end

if @videos.present?
  json.videos do
    @videos.each do |video|
      json.set! video.id do
        json.partial! 'api/videos/video', video: video
      end
    end
  end
end