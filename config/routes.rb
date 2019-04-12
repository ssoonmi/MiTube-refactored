Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  # Routes for Google authentication
  get 'auth/:provider/callback', to: 'sessions#googleAuth'
  get 'auth/failure', to: redirect('/')

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:destroy]

    resources :users, only: [] do
      resources :channels, only: [:index]
    end

    resources :channels, only: [:create, :show, :index, :destroy, :update] do
      member do
        post :subscribe, to: 'channels#subscribe', as: 'subscribe'
        delete :unsubscribe, to: 'channels#unsubscribe', as: 'unsubscribe'
      end
      resources :playlists, only: [:create, :index]
      resources :videos, only: [:create, :index]
    end

    resources :videos, only: [:show, :destroy, :update] do
      collection do
        get :search, to: 'searches#search_query', as: 'search'
      end
      resources :comments, only: [:create, :index]
      member do
        post :uplike, to: 'videos#uplike', as: 'uplike'
        post :downlike, to: 'videos#downlike', as: 'downlike'
        delete :unlike, to: 'videos#unlike', as: 'unlike'
        post :view, to: 'videos#view', as: 'view'
      end
    end

    resources :comments, only: [:update, :destroy] do
      member do
        post :uplike, to: 'comments#uplike', as: 'uplike'
        post :downlike, to: 'comments#downlike', as: 'downlike'
        delete :unlike, to: 'comments#unlike', as: 'unlike'
      end
    end

    resources :playlists, only: [:destroy, :create, :index, :show] do
      resources :videos, only: [] do
        post :add, to: 'playlists#add_video', as: 'add_video'
        delete :delete, to: 'playlists#delete_video', as: 'delete_video'
      end
    end
  end
end
