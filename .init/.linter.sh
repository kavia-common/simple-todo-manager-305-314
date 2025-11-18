#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-todo-manager-305-314/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

