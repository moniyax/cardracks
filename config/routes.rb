Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
    resources :boards, shallow: true do
      resources :card_racks
    end

    resources :card_racks, shallow: true do
      resources :cards do
        member do
          post 'reorder'
        end
      end
    end

    resource :session, only: [:create, :destroy]
    resources :users
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
