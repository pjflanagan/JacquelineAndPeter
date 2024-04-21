
import re
from datetime import datetime

CACHEBREAKER_REGEX = r"cacheBreaker=(\d{4}\.\d{2}\.\d{2})"

# create new marker
newCacheMarker = "cacheBreaker=" + datetime.today().strftime("%Y.%m.%d")
print("Using cache breaker:", newCacheMarker)

# read
indexFile = open('./index.html', 'r')
lines = indexFile.readlines()
indexFile.close()

# edit
editedLines = 0
for i in range(0, len(lines)):
  if "cacheBreaker" in lines[i]:
    editedLines += 1
    lines[i] = re.sub(CACHEBREAKER_REGEX, newCacheMarker, lines[i])
    print(lines[i])

# write
indexFile = open('./index.html', 'w')
indexFile.writelines(lines)
indexFile.close()

print("Updated", editedLines, "lines with new cache breaker")