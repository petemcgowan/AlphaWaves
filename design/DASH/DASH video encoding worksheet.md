
DIRECTORY: GentleWavesonaSmallWhiteRockBeach

ffmpeg -i GentleWavesonaSmallWhiteRockBeach.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f dash -seg_duration 4 -use_template 1 -use_timeline 1 \
-init_seg_name 'init_$RepresentationID$.m4s' \
-media_seg_name 'chunk_$RepresentationID$_$Number%05d$.m4s' \
-adaptation_sets "id=0,streams=v" GentleWavesonaSmallWhiteRockBeach.mpd

DIRECTORY: RainInACar

ffmpeg -i RainInACar540x960.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f dash -seg_duration 4 -use_template 1 -use_timeline 1 \
-init_seg_name 'init_$RepresentationID$.m4s' \
-media_seg_name 'chunk_$RepresentationID$_$Number%05d$.m4s' \
-adaptation_sets "id=0,streams=v" RainInACar.mpd

DIRECTORY: rainInPorchOverlookingForest

ffmpeg -i rainInPorchOverlookingForest.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f dash -seg_duration 4 -use_template 1 -use_timeline 1 \
-init_seg_name 'init_$RepresentationID$.m4s' \
-media_seg_name 'chunk_$RepresentationID$_$Number%05d$.m4s' \
-adaptation_sets "id=0,streams=v" rainInPorchOverlookingForest.mpd

DIRECTORY: HeavyRainOnWindowOnTheTrain

ffmpeg -i HeavyRainOnWindowOnTheTrain.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f dash -seg_duration 4 -use_template 1 -use_timeline 1 \
-init_seg_name 'init_$RepresentationID$.m4s' \
-media_seg_name 'chunk_$RepresentationID$_$Number%05d$.m4s' \
-adaptation_sets "id=0,streams=v" HeavyRainOnWindowOnTheTrain.mpd

DIRECTORY: RainPouringDown

ffmpeg -i RainPouringDown.mp4 \
-map 0:v:0 -b:v:0 500k -s:v:0 270x480 -c:v:0 libx264 \
-map 0:v:0 -b:v:1 800k -s:v:1 360x640 -c:v:1 libx264 \
-map 0:v:0 -b:v:2 1200k -s:v:2 540x960 -c:v:2 libx264 \
-f dash -seg_duration 4 -use_template 1 -use_timeline 1 \
-init_seg_name 'init_$RepresentationID$.m4s' \
-media_seg_name 'chunk_$RepresentationID$_$Number%05d$.m4s' \
-adaptation_sets "id=0,streams=v" RainPouringDown.mpd




DESIGN (these aren't larger, they're longer, all about 540 x 960)

GentleWavesonaSmallWhiteRockBeach.mp4 
RainInACar540x960.mp4 
rainInPorchOverlookingForest.mp4 
HeavyRainOnWindowOnTheTrain.mp4 
RainPouringDown.mp4 




