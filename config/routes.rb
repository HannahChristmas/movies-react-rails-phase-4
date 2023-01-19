Rails.application.routes.draw do
  
  resources :reviews
  resources :users do 
    resources :reviews
  end
  
  resources :movies
  # Routing logic: fallback requests for React Router.
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/new', to: 'movies#create'
  post '/update', to: 'reviews#update'

  
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
