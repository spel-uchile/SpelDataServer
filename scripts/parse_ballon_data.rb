require 'nokogiri'
require 'open-uri'
require 'mongo'
require 'json'


class ParseBalloonData
  @client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'AprsData')

  @url  = 'https://aprs.fi/?c=raw&call=CE3BUC-11&limit=1000&view=normal'
  @reg = /(^\d{1,4}-\d{1,2}-\d{1,2}\D\d{1,4}:\d{1,2}:\d{1,2}).*C.+-.+:(\d{1,4}-\d{1,2}-\d{1,2}.\d{1,2}:\d{1,2}:\d{1,2})\D(\d{1,4}.*\d{1,3}Z)\D(-*\d+\.\d*)\D(-*\d+\.\d*).(-*\d+\.\d*)\D(-*\d+\.\d*)\D(-*\d+\.\d*)\D(-*\d+\.\d*)\D(-*\d+)\D(-*\d+)\D(-*\d+\.\d*)\D(-*\d+\.\d*)\D(-*\d+)\D(-*\d+).*\[.*\]/
  @reg2 = /(^\d{1,4}-\d{1,2}-\d{1,2}\D\d{1,4}:\d{1,2}:\d{1,2}).*C.+-.+:!(\d{1,4}-\d{1,2}-\d{1,2}.\d{1,2}:\d{1,2}:\d{1,2})\D(\d{1,4}.*\d{1,3}Z)\D(-*\d+\.\d*)\D(-*\d+\.\d*).(-*\d+\.\d*)\D(-*\d+\.\d*)\D(-*\d+\.\d*)\D(-*\d+\.\d*)\D(-*\d+)\D(-*\d+)\D(-*\d+\.\d*)\D(-*\d+\.\d*)\D(-*\d+)\D(-*\d+)\D(\D\d?).*\[.*\]/
  @headers = ["aprsTime", "sqliteTime", "gpsTime","gpsLat","gpsLon","gpsHeight","gpsVx","gpsVy","gpsSats","gpsMode","bmpTemp","bmpPres","bmpAlt","dplLA","dplSA", "phase"]

  def self.parse_data()
    doc = Nokogiri::HTML(open(@url))
    items = doc.xpath('//span[@class="raw_line_err"]')

    # aprs_data = items.collect {|node|  if node.text.match(@reg2) then node.text.scan(@reg2) else node.text.scan(@reg) end }.select {|val| val.size > 0}
    aprs_data = items.collect {|node|  if node.text.match(@reg2) then node.text.scan(@reg2) else [] end }.select {|val| val.size > 0}
    aprs_hashes = aprs_data.collect {|data|
      h = Hash.new()
      @headers.each_with_index {|head, index| h[head] = data[0][index]}
      data =  @client[:packages].find({"aprsTime" => h["aprsTime"]})
      found =0
      data.each {|val| found += 1}
      if found == 0
        p 'updating or creating one'
        @client[:packages].update_one( {"aprsTime" => h["aprsTime"]}, h, {upsert: true})
      end
      p 'not creating'
    }
  end

end

data = ParseBalloonData
while true
  data.parse_data()
  sleep(10)
end
