# `NGX-elements`
Simply add Some elements that can be used in your Angular 5+ project.

- Use <kbd>command</kbd> + <kbd>F</kbd> or <kbd>ctrl</kbd> + <kbd>F</kbd> to search for a keyword.
- Contributions welcome, please see [contribution guide](CONTRIBUTING.md).

## Contents
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Example usage](#example-usage)
- [License](#license)

## <a name="getting-started"></a> Getting Started
### <a name="installation"></a> Installation

You can install this package locally with `npm` or `yarn`. You should install the latest stable version in the `dependencies` section in your `package.json`.

```bash
# To get the latest stable version in dependencies

npm install @stanvanheumen/ngx-elements --save

# or

yarn add @stanvanheumen/ngx-elements
```

### <a name="example-usage"></a> Example usage

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxFormsModule, NgxCardsModule, NgxMiscellaneousModule} from '@stanvanheumen/ngx-elements';

import {AppComponent} from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    NgxFormsModule,
    NgxCardsModule,
    NgxMiscellaneousModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## License
[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)