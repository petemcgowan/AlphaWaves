

DIRECTORY: GentleWavesonaSmallWhiteRockBeach
INPUT FILENAME: GentleWavesonaSmallWhiteRockBeach

ffmpeg -i GentleWavesonaSmallWhiteRockBeach.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream_%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2" \
-master_pl_name master.m3u8 stream_%v.m3u8

DIRECTORY: RainInACar
INPUT FILENAME: RainInACar540x960

ffmpeg -i RainInACar540x960.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream_%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2" \
-master_pl_name master.m3u8 stream_%v.m3u8


DIRECTORY: rainInPorchOverlookingForest
INPUT FILENAME: rainInPorchOverlookingForest

ffmpeg -i rainInPorchOverlookingForest.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream_%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2" \
-master_pl_name master.m3u8 stream_%v.m3u8


DIRECTORY: HeavyRainOnWindowOnTheTrain
INPUT FILENAME: HeavyRainOnWindowOnTheTrain

ffmpeg -i HeavyRainOnWindowOnTheTrain.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream_%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2" \
-master_pl_name master.m3u8 stream_%v.m3u8


DIRECTORY: RainPouringDown
INPUT FILENAME: RainPouringDown

ffmpeg -i RainPouringDown.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream_%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2" \
-master_pl_name master.m3u8 stream_%v.m3u8




DESIGN (these aren't larger, they're longer, all about 540 x 960)

GentleWavesonaSmallWhiteRockBeach.mp4 
RainInACar540x960.mp4 
rainInPorchOverlookingForest.mp4 
HeavyRainOnWindowOnTheTrain.mp4 
RainPouringDown.mp4 




