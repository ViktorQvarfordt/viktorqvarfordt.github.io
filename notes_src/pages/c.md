# C

## Optimizations

https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms

### Vectorization

```
$ gcc -ftree-vectorize -fopt-info-vec-missed main.c
```

- `-ftree-vectorize` is enabled by `-O3`
- `-fopt-info-vec-missed` warns about non-vectorized loops

*SSE*?

`xmmintrin.h` and other "intrinsic" functions.. what..?
