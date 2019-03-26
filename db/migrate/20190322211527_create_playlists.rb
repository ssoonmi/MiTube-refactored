class CreatePlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :playlists do |t|
      t.string :title, null: false
      t.string :description
      t.references :ownable, polymorphic: true, null: false, index: true
      t.timestamps
    end
  end
end
