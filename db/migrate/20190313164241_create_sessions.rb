class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.integer :user_id, null: false, index: true
      t.string :session_token, null: false, index: true
      t.string :provider
      t.string :uid
      t.string :token
      t.integer :expires_at
      t.boolean :expires
      t.string :refresh_token
    end

    remove_column :users, :session_token
  end
end
