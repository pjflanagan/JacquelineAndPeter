
# python3 ./cachebreaker/cachebreaker.py

import re
from datetime import datetime
from git import Repo

# find the changes that are relevant
repo = Repo()
stagedFiles = [item.a_path for item in repo.index.diff("HEAD")]
print(len(stagedFiles), "staged changes")

# create new marker
CACHEBREAKER_REGEX = r"cacheBreaker=\d{4}\.\d{2}\.\d{2}"
newCacheMarker = "cacheBreaker=" + datetime.today().strftime("%Y.%m.%d")
print("Using cache breaker:", newCacheMarker)

# read
indexFile = open('./index.html', 'r')
lines = indexFile.readlines()
indexFile.close()

def isUpdateableLine(line):
  if "cacheBreaker" in line:
    for file in stagedFiles:
      if file in line:
        return True
  return False

# edit
editedLines = 0
for i in range(0, len(lines)):
  if isUpdateableLine(lines[i]):
    editedLines += 1
    lines[i] = re.sub(CACHEBREAKER_REGEX, newCacheMarker, lines[i])
    print(lines[i])

# write
indexFile = open('./index.html', 'w')
indexFile.writelines(lines)
indexFile.close()

print("Updated", editedLines, "lines with new cache breaker")

# add to git
repo.index.add('index.html')
print("Staged index.html")