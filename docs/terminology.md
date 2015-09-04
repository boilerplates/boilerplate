# Terminology and conventions

> This document describes the terminology and conventions used in this project, to help guide authors in creating effective, reusable boilerplates

## What is a boilerplate?

There are exceptions to every rule, but as a general rule of thumb effective boilerplates have the following attributes:

  1. **Project-in-a-box.** Boilerplates consist of all of the necessary files required to generate a complete project. Big or small, minimal or feature rich, the boilerplate should have what a project needs to get started.
  2. **Generalized code and content.** When code is generalized, other code can be built on top of it to make it more specific. This doesn't mean "generic and boring", it just means that placeholders, templates or even code comments should be used wherever the user will need to make customizations.
  3. **Be specific.** Although the code and content of a boilerplate should be generalized, the actual purpose and target audience for the boilerplate should be as crystal-clear as possible. 

### Idiomatic boilerplates

If you'd like to go above and beyond in creating your boilerplate, this section is for you. Here are some of the characteristics of an idiomatic boilerplate:

  1. **Keep it simple.** With few exceptions, the more complicated the boilerplate, the less likely it is to be useful to more developers. (_"simple" is not the same as "specific"_)
  2. **Well organized and documented.** Good documentation - and code comments when necessary - make it easier for build systems and generators to consume your boilerplate as part of a larger build process. 
  3. **Customizable.** Use sensible defaults that can easily be overridden. This allows users to customize style, code and content based on a project-by-project basis. 
  4. **Discoverable.** Make it easy for other developers to find and use your boilerplate. Read [more about discoverability](./authoring.md) 

## Reference

Here is a quick reference comparing the difference between boilerplates, scaffolds and templates.

| **type** | **description** |
| [template][] | Resuable file, code or content which contains "placeholder" values that will eventually be replaced with real values by a rendering engine. |
| [scaffold][] | Consist of one or more templates or source files and serve as a "temporary support structure" that may be used at init, or throughout the duration of a project. |
| [boilerplate][] | Boilerplates consist of all of the necessary files required to initialize a complete project. |


{%= reflinks(['boilerplate', 'scaffold', 'template']) %}