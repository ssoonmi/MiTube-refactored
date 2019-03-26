class AddIndexesToPlaylistsAndPlaylistVideos < ActiveRecord::Migration[5.2]
  def change
    add_index :playlist_videos, :video_id
    add_index :playlist_videos, :playlist_id
  end
end
