class BetterAgileBoardController < ApplicationController
  before_action :require_login
  protect_from_forgery with: :exception

  def save_user_setting
    Rails.logger.info "Received params: #{params.inspect}" # Логирование параметров

    if params[:toggleScroll] == true || params[:toggleScroll] == false
      # Сохраняем настройку в others
      User.current.pref.others['toggle_scroll'] = ActiveModel::Type::Boolean.new.cast(params[:toggleScroll])
      if User.current.pref.save
        render json: { success: true }
      else
        render json: { error: 'Failed to save settings' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid parameters' }, status: :unprocessable_entity
    end
  end

  def load_user_setting
    # Читаем настройку из others
    render json: { toggleScroll: User.current.pref.others['toggle_scroll'] }
  end
end