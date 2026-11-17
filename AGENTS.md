# Repository instructions

- Keep Pascal code compatible with the Free Pascal Delphi mode used by this project.
- Catalog operations must not mutate their input arrays.
- After changing Pascal code or tests, run `npm test` and `npm run test:fpc`.
- After changing workshop or guide content, run `npm run test:guide` and `node --test .demo/workshop.test.mjs`.
