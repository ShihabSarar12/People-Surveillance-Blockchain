#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: Commit message is required."
  echo "Usage: ./git_commit_push.sh 'Your commit message'"
  exit 1
fi

commit_message="$1"

git add .
git commit -m "$commit_message"

if [ $? -ne 0 ]; then
  echo "Git commit failed. Exiting."
  exit 1
fi

git push

if [ $? -eq 0 ]; then
  echo "Changes successfully pushed to remote repository."
else
  echo "Git push failed. Exiting."
  exit 1
fi
