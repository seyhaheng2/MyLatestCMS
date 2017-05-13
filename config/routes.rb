Rails.application.routes.draw do

  resources :sites
  get 'page/privacy'

  get 'page/contact'

  get 'page/dmca'

  get 'page/about'

  mount Ckeditor::Engine => '/ckeditor'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  resources :contacts, only: [:new, :create]

  get 'tags/:tag', to: 'posts#index', as: :tag
  get "posts/:id", to: redirect("/%{id}")
  resources :posts, path: '',except: [:index]


  resources :users
  resources :subcategories do
    resources :posts, only: [:index, :show]
  end
  resources :categories
  get 'home/index'
  root 'posts#index'
  get :generate_sitemap, to: 'pages#generate_sitemap'
  get '/robots.txt' => RobotsTxt
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
