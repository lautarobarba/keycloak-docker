#!/bin/bash
if [ $ENVIRONMENT == "development" ]; then 
    echo "== DEVELOPMENT MODE ==" 
    echo "RUNNING: \"npm install && npm run start\". Please wait..."
    npm install && npm run start
elif [ $ENVIRONMENT == "production" ]; then 
    echo "==  PRODUCTION MODE ==" 
    echo "RUNNING: \"npm install && npm run start:prod\". Please wait..."
    npm install && npm run start:prod
else 
    while true
    do
        echo "ERROR: PLEASE SET \$ENVIRONMENT MODE as \"development\" or \"production\""
        sleep 2
    done
fi 
exit 0
