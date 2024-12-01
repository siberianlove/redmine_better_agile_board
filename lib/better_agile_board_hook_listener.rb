class BetterAgileBoardHookListener < Redmine::Hook::ViewListener
  render_on :view_agile_board_additional_options, partial: 'hooks/toggle_scroll'
  def view_layouts_base_html_head(context = {})
    stylesheet_link_tag('better_agile_board', plugin: 'redmine_better_agile_board') +
      javascript_include_tag('better_agile_board', plugin: 'redmine_better_agile_board')
  end
end