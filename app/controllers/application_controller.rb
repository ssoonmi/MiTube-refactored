class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  
  def login(user, access_token)
    current_session = user.sessions.new
    # Access_token is used to authenticate request made from the rails application to the google server
    current_session.token = access_token.credentials.token
    # Refresh_token to request new access_token
    # Note: Refresh_token is only sent once during the first request
    refresh_token = access_token.credentials.refresh_token
    current_session.refresh_token = refresh_token if refresh_token.present?
    current_session.expires = access_token.credentials.expires
    current_session.expires_at = access_token.credentials.expires_at
    current_session.save

    cookies[:session_token] = { 
      value: current_session.session_token, 
      expires: Time.strptime(current_session.expires_at.to_s, '%s')
    }
  end

  def logout
    if current_user
      @current_session.destroy
      cookies[:session_token] = nil
      @current_user = nil
    end
  end

  def logged_in?
    !!current_user
  end

  def current_user
    if cookies[:session_token]
      @current_session ||= Session.find_by(session_token: cookies[:session_token])
      if @current_session
        @current_user ||= User.find(@current_session.user_id)
      else
        @current_user = nil
        cookies[:session_token] = nil
      end
    else
      @current_user = nil
    end
  end

  def ensure_logged_in
    render json: ["Needs to be logged in"], status: 401 unless logged_in?
  end
end
