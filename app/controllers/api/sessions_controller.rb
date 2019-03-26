class Api::SessionsController < ApplicationController
  def destroy 
    id = current_user.id
    logout
    render json: {id: id}
  end
end