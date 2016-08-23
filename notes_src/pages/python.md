# Python

Async/non-blocking function call via threads

```python
import subprocess, threading

def asyncCall(cb, popenArg, **popenKwargs):
    def wrap():
        proc = subprocess.Popen(popenArg, **popenKwargs)
        proc.wait()
        cb(proc)
    threading.Thread(target=wrap).start()
```
