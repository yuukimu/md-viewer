#!/bin/bash

function usage {
  cat <<EOM
Usage: $(basename "$0") [OPTION]...
  -h          Display help
  -t VALUE    Release Type(major, minor, patch)
EOM

  exit 2
}

while getopts t: OPT
do
  case $OPT in
    "t" ) RELEASE_TYPE="$OPTARG" ;;
     '-h'|'--help'|* )  usage 1>&2
                        exit 1 ;;
  esac
done

CURRENT_VERSION=`cat version.txt`
IFS=.
ARR=(${CURRENT_VERSION})
IFS= 

case $RELEASE_TYPE in
  "major")  N=`echo $((ARR[0] + 1))`
            NEXT_VERSION="${N}.0.0";;
  "minor")  N=`echo $((ARR[1] + 1))`
            NEXT_VERSION="${ARR[0]}.${N}.${ARR[2]}";;
  "patch")  N=`echo $((ARR[2] + 1))`
            NEXT_VERSION="${ARR[0]}.${ARR[1]}.${N}";;
esac

zip -r build/bin/md-viewer_${NEXT_VERSION}_darwin_arm64.zip  build/bin/md-viewer-arm64.app
zip -r build/bin/md-viewer_${NEXT_VERSION}_darwin_amd64.zip  build/bin/md-viewer-amd64.app
zip -r build/bin/md-viewer_${NEXT_VERSION}_windows_amd64.zip build/bin/md-viewer-amd64.exe

echo $NEXT_VERSION > version.txt