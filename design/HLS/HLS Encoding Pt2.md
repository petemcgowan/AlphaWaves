DIRECTORY: RainFallingOnLeaves
INPUT FILENAME: RainFallingOnLeaves

ffmpeg -i RainFallingOnLeaves.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1400k -s:v:2 540x960 -c:v:2 libx264 \
-map 0:v:0 -b:v:3 2100k -s:v:3 720x1280 -c:v:3 libx264 \
-map 0:v:0 -b:v:4 3000k -s:v:4 1080x1920 -c:v:4 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2 v:3 v:4" \
-master_pl_name master.m3u8 stream%v.m3u8

DIRECTORY: RainInACarAltHD
INPUT FILENAME: RainInACarAltHD

ffmpeg -i RainInACarAltHD.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1400k -s:v:2 540x960 -c:v:2 libx264 \
-map 0:v:0 -b:v:3 2100k -s:v:3 720x1280 -c:v:3 libx264 \
-map 0:v:0 -b:v:4 3000k -s:v:4 1080x1920 -c:v:4 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2 v:3 v:4" \
-master_pl_name master.m3u8 stream%v.m3u8

DIRECTORY: rainInPorchOverlookingForest
INPUT FILENAME: rainInPorchOverlookingForest

ffmpeg -i rainInPorchOverlookingForest.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1400k -s:v:2 540x960 -c:v:2 libx264 \
-map 0:v:0 -b:v:3 2100k -s:v:3 720x1280 -c:v:3 libx264 \
-map 0:v:0 -b:v:4 3000k -s:v:4 1080x1920 -c:v:4 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2 v:3 v:4" \
-master_pl_name master.m3u8 stream%v.m3u8

DIRECTORY: rainPouringDown
INPUT FILENAME: rainPouringDown

ffmpeg -i rainPouringDown.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1400k -s:v:2 540x960 -c:v:2 libx264 \
-map 0:v:0 -b:v:3 2100k -s:v:3 720x1280 -c:v:3 libx264 \
-map 0:v:0 -b:v:4 3000k -s:v:4 1080x1920 -c:v:4 libx264 \
-f hls -hls_time 4 -hls_playlist_type vod -hls_segment_filename 'stream%v/data%06d.ts' \
-var_stream_map "v:0 v:1 v:2 v:3 v:4" \
-master_pl_name master.m3u8 stream%v.m3u8
