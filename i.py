
from collections import defaultdict

n, m = map(int, input().split())
adj = defaultdict(list)
indeg = [0] * n

for _ in range(m):
    a, b = map(int, input().split())
    adj[a].append(b)
    indeg[b] += 1

q = []
for i in range(n):
    if indeg[i] == 0:
        q.append(i)

count = 0 
while q:
    a = q.pop(0)
    print(a, end=" ")
    count += 1
    for j in adj[a]:
        indeg[j] -= 1
        if indeg[j] == 0:
            q.append(j)

print()
if count == n:
    print("No Cycle")
else:
    print("Cycle")