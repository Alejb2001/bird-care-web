source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins

# Windows y JRuby no incluyen archivos de zona horaria
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:windows]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
