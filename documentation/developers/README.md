# Introduction

## Prologue

The openEO API defines a [HTTP API](/documentation/developers/api/) that lets cloud back-ends with large Earth observation datasets communicate with front end analysis applications in an interoperable way. This documentation describes important API concepts and design decisions and gives a complete [API reference documentation](/documentation/developers/api/).

As an overview, the openEO API specifies how to

- discover which Earth observation data and processes are available at cloud back-ends,
- execute (chained) processes on back-ends, 
- run [user-defined functions](/documentation/developers/backends/udfs.md) (UDFs) on back-ends where UDFs can be exposed to the data in different ways, 
- download (intermediate) results, and
- manage user content including billing.


The API is defined as an [OpenAPI 3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md) JSON file.

## Contributor Code of Conduct

As contributors and maintainers of this project, we pledge to respect all people who 
contribute through reporting issues, posting feature requests, updating documentation,
submitting pull requests or patches, and other activities.

We are committed to making participation in this project a harassment-free experience for
everyone, regardless of level of experience, gender, gender identity and expression,
sexual orientation, disability, personal appearance, body size, race, ethnicity, age, or religion.

Examples of unacceptable behavior by participants include the use of sexual language or
imagery, derogatory comments or personal attacks, trolling, public or private harassment,
insults, or other unprofessional conduct.

Project maintainers have the right and responsibility to remove, edit, or reject comments,
commits, code, wiki edits, issues, and other contributions that are not aligned to this 
Code of Conduct. Project maintainers who do not follow the Code of Conduct may be removed 
from the project team.

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by 
opening an issue or contacting one or more of the project maintainers.

This Code of Conduct is adapted from the [Contributor Covenant](http://contributor-covenant.org), version 1.0.0, available at
[http://contributor-covenant.org/version/1/0/0/](http://contributor-covenant.org/version/1/0/0/).

## Software Development Guidelines

This document describes guidelines for software developers, written for the [openEO](http://openeo.org) project.
Since the openEO infrastructure will encompasses several programming languages and software environments, this document does not prescribe particular tools or platforms but rather focuses on general principles and methods behind them.

1. License: all software developed in the openEO project and published on the [openEO GitHub](http://github.com/open-eo/) organisation shall be licensed under the [Apache 2.0 license](https://opensource.org/licenses/Apache-2.0). If software repositories deviate from this, or contain code or other artifacts that deviates from this, this shall be described in the `README.md` file.
2. Location: Official openEO software is developed under the [openEO GitHub organisation](https://github.com/open-EO/).
3. Proof-of-concept versus sustainable: each repository shall indicate its status: either _proof-of-concept_, or _sustainable_. Proof-of-concept code is meant to work but comes without quality assurance. Software repositories with proof-of-concept developments shall clearly say so in the first paragraph of the `README.md` file.
4. Sustainable code should undergo standard [quality checks](#software-quality-guidelines), and point out its [documentation](#software-documentation-guidelines).
5. Sustainable code shall undergo [code review](#software-review); no direct commits to master; any commit shall come in the form of a PR, commit after review.
6. Sustainable code shall be written in a [Test-driven manner](#test-driven-development), and repositories shall at the top of their `README.md` give indication of the degree to which code is covered by tests.
7. [Continuous integration](#continuous-integration) shall be used to indicate code currently passes its test on CI platforms.
8. A [Code of conduct](#contributor-code-of-conduct) describes the rules and constraints to developers and contributors.
9. Version numbers of sustainable software releases shall follow [Semantic Versioning 2.0.0](http://semver.org).  

### Software quality guidelines

* software shall be written in such a way that another person can understand its intention
* comment lines shall be used sparsely, but effectively
* reuse of unstable or esoteric libraries shall be avoided

### Software documentation guidelines

Software documentation shall include:
* installation instructions
* usage instructions
* explain in detail the intention of the software
* pointers to reference documents explaining overarching concepts 

Each repository's `README.md` shall point to the documentation.

Reference documentation shall be written using well-defined reference documentation language, such as [RFC2119](https://tools.ietf.org/html/rfc2119) or [arc42](http://arc42.org), and refer to the definitions used.

### Software review

* sustainable software development shall take place by always having two persons involved in a change to the master branch: individuals push to branches, pull request indicate readiness to be taken up in the master branch, a second developer reviews the pull request before merging it into the master branch.
* software review discussions shall be intelligible for external developers, and serve as implicit documentation of development decisions taken

### Test-driven development

Software shall be developed in a test-driven fashion, meaning that while the code is written, tests are developed that verify, to a reasonable extent, the correctness of the code. Tools such as [codecov.io](https://codecov.io/) to automatically indicate the amount of code covered by tests, and code that is not covered by tests shall be used in combination with a continuous integration framework.

### Continuous integration

Repositories containing running software shall use an appropriate continuous integration platform, such as [Travis CI](https://travis-ci.org/) or similar, to show whether the current build passes all checks. This helps understand contributors that the software passes tests on an independent platform, and may give insights in the way the software is compiled, deployed and tested.

### Additional guidelines

There is specific guideline for [client library development](/documentation/developers/clients/library-guidelines.md).