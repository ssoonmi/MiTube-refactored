class SessionsController < ApplicationController
  def googleAuth
    # Get access tokens from the google server
    access_token = request.env["omniauth.auth"]
    user = User.from_omniauth(access_token)
    login(user, access_token)
    
    redirect_to root_path
  end
end