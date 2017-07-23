# C / C++

## Snippets

**Command line arguments:**

```c++
#include <iostream>

using namespace std;

int main(int argc, char *argv[]) {
  cout << "argc = " << argc << endl;
  for (int i = 0; i < argc; ++i) {
    cout << "argv[" << i << "] = " << argv[i] << endl;
  }
  return 0;
}
```

**Arrays:**

```c++

```

<http://www.learncpp.com/cpp-tutorial/713-command-line-arguments/>

## Optimizations

https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms

### Vectorization

```
$ gcc -ftree-vectorize -fopt-info-vec-missed main.c
```

- `-ftree-vectorize` is enabled by `-O3`
- `-fopt-info-vec-missed` warns about non-vectorized loops

*SSE*?

`xmmintrin.h` and other "intrinsic" functions..
