require 'json'

w = ARGV[0].to_i
h = ARGV[1].to_i

puts w
puts h

@obj = {
        title:  "",
        width:  w,
        height: h,
        tiles: [],
        data: []
      }

for i in 0..(w-1) do
  for j in 0..(h-1) do
    @obj[:tiles] << {x: i, y: j}
  end
end

f = File.open("../src/assets/maps/map.json", "w")

f.puts JSON.pretty_generate(@obj)
