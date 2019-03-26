class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string "title", null: false
      t.text "description"
      t.integer "channel_id", null: false, index: true
      t.timestamps
    end
  end
end
