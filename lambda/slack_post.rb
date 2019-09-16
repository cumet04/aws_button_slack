require "net/https"
require "uri"

def lambda_handler(event:, context:)
  uri = URI.parse(ENV["SLACK_HOOK_URL"])
  res = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == "https") { |http|
    http.request(Net::HTTP::Post.new(uri).tap { |req|
      req.body = {
        channel: "times-inomoto",
        username: "IoT Button",
        text: ":zzz:",
        icon_emoji: ":amazon:",
      }.to_json
    })
  }
  { statusCode: 200, body: res.to_s }
end
