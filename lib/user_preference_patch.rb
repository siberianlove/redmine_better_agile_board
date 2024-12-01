class UserPreferencePatch
  # Получение значения настройки toggle_scroll
  def toggle_scroll
    others['toggle_scroll']
  end

  # Установка значения настройки toggle_scroll
  def toggle_scroll=(value)
    self.others ||= {}
    self.others['toggle_scroll'] = value
  end
end

Rails.application.config.to_prepare do
  UserPreference.prepend(UserPreferencePatch)
end