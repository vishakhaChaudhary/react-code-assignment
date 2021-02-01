# sapient-code-assignment

Display SpaceX Launch Programs with multiple filters


### Quick Start

```shell
$ git clone https://github.com/vishakhaChaudhary/sapient-code-assignment.git
$ cd sapient-code-assignment
$ git checkout develop
$ npm install
$ npm run webpack
$ npm run dev
```


### Branches

- [x] **master**: Production Build
- [x] **develop**: Dev Build


### Working

* Initially when application render, API is called and displayed the fetched data on UI
* Filters are available, which can be applied and filter the data accordingly and updated the UI
* In addition, when applying filters, url params are get updated or added.
* When page is reloaded with some applied filters then data is server side rendered.
