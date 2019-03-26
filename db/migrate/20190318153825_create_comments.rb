class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text "body", null: false
      t.integer "user_id", null: false, index: true
      t.integer "video_id", null: false, index: true
      t.timestamps
      t.integer "parent_comment_id", index: true
    end
  end
end
