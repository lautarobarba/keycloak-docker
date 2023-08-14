#!/bin/bash
if [ $ENVIRONMENT == "development" ]; then 
    echo "== DEVELOPMENT MODE ==" 
    echo "RUNNING: \"npm install && npm run dev\". Please wait..."
    npm install && npm run dev
elif [ $ENVIRONMENT == "production" ]; then 
    echo "==  PRODUCTION MODE ==" 
    echo "RUNNING: \"npm install && npm run build && npm run start\". Please wait..."
    npm install && npm run build && npm run start
else 
    while true
    do
        echo "ERROR: PLEASE SET \$ENVIRONMENT MODE as \"development\" or \"production\""
        sleep 2
    done
fi 
exit 0
