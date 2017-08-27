# ractive-utils

A bunch of APIs to aid in Ractive tooling development.

- components - Component-parsing APIs. Feeds from templates or component files.
- modules - Takes a component definition and wraps it in a module definition.
- utils - Various utility APIs.

Ractive will be a peer dependency.

Some APIs may also be environment-dependent. For instance, build-time tools will only generate string components, while browser tools actually need to evaluate code.
