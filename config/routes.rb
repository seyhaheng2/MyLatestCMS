Rails.application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  get "posts/:id", to: redirect("/%{id}")
  resources :posts, path: '',except: [:index]


  resources :users
  resources :subcategories
  resources :categories
  get 'home/index'
  root 'posts#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
