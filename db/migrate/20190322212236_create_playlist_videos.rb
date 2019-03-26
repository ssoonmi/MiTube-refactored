class CreatePlaylistVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :playlist_videos do |t|
      t.integer :video_id, null: false
      t.integer :playlist_id, null: false
    end
    add_index :playlist_videos, [:video_id, :playlist_id], unique: true
  end
end
