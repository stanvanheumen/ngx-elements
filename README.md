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

You should add the modules you want to the `imports` array of your modules.

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
    NgxFormsModule,
    NgxCardsModule,
    NgxMiscellaneousModule,
    NgxTranslationsModule,
    NgxNotificationsModule
} from '@stanvanheumen/ngx-elements';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        NgxFormsModule,
        NgxCardsModule,
        NgxMiscellaneousModule,
        NgxTranslationsModule.forRoot({production: false, dictionary: [...]})
        NgxNotificationsModule.forRoot()
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

To get the best styling you can import the `styling.scss` that is included in the library.

```scss
@import '~@stanvanheumen/ngx-elements/styles/styles';
```

To get the correct fonts and icons you should add these two link-tags to the `head` section of your `index.html` (these are not included for performance).

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
```

## License
[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)