class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string "name", null: false, index: true
      t.text "description"
      t.integer "user_id", null: false, index: true
      t.timestamps
    end
  end
end
