# == Schema Information
#
# Table name: sessions
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  session_token :string           not null
#  provider      :string
#  uid           :string
#  token         :string
#  expires_at    :integer
#  expires       :boolean
#  refresh_token :string
#

class Session < ApplicationRecord
  validates :session_token, presence: true
  after_create :limit_sessions_per_user

  after_initialize :ensure_session_token

  belongs_to :user

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = Session.generate_session_token
    self.save!
  end

  def ensure_session_token
    self.session_token = Session.generate_session_token
  end

  def limit_sessions_per_user
    Session.offset(5).order('id DESC').destroy_all
  end
end
