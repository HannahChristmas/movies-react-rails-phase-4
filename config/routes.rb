Rails.application.routes.draw do
  # During interviews, always put a route at the top
  get '/grabmovies/:letter', to: 'movies#grab'

  resources :reviews
  resources :users, only: [:index, :create, :show]
  resources :movies

  # Routing logic: fallback requests for React Router.
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
