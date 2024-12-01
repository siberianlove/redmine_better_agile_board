Redmine::Plugin.register :redmine_better_agile_board do
  name 'Redmine Plugin that enhances RedmineUP Agile plugin'
  author 'Viktor Rybakov (siberianlove)'
  description 'This plugin adds the ability to enable/disable column scrolling on the Agile board and fast filters by user'
  version '0.1.0'
  url 'https://github.com/siberianlove/redmine_better_agile_board'
  author_url 'https://github.com/siberianlove/'

  settings partial: 'settings/toggle_scroll_settings',
           default: { 'toggle_scroll_default' => false }
  require_relative 'lib/better_agile_board_hook_listener'
  require_relative 'lib/user_preference_patch'
end